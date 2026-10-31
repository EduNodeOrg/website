import React from 'react';
import { Helmet } from 'react-helmet-async';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-a-depeg';
const title = 'What Is a Depeg? When Stablecoins Lose Their Peg';
const description = 'A depeg is when a stablecoin stops being worth what it promises — USDT’s brief slips, USDC’s 2023 bank-crisis dip, and UST’s collapse. Why pegs break and how to read the risk.';
const image = 'https://edunode.org/og/what-is-a-depeg.png';
const accent = 'linear-gradient(135deg,#1f0a0a 0%,#4d1f1f 55%,#ff5252 100%)';
const color = '#ff5252';

const faqs = [{ q: 'What does depeg mean?', a: 'A depeg is when a stablecoin trades away from its intended value — a USDC meant to be $1 trading at $0.87. Small temporary slips happen under market stress; a full collapse means the peg mechanism failed entirely.' }, { q: 'Has USDC ever depegged?', a: 'Yes — in March 2023 USDC dipped to ~$0.87 when Silicon Valley Bank, which held part of its reserves, collapsed. It recovered within days when the US backstopped deposits. This is exactly why reserve transparency matters.' }, { q: 'What was the UST collapse?', a: 'TerraUSD (UST) was an algorithmic stablecoin with no real collateral — pegged by minting/burning against its sister token LUNA. When confidence cracked in May 2022, the death spiral destroyed ~$40B in days. It is the canonical example of why algorithmic pegs are fragile.' }, { q: 'How do I know if a stablecoin might depeg?', a: 'Check the backing model: fully-reserved fiat-backed (USDC, USDT) is strongest; crypto-collateralized (DAI) depends on over-collateralization; algorithmic is the weakest. Then check attestations, audit reports, and redemption liquidity — the peg is only as good as what stands behind it.' }];

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

export default function WhatIsADepeg() {
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
        heroIcon={<TrendingDownIcon style={s.heroIcon} />}
        heroText="The one thing a stablecoin promises — and sometimes breaks"
        tag="Stablecoins · Depeg · Risk"
        title={title}
        date="October 31, 2026"
        readTime="7 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          A stablecoin has exactly one job: hold its peg. A <strong>depeg</strong> is when it
          fails — a token promising $1 trades at $0.97, or $0.87, or zero. Understanding why
          pegs break is the difference between using stablecoins safely and learning about risk
          the expensive way.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Small slips vs full collapse</h4>
        <p>
          There are two very different events people call depegs. <strong>Temporary deviations</strong>
          — USDC dipping to $0.97 during stress, or USDT wobbling a few cents — are normal market
          mechanics: redemption still works, arbitrageurs pull the price back. <strong>Structural
          failure</strong> is when the peg mechanism itself breaks — collateral is missing or the
          algorithm cannot stabilize — and the coin never comes back.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The cautionary tale: UST</h4>
        <p>
          TerraUSD was the largest algorithmic stablecoin — no real collateral, pegged by a
          mint/burn mechanism against its volatile sister token LUNA. In May 2022 redemptions
          spiked, the algorithm printed LUNA to defend the peg, LUNA's price collapsed under
          hyperinflation, and ~$40 billion evaporated in days. UST is why "algorithmic" is now a
          warning label rather than a feature.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Even fiat-backed coins depeg — briefly</h4>
        <p>
          USDC itself dipped to $0.87 in March 2023 when Silicon Valley Bank — holding part of
          Circle's reserves — failed. The peg recovered in days once the US backstopped deposits,
          but it proved a key point: <strong>a fiat-backed stablecoin inherits the risks of its
          banking system</strong>. Transparency about reserves is not marketing — it is the
          entire risk model.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>How to evaluate peg risk</h4>
        <p>
          Ask three questions: <strong>What backs it?</strong> (cash and Treasuries > crypto
          collateral > algorithms); <strong>Who attests it?</strong> (monthly third-party
          attestations > self-reported); <strong>Can I redeem it?</strong> (direct redemption
          at par with the issuer is the real peg mechanism — everything else is market making).
          Stablecoins that pass all three depeg briefly and recover; ones that fail the first
          question can go to zero.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/stablecoins">Stablecoins hub</a> ·
          <a href="/glossary/depeg">Depeg glossary term</a> ·
          <a href="/blog/how-stablecoins-work">How stablecoins work</a> ·
          <a href="/blog/are-stablecoins-decentralized">Are stablecoins decentralized?</a> ·
          <a href="/masterclasses/stablecoins-in-practice">Stablecoins masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
