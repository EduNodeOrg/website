import React from 'react';
import { Helmet } from 'react-helmet-async';
import EuroIcon from '@mui/icons-material/Euro';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/usdc-vs-eurc';
const title = 'USDC vs EURC: Circle’s Dollar and Euro Stablecoins Compared';
const description = 'USDC and EURC are both fully-reserved Circle stablecoins — one pegged to the US dollar, one to the euro. How they differ, where each is used, and why Stellar hosts both.';
const image = 'https://edunode.org/og/usdc-vs-eurc.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#143d5c 55%,#2775ca 100%)';
const color = '#2775ca';

const faqs = [{ q: 'What is EURC?', a: 'EURC is Circle’s euro-denominated stablecoin — one EURC is designed to be worth one euro, backed by euro-denominated reserves held at regulated financial institutions, with the same attestation model as USDC.' }, { q: 'Is EURC on Stellar?', a: 'Yes. EURC is issued natively on Stellar (and Ethereum, Solana, Base and others), making it one of the easiest regulated euro stablecoins to hold and transfer on-chain.' }, { q: 'Should I hold USDC or EURC?', a: 'Match the stablecoin to your liability: if you spend or invoice in dollars, USDC; if your life runs in euros, EURC removes FX risk. Both carry the same issuer and reserve model, so the choice is currency exposure, not safety.' }, { q: 'Can I swap between USDC and EURC on Stellar?', a: 'Yes — on the Stellar DEX or via anchors, and wallets like Varial support both assets. Liquidity is smaller than USDC pairs, so check rates for large amounts.' }];

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

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function UsdcVsEurc() {
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
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <ArticleLayout
        accent={accent}
        color={color}
        heroIcon={<EuroIcon style={s.heroIcon} />}
        heroText="Same issuer, same trust model — different currency exposure"
        tag="Stablecoins · USDC · EURC"
        title={title}
        date="October 31, 2026"
        readTime="7 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          <strong>USDC</strong> and <strong>EURC</strong> are both issued by Circle under the same
          fully-reserved model — cash and short-term government bonds held at regulated institutions,
          with monthly attestations. The difference is what one token represents: a US dollar or a
          euro. Choosing between them is really choosing which currency exposure you want on-chain.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where they differ</h4>
        <p>
          <strong>Scale:</strong> USDC is one of the largest stablecoins in the world — deep liquidity
          across every major chain, exchange, and DeFi protocol. EURC is far smaller but the leading
          regulated euro stablecoin, growing with European demand and MiCA compliance.
          <strong>Use case:</strong> USDC dominates trading, remittances, and dollar-denominated DeFi.
          EURC serves euro payroll, euro remittances, FX corridors, and European businesses that want
          on-chain settlement without dollar exposure.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Both are native on Stellar</h4>
        <p>
          Stellar is unusual in hosting both Circle stablecoins natively — USDC since 2021 and EURC
          since 2023. That enables a real use case unique to the network: <strong>USDC↔EURC payments
          that settle on-chain in ~5 seconds for fractions of a cent</strong>, using the Stellar DEX
          or anchors to convert between them. For dollar-to-euro remittances, this is one of the
          cheapest regulated rails available.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Which should you hold?</h4>
        <p>
          Match the stablecoin to your liability. Live and spend in euros? EURC removes the FX risk
          of holding dollars. Trade or invoice in USD? USDC's liquidity is unmatched. The issuer,
          reserve model, and regulatory standing are the same — this is a currency decision, not a
          safety decision.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/stablecoins">Stablecoins hub</a> ·
          <a href="/blog/usdc-vs-usdt">USDC vs USDT</a> ·
          <a href="/blog/usdc-on-stellar">USDC on Stellar</a> ·
          <a href="/glossary/usdc">What is USDC?</a> ·
          <a href="/masterclasses/stablecoins-in-practice">Stablecoins in Practice masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
