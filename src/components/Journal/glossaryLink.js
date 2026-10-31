// Auto-link glossary term mentions inside post HTML to /glossary/<slug>.
// Only links inside text nodes (never inside <a>, <code>, <pre>) and caps
// the number of injected links so pages don't turn into link farms.
import { GLOSSARY_TERMS, slugify } from '../Glossary/terms';

const MAX_LINKS = 8;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function linkGlossary(html) {
  if (!html) return html || '';
  const terms = [...GLOSSARY_TERMS]
    .map((t) => t.term)
    .filter((t) => t.length > 3)
    .sort((a, b) => b.length - a.length);
  const parts = String(html).split(/(<[^>]+>)/g);
  let inAnchor = false;
  let inCode = false;
  let linked = 0;
  const used = new Set();
  const out = parts.map((part) => {
    if (part.startsWith('<')) {
      if (/^<a[\s>]/i.test(part)) inAnchor = true;
      else if (/^<\/a/i.test(part)) inAnchor = false;
      else if (/^<(code|pre)[\s>]/i.test(part)) inCode = true;
      else if (/^<\/(code|pre)/i.test(part)) inCode = false;
      return part;
    }
    if (inAnchor || inCode || linked >= MAX_LINKS) return part;
    let text = part;
    for (const term of terms) {
      if (linked >= MAX_LINKS) break;
      const slug = slugify(term);
      if (used.has(slug)) continue;
      const re = new RegExp(`\\b(${escapeRe(term)})\\b`, 'i');
      if (re.test(text)) {
        text = text.replace(re, `<a href="/glossary/${slug}">$1</a>`);
        used.add(slug);
        linked += 1;
      }
    }
    return text;
  });
  return out.join('');
}
