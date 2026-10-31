import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/soroban-blockchain-espanol';
const title = 'Soroban y la blockchain de Stellar — Explicación en Español';
const description = 'Vamos a conocer tanto Stellar como su plataforma de contratos inteligentes llamada';
const image = 'https://edunode.org/og/soroban-blockchain-espanol.png';
const accent = 'linear-gradient(135deg,#141414 0%,#0f5a52 55%,#10a37f 100%)';
const color = '#10a37f';

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

export default function SorobanEspanol() {
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
        heroText="La plataforma de contratos inteligentes de Stellar, explicada"
        tag="Soroban · Español · Smart Contracts"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>Vamos a conocer tanto Stellar como su plataforma de contratos inteligentes llamada Soroban.</p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Conoce el <a href="/stellar">hub de Stellar</a>, el <a href="/masterclasses/stellar-network-development">masterclass de Stellar</a>, y <a href="/glossary/soroban">qué es Soroban</a>.` }} />
      </ArticleLayout>
    </>
  );
}
