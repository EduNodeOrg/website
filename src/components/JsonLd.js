import React from 'react';
import { Helmet } from 'react-helmet-async';

// Injects a JSON-LD block without a literal <Helmet> tag in the caller —
// scripts/generate-blog-html.js bakes the matching `const *Ld` object into
// the page's static HTML, so declare the same object as a top-level const
// named *Ld and pass it here.
export default function JsonLd({ data }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
