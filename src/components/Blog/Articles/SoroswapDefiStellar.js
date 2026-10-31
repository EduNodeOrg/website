import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/defi-on-stellar-soroswap';
const title = 'DeFi on Stellar with Soroswap';
const description = 'Stellar Global Discord event recording featuring the Soroswap team discussing their upcoming AMM protocol on Soroban.! Hosted by Olvis Gil &amp;';
const image = 'https://edunode.org/og/soroswap-defi-stellar.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#0b3d5c 55%,#00add8 100%)';
const color = '#00add8';

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

export default function SoroswapDefiStellar() {
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
        heroText="An AMM protocol bringing DeFi to Soroban"
        tag="DeFi · Stellar · Soroban"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>Stellar Global Discord event recording featuring the Soroswap team discussing their upcoming AMM protocol on Soroban.!</p><p>Hosted by Olvis Gil &amp; Fergal, with special guest Esteban Iglesias!</p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Read <a href="/blog/what-is-defi">What is DeFi?</a>, learn about <a href="/glossary/automated-market-maker-amm">automated market makers</a>, and the <a href="/stellar">Stellar hub</a>.` }} />
      </ArticleLayout>
    </>
  );
}
