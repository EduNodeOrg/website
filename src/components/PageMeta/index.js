import React from 'react';
import { Helmet } from 'react-helmet-async';

const ORIGIN = 'https://edunode.org';

// Shared meta for non-article pages. The static HTML generator
// (scripts/generate-blog-html.js) reads the literal props off the
// <PageMeta ... /> usage, so keep title/description/path as string
// literals — they also end up baked into build/<path>.html.
export default function PageMeta({ title, description, path, image }) {
  const url = ORIGIN + path;
  const img = image || `${ORIGIN}/en.png`;
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
