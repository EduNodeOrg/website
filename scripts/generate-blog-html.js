#!/usr/bin/env node
/**
 * generate-blog-html.js — emits per-route index.html files under build/blog/
 * with each article's real meta tags baked into the SPA shell.
 *
 * Why: Netlify Prerender only serves rendered HTML to recognised crawler
 * user-agents. Meta checkers (heymeta, metainspector), plain curl, and
 * view-source all get the default homepage shell. Static per-route HTML
 * makes the correct title/description/OG/Twitter/JSON-LD visible to every
 * client, with no UA sniffing and no runtime cost.
 *
 * How: routes are auto-discovered from App.js (path → lazy component),
 * and each article's meta is extracted from its own Helmet block — the
 * components stay the single source of truth. Hashed image URLs are
 * resolved through CRA's asset-manifest.json.
 *
 * Runs automatically at the end of `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const ORIGIN = 'https://edunode.org';

const appSrc = fs.readFileSync(path.join(ROOT, 'src/App.js'), 'utf8');
const shell = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(BUILD, 'asset-manifest.json'), 'utf8'));

// ─── Discover routes: component name → import path, path → component ─────────
const compImport = {};
for (const m of appSrc.matchAll(/const (\w+) = lazy\(\(\) => import\(['"]([^'"]+)['"]\)/g)) {
  compImport[m[1]] = m[2];
}
// All exact public routes — parameterized, catch-all, admin and
// .well-known paths are excluded (a baked .json/.well-known shell would
// shadow real files). Pages without meta are skipped, so new routes get
// coverage automatically once they render a <Helmet> or <PageMeta>.
const SKIP_ROUTE = /^(\/Admin|\/\.well-known|\/\*)/;
const routes = [];
for (const m of appSrc.matchAll(/<Route exact path="(\/[^"]*)" element=\{<(\w+)\s*\/>\}/g)) {
  const comp = m[2];
  const route = m[1];
  if (route.includes(':') || SKIP_ROUTE.test(route)) continue;
  if (!compImport[comp]) continue;
  routes.push({ route, file: compImport[comp] });
}
if (!routes.length) throw new Error('No routes found in App.js — parser out of date?');

// ─── Meta extraction ─────────────────────────────────────────────────────────
const ident = String.raw`[A-Za-z_$][\w$]*`;
const strLit =
  "(?:'(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"|`(?:\\\\.|[^`\\\\])*`)";

function unquote(s) {
  try {
    // eslint-disable-next-line no-eval
    return eval(`(${s})`);
  } catch {
    return null;
  }
}

function extractMeta(file) {
  const abs = path.join(ROOT, 'src', file);
  const candidates = [abs + '.js', path.join(abs, 'index.js'), abs];
  const srcFile = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  if (!srcFile) throw new Error(`Cannot resolve ${file}`);
  const src = fs.readFileSync(srcFile, 'utf8');
  const dir = path.dirname(srcFile);

  // import bindings → repo-relative asset paths
  const imports = {};
  for (const m of src.matchAll(/import (\w+) from ['"]([^'"]+)['"]/g)) {
    imports[m[1]] = m[2];
  }
  const resolveAsset = (name) => {
    const rel = imports[name];
    if (!rel || !/\.(png|jpe?g|webp|gif)$/i.test(rel)) return null;
    const base = path.basename(rel);
    const hashed = manifest.files[`static/media/${base}`];
    if (!hashed) return null; // inlined as data URI — not usable for og:image
    return hashed;
  };

  // evaluate `const NAME = <expr>` declarations: string literals,
  // 'prefix' + importedAsset, and array/object literals (e.g. `faqs`
  // which the FAQPage JSON-LD maps over). Evaluated in source order so
  // later consts can reference earlier ones.
  const consts = {};
  const matchBalanced = (at) => {
    const open = src[at];
    const close = open === '{' ? '}' : ']';
    let depth = 0;
    for (let i = at; i < src.length; i++) {
      const c = src[i];
      if (c === "'" || c === '"' || c === '`') {
        i++;
        while (i < src.length && src[i] !== c) i += src[i] === '\\' ? 2 : 1;
      } else if (c === open) depth++;
      else if (c === close && --depth === 0) return src.slice(at, i + 1);
    }
    return null;
  };
  const evalWithScope = (expr) => {
    const fn = new Function(...Object.keys(consts), `return (${expr});`);
    return fn(...Object.values(consts));
  };
  const constHeadRe = new RegExp(`const (${ident})\\s*=\\s*`, 'g');
  for (const m of src.matchAll(constHeadRe)) {
    const name = m[1];
    const at = m.index + m[0].length;
    const c = src[at];
    if (c === "'" || c === '"' || c === '`') {
      const litMatch = src.slice(at).match(new RegExp(`^(${strLit})(\\s*\\+\\s*(${ident}))?`));
      if (!litMatch) continue;
      const pre = unquote(litMatch[1]);
      consts[name] = litMatch[3]
        ? pre + (resolveAsset(litMatch[3]) ?? consts[litMatch[3]] ?? '')
        : pre;
    } else if (c === '{' || c === '[') {
      const lit = matchBalanced(at);
      if (!lit) continue;
      try {
        consts[name] = evalWithScope(lit);
      } catch {
        // references vars we don't resolve — not needed for meta
      }
    }
  }

  const resolve = (v) => consts[v] ?? null;
  const parseAttrs = (attrText) => {
    const attrs = {};
    const attrRe = new RegExp(`(${ident}(?::${ident})?)\\s*=\\s*(?:"([^"]*)"|\\{(${strLit})\\}|\\{(${ident})\\})`, 'g');
    for (const a of attrText.matchAll(attrRe)) {
      attrs[a[1]] = a[2] ?? (a[3] !== undefined ? unquote(a[3]) : resolve(a[4]));
    }
    return attrs;
  };

  // <PageMeta title="..." description="..." path="..." /> — shared
  // meta component for non-article pages (src/components/PageMeta)
  const pm = src.match(/<PageMeta([\s\S]*?)\/>/);
  if (pm && !/<Helmet>/.test(src)) {
    const a = parseAttrs(pm[1]);
    const url = a.path ? ORIGIN + a.path : undefined;
    const img = a.image || ORIGIN + '/en.png';
    return {
      title: a.title,
      description: a.description,
      canonical: url,
      og: { type: 'website', title: a.title, description: a.description, url, image: img },
      twitter: { card: 'summary_large_image', title: a.title, description: a.description, image: img },
      ld: [],
    };
  }

  // parse the Helmet block
  const helmet = src.match(/<Helmet>([\s\S]*?)<\/Helmet>/);
  if (!helmet) throw new Error(`No <Helmet> block in ${file}`);
  const body = helmet[1];

  const meta = { og: {}, twitter: {}, ld: [] };

  for (const m of body.matchAll(/<(\w+)([\s\S]*?)\/?>(?:([\s\S]*?)<\/\1>)?/g)) {
    const [, tag, attrText, inner] = m;
    const attrs = parseAttrs(attrText);
    if (tag === 'title') {
      const t = inner && inner.trim().match(new RegExp(`^\\{(${ident})\\}$`));
      meta.title = t ? resolve(t[1]) : inner && inner.trim();
    } else if (tag === 'link' && attrs.rel === 'canonical') {
      meta.canonical = attrs.href;
    } else if (tag === 'meta') {
      if (attrs.name === 'description') meta.description = attrs.content;
      else if (attrs.property?.startsWith('og:')) meta.og[attrs.property.slice(3)] = attrs.content;
      else if (attrs.name?.startsWith('twitter:')) meta.twitter[attrs.name.slice(8)] = attrs.content;
    }
  }

  // evaluate every `const *Ld = {...}` as a JSON-LD object, with the consts in scope
  const ldRe = new RegExp(`const ${ident}Ld\\s*=\\s*\\{`, 'g');
  for (const m of src.matchAll(ldRe)) {
    let i = m.index + m[0].length - 1;
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
    const literal = src.slice(start, i + 1);
    try {
      const fn = new Function(...Object.keys(consts), `return (${literal});`);
      meta.ld.push(fn(...Object.values(consts)));
    } catch (e) {
      console.warn(`  warn: could not evaluate JSON-LD in ${file}: ${e.message}`);
    }
  }
  return meta;
}

// ─── Shell rewriting ─────────────────────────────────────────────────────────
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function setTag(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`pattern not found in shell: ${pattern}`);
  return html.replace(pattern, value);
}

function buildPage(route, meta) {
  let html = shell;
  const url = meta.canonical || ORIGIN + route;
  const title = meta.title || 'EduNode';
  const desc = meta.description || '';
  const og = meta.og;
  const tw = meta.twitter;
  const image = og.image || tw.image;

  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);
  html = setTag(html, /(<meta name="title" content=")[^"]*(")/, `$1${escAttr(title)}$2`);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`);
  html = setTag(html, /(<meta property="og:type" content=")[^"]*(")/, `$1${escAttr(og.type || 'website')}$2`);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${escAttr(og.url || url)}$2`);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(og.title || title)}$2`);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(og.description || desc)}$2`);
  html = setTag(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${escAttr(image || ORIGIN + '/en.png')}$2`);
  html = setTag(html, /(<meta property="twitter:url" content=")[^"]*(")/, `$1${escAttr(tw.url || url)}$2`);
  html = setTag(html, /(<meta property="twitter:title" content=")[^"]*(")/, `$1${escAttr(tw.title || title)}$2`);
  html = setTag(html, /(<meta property="twitter:description" content=")[^"]*(")/, `$1${escAttr(tw.description || desc)}$2`);
  html = setTag(html, /(<meta property="twitter:image" content=")[^"]*(")/, `$1${escAttr(tw.image || image || ORIGIN + '/en.png')}$2`);

  let inject = `  <link rel="canonical" href="${escAttr(url)}" />\n`;
  for (const ld of meta.ld) {
    inject += `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
  }
  html = html.replace('</head>', inject + '</head>');
  return html;
}

// ─── Main ────────────────────────────────────────────────────────────────────
const required = ['title', 'description', 'canonical'];
let written = 0;
let skipped = 0;
for (const { route, file } of routes) {
  let meta;
  try {
    meta = extractMeta(file);
  } catch {
    skipped++; // no Helmet/PageMeta — nothing to bake for this route
    continue;
  }
  const missing = required.filter((k) => !meta[k]);
  if (missing.length) {
    skipped++;
    if (route.startsWith('/blog')) {
      console.error(`✗ ${route} (${file}): missing ${missing.join(', ')} — skipped`);
    }
    continue;
  }
  // Flat .html files: Netlify "Pretty URLs" serves blog/ipfs.html at
  // /blog/ipfs with no redirect — a blog/ipfs/index.html directory would
  // 301 to a trailing slash and diverge from our canonicals.
  const out = path.join(BUILD, route + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPage(route, meta));
  written++;
  console.log(`✓ ${route}`);
}
console.log(`\nGenerated ${written} pages with baked-in meta (${skipped} routes without meta skipped).`);
if (!written) process.exitCode = 1;
