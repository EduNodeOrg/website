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
  html = setTag(html, /(<meta name="twitter:url" content=")[^"]*(")/, `$1${escAttr(tw.url || url)}$2`);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${escAttr(tw.title || title)}$2`);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${escAttr(tw.description || desc)}$2`);
  html = setTag(html, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${escAttr(tw.image || image || ORIGIN + '/en.png')}$2`);

  // The shell ships a homepage canonical — swap it for this route's.
  // data-rh lets react-helmet-async manage it on client navigation.
  html = setTag(html, /<link rel="canonical"[^>]*>/,
    `<link data-rh="true" rel="canonical" href="${escAttr(url)}" />`);

  // og:image dimensions: branded cards under /og/ are 1200×630 and /en.png
  // is 1024×1024; for anything else drop the size tags rather than emit
  // wrong ones.
  const imgPath = (image || '').replace(ORIGIN, '');
  const dims = imgPath.startsWith('/og/') ? [1200, 630] : imgPath === '/en.png' ? [1024, 1024] : null;
  if (dims) {
    html = setTag(html, /(<meta property="og:image:width" content=")[^"]*(")/, `$1${dims[0]}$2`);
    html = setTag(html, /(<meta property="og:image:height" content=")[^"]*(")/, `$1${dims[1]}$2`);
    html = setTag(html, /(<meta property="og:image:alt" content=")[^"]*(")/, `$1${escAttr(title)}$2`);
  } else {
    html = html.replace(/\s*<meta property="og:image:(width|height|alt)"[^>]*>/g, '');
  }

  // Real words in the initial HTML: replace the homepage fallback copy in
  // #root with this page's own heading and description.
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root"><main><h1>${escHtml(title)}</h1><p>${escHtml(desc)}</p></main></div>`
  );

  let inject = '';
  for (const ld of meta.ld) {
    inject += `  <script data-rh="true" type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
  }
  html = html.replace('</head>', inject + '</head>');
  return html;
}

// ─── Main ────────────────────────────────────────────────────────────────────
const required = ['title', 'description', 'canonical'];
let written = 0;
let skipped = 0;
for (const { route, file } of routes) {
  // Its schema and content are generated from the public catalog below.
  if (route === '/masterclasses') continue;
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
// Dynamic masterclass routes use public data rather than literal PageMeta
// wrappers. Generate their actual public content as well as metadata so it is
// readable without JavaScript. Never import netlify/content in this generator.
const { catalog: masterclasses, FREE_LESSON_COUNT } = require('../src/components/Masterclasses/catalog');
const freeLessons = require('../src/components/Masterclasses/freeLessons');
const listHtml = (items) => `<ul>${items.map((item) => `<li>${escHtml(item)}</li>`).join('')}</ul>`;
const coursePath = (course) => `/masterclasses/${course.slug}`;
const lessonPath = (course, lesson) => `${coursePath(course)}/lessons/${lesson.slug}`;
const linkHtml = (url, title) => `<a href="${escAttr(url)}">${escHtml(title)}</a>`;
const paragraph = (text) => `<p>${escHtml(text)}</p>`;

function writeMasterclassPage(route, title, description, content, ld) {
  const url = ORIGIN + route;
  const meta = {
    title, description, canonical: url,
    og: { type: 'website', title, description, url, image: ORIGIN + '/en.png' },
    twitter: { card: 'summary_large_image', title, description, image: ORIGIN + '/en.png' },
    ld: ld ? [ld] : [],
  };
  const html = buildPage(route, meta)
    // Full public content in the initial HTML, replacing the title +
    // description stub that buildPage wrote into #root.
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root"><main>${content}</main></div>`);
  const out = path.join(BUILD, route + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const existed = fs.existsSync(out);
  fs.writeFileSync(out, html);
  if (!existed) written++;
  console.log(`✓ ${route} (public masterclass content)`);
}

writeMasterclassPage(
  '/masterclasses',
  'IT Masterclasses: Coding, Data, AI, Security & Cloud | EduNode',
  'Build practical IT skills with ten detailed masterclasses. Explore Python, JavaScript, SQL, Git, AI, cybersecurity, networking, Docker, data analysis, and IT support. The first 20% of every class is free.',
  '<h1>Masterclasses: practical IT skills and real projects</h1>' +
  paragraph('Ten self-paced masterclasses, 100 lessons, and ten final projects. Lessons 1–2 of each class are free without an account (20%). Lessons 3–10 require an active Pro membership (80%).') +
  masterclasses.map((course) => `<article><h2>${linkHtml(coursePath(course), course.title)}</h2>${paragraph(course.description)}${paragraph(course.project)}${listHtml(course.outcomes)}</article>`).join('') +
  linkHtml('/pricing', 'Explore Pro membership'),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: masterclasses.map((course, index) => ({
      '@type': 'ListItem', position: index + 1, name: course.title, url: ORIGIN + coursePath(course),
    })),
  }
);

for (const course of masterclasses) {
  const courseLd = {
    '@context': 'https://schema.org', '@type': 'Course',
    name: course.title, description: course.description, url: ORIGIN + coursePath(course),
    provider: { '@type': 'Organization', name: 'EduNode', url: ORIGIN },
    coursePrerequisites: course.prerequisites,
    educationalLevel: course.slug === 'docker-cloud-deployment' ? 'Beginner with programming experience' : 'Beginner',
    isAccessibleForFree: false,
    hasPart: course.lessons.map((lesson, index) => ({
      '@type': 'LearningResource', name: lesson.title,
      url: ORIGIN + lessonPath(course, lesson), isAccessibleForFree: index < FREE_LESSON_COUNT,
    })),
  };
  writeMasterclassPage(
    coursePath(course), `${course.title} | EduNode`, course.description,
    `<nav>${linkHtml('/masterclasses', 'All masterclasses')}</nav><h1>${escHtml(course.title)}</h1>` +
    paragraph(course.description) + paragraph('10 lessons. Approximately 6–8 hours including practice. First two lessons free; remaining eight lessons included with Pro.') +
    '<h2>Who this is for</h2>' + paragraph(course.audience) +
    '<h2>Before you start</h2>' + paragraph(course.prerequisites) +
    '<h2>Your toolkit</h2>' + paragraph(course.tools) +
    '<h2>What you will learn</h2>' + listHtml(course.outcomes) +
    '<h2>Your final project</h2>' + paragraph(course.project) + listHtml(course.deliverables) +
    '<h2>Curriculum</h2><ol>' + course.lessons.map((lesson, index) =>
      `<li>${linkHtml(lessonPath(course, lesson), lesson.title)} — ${index < FREE_LESSON_COUNT ? 'Free' : 'Pro'}${paragraph(lesson.summary)}</li>`
    ).join('') + '</ol><h2>References</h2><ul>' +
    course.resources.map((resource) => `<li>${linkHtml(resource.url, resource.title)}</li>`).join('') + '</ul>',
    courseLd
  );
  for (let index = 0; index < FREE_LESSON_COUNT; index++) {
    const metadata = course.lessons[index];
    const lesson = freeLessons[course.slug][index];
    writeMasterclassPage(
      lessonPath(course, metadata), `${metadata.title} | ${course.shortTitle} | EduNode`, metadata.summary,
      `<nav>${linkHtml(coursePath(course), course.title)}</nav><h1>${escHtml(metadata.title)}</h1>` +
      paragraph(metadata.summary) + paragraph(`Free lesson ${index + 1} of 10. No account required.`) +
      '<h2>Learning objectives</h2>' + listHtml(lesson.objectives) +
      lesson.sections.map((section) => `<section><h2>${escHtml(section.title)}</h2>${paragraph(section.text)}${section.code ? `<pre><code>${escHtml(section.code)}</code></pre>` : ''}</section>`).join('') +
      `<h2>${escHtml(lesson.exercise.title)}</h2>` + listHtml(lesson.exercise.instructions) +
      `<details><summary>Suggested solution</summary>${paragraph(lesson.exercise.solution)}</details>` +
      '<h2>Knowledge check</h2>' + paragraph(lesson.quiz.question) + listHtml(lesson.quiz.options) +
      `<details><summary>Answer and explanation</summary>${paragraph(lesson.quiz.options[lesson.quiz.answer])}${paragraph(lesson.quiz.explanation)}</details>` +
      linkHtml(lessonPath(course, course.lessons[index + 1]), index + 1 < FREE_LESSON_COUNT ? 'Next free lesson' : 'Continue with Pro'),
      {
        '@context': 'https://schema.org', '@type': 'LearningResource',
        name: metadata.title, description: metadata.summary,
        url: ORIGIN + lessonPath(course, metadata), isAccessibleForFree: true,
        learningResourceType: 'Lesson',
        isPartOf: { '@type': 'Course', name: course.title, url: ORIGIN + coursePath(course) },
      }
    );
  }
}
console.log(`\nGenerated ${written} pages with baked-in meta (${skipped} routes without meta skipped).`);
if (!written) process.exitCode = 1;
