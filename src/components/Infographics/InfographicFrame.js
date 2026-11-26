import React from 'react';
import PropTypes from 'prop-types';
import JsonLd from '../JsonLd';

const ORIGIN = 'https://edunode.org';

// Shared wrapper for the inline-SVG infographics: accessible <figure> +
// download link to the high-resolution WebP twin + ImageObject JSON-LD.
// The SVG children must include their own <title>/<desc> for screen readers.
export default function InfographicFrame({ slug, title, description, children }) {
  const url = `${ORIGIN}/infographics/${slug}.webp`;
  const imageLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: title,
    description,
    contentUrl: url,
    url,
    width: 1600,
    height: 900,
    encodingFormat: 'image/webp',
    creator: { '@type': 'Organization', name: 'EduNode', url: ORIGIN },
    creditText: 'EduNode — edunode.org',
    license: `${ORIGIN}/terms`,
    acquireLicensePage: `${ORIGIN}/contactus`,
  };
  return (
    <figure className="infographic-frame">
      <JsonLd data={imageLd} />
      {children}
      <figcaption className="infographic-caption">
        {description}{' '}
        <a href={`/infographics/${slug}.webp`} target="_blank" rel="noopener noreferrer">
          View or download the full-resolution infographic (WebP, 1600×900)
        </a>
        .
      </figcaption>
    </figure>
  );
}

InfographicFrame.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
