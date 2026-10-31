import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/built-on-stellar-xbull-soroban-domains';
const title = 'Built on Stellar: xBull Wallet & Soroban Domains';
const description = 'Stellar Global Discord event recording featuring the Creit Tech team discussing their multi-functional wallet, xBull, and Soroban Domains! Hosted by';
const image = 'https://edunode.org/og/xbull-and-soroban-domains.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a1f3a 55%,#7b2ff7 100%)';
const color = '#7b2ff7';

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

export default function XBullSorobanDomains() {
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
        heroText="Soroban smart contracts and a powerful Stellar wallet"
        tag="Stellar · Wallet · Soroban"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>Stellar Global Discord event recording featuring the Creit Tech team discussing their multi-functional wallet, xBull, and Soroban Domains!</p><p></p><p>Hosted by Olvis Gil &amp; Fergal, with special guest Enrique Arrieta!</p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Learn more about <a href="/stellar">Stellar development</a>, <a href="/blog/freighter-wallet">Varial wallet (formerly Freighter)</a>, and the <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>.` }} />
      </ArticleLayout>
    </>
  );
}
