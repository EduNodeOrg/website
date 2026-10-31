// Shared helpers for the Journal (dev.to-style article platform).
const API = 'https://edunode.herokuapp.com/api/post/posts';
export const ORIGIN = 'https://edunode.org';

export const slugifyTitle = (t) =>
  String(t || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'post';

export const authorHandle = (email) => {
  const e = String(email || 'anonymous').toLowerCase();
  const local = e === 'anonymous' ? 'anonymous' : e.split('@')[0];
  return local.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'anonymous';
};

// tags arrive like "['NFTs','Stellar']" — a Python-style repr; parse tolerantly
export const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  const s = String(tags || '');
  const out = [];
  const re = /['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(s))) out.push(m[1]);
  if (!out.length && s.trim() && s !== '[]') out.push(s.replace(/[[\]'"]/g, '').trim());
  return out.filter(Boolean);
};

export const parseComments = (comments) => {
  if (Array.isArray(comments)) return comments;
  const s = String(comments || '');
  const out = [];
  const re = /\{\s*'text':\s*'((?:[^'\\]|\\.)*)'\s*,\s*'email':\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(s))) out.push({ text: m[1].replace(/\\'/g, "'"), email: m[2] });
  return out;
};

export const stripHtml = (html) =>
  String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const postSlug = (post) => `${slugifyTitle(post.title)}-${post._id}`;
export const journalUrl = (post) => `/journal/@${authorHandle(post.email)}/${postSlug(post)}`;
export const journalAbs = (post) => `${ORIGIN}${journalUrl(post)}`;
export const authorUrl = (email) => `/journal/@${authorHandle(email)}`;

export const fetchPosts = () => fetch(API).then((r) => r.json()).then((d) => (Array.isArray(d) ? d : []));
export const fetchPost = (id) => fetch(`${API}/${id}`).then((r) => r.json()).then((d) => (Array.isArray(d) ? d[0] : d));

export const tagSlug = (t) => slugifyTitle(t);
