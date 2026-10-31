import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/daos-organizaciones-autonomas';
const title = 'Descubriendo las DAOs: Organizaciones Autónomas Descentralizadas';
const description = 'Una Organización Autónoma Descentralizada, o DAO por sus siglas en inglés, es una entidad sin un cuerpo de gobierno central, donde las decisiones son';
const image = 'https://edunode.org/og/daos-organizaciones-autonomas.png';
const accent = 'linear-gradient(135deg,#241203 0%,#7a4a0f 55%,#f7931a 100%)';
const color = '#f7931a';

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

export default function DaosEspanol() {
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
        heroText="Un mundo de posibilidades en gobernanza descentralizada"
        tag="DAO · Español · Governance"
        title={title}
        date="October 25, 2026"
        readTime="4 min read"
        shareUrl={shareUrl}
        shareTitle={title}
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>Una Organización Autónoma Descentralizada, o DAO por sus siglas en inglés, es una entidad sin un cuerpo de gobierno central, donde las decisiones son tomadas democráticamente por sus miembros a través de votaciones en una cadena de bloques.</p><p>Comencemos presentando las características básicas de una DAO y otros conceptos importantes para entender mejor estas organizaciones y su papel actual en nuestra sociedad. </p>` }} />
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p dangerouslySetInnerHTML={{ __html: `Lee <a href="/glossary/dao-decentralized-autonomous-organization">qué es una DAO</a>, <a href="/blog/what-is-defi">qué es DeFi</a>, y el <a href="/crypto-fundamentals">hub de fundamentos cripto</a>.` }} />
      </ArticleLayout>
    </>
  );
}
