import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/women-in-web3-bootcamp';
const title = 'Women in Web3 Bootcamp — Second Edition';
const description = 'El Bootcamp «Women in Web3» es práctico y gamificado. Es un programa de 6 semanas con clases en vivo, mentoring, desafíos y recompensas en cada';
const image = 'https://edunode.org/og/women-in-web3-bootcamp.png';
const accent = 'linear-gradient(135deg,#1a0e27 0%,#3a1f5a 55%,#ff2f92 100%)';
const color = '#ff2f92';

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image,
  url: shareUrl,
  author: { '@type': 'Person', name: 'Olvis Gil' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  mainEntityOfPage: shareUrl,
};

export default function WomenWeb3Bootcamp() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>
      <ArticleLayout
        accent={accent}
        color={color}
        heroText="Six weeks of hands-on, gamified Web3 learning"
        tag="Community · Web3 · Español"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>El Bootcamp «Women in Web3» es práctico y gamificado. Es un programa de 6 semanas con clases en vivo, mentoring, desafíos y recompensas en cada sesión.</p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Explore our <a href="/courses">courses</a>, <a href="/masterclasses">masterclasses</a>, and the <a href="/ai">AI hub</a>.` }} />
      </ArticleLayout>
    </>
  );
}
