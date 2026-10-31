import React from 'react';
import { Helmet } from 'react-helmet-async';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-web3';
const title = 'What Is Web3? A Plain-English Beginner’s Guide';
const description = 'Web3 means an internet where users own assets and identity through blockchains instead of platform accounts. What it actually is, what it is not, and how to start learning it.';
const image = 'https://edunode.org/og/what-is-web3.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1f3a5f 55%,#00d4ff 100%)';
const color = '#00d4ff';

const faqs = [{ q: 'What is Web3 in simple terms?', a: 'Web3 is the idea of an internet built on blockchains, where users hold assets and identity in their own wallets instead of in platform accounts. If Web2 was read-write (social platforms own your data), Web3 is read-write-own: tokens and wallets let users own pieces of networks directly.' }, { q: 'Is Web3 the same as crypto?', a: 'Crypto is the technology — blockchains and tokens. Web3 is the broader vision built on it: decentralized applications, on-chain identity, token-based ownership. All Web3 uses crypto; not all crypto use is Web3.' }, { q: 'Is Web3 dead?', a: 'The 2022 hype cycle is over, but the infrastructure kept shipping: stablecoins process real payment volume, tokenized funds launched, and smart-contract platforms keep improving. Web3 as a label cooled; the underlying technology did not.' }, { q: 'How do I start learning Web3?', a: 'Learn the fundamentals first — what a blockchain is, how wallets and keys work, what smart contracts do — then build something small. EduNode’s free Crypto Fundamentals masterclass and courses cover exactly that path.' }];

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

export default function WhatIsWeb3() {
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
        heroIcon={<LanguageIcon style={s.heroIcon} />}
        heroText="Own your assets and identity — not just rent an account"
        tag="Web3 · Blockchain · Beginner"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          <strong>Web3</strong> is one of those terms everyone uses and few define cleanly. The
          short version: an internet where users <em>own</em> things — money, identity, assets,
          governance rights — through blockchains and wallets, instead of renting accounts on
          platforms. Here is what that actually means and what it does not.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Web1, Web2, Web3</h4>
        <p>
          The story goes: <strong>Web1</strong> was read-only — static pages you consumed.
          <strong>Web2</strong> was read-write — you posted content, but platforms owned the data
          and the audience. <strong>Web3</strong> adds <em>own</em>: your assets live in a wallet
          you control, your identity is a key pair not a login, and users can own pieces of the
          networks they use through tokens.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What is actually different</h4>
        <p>
          Three concrete changes: <strong>wallets</strong> replace accounts — you authenticate by
          signing, not by password reset; <strong>smart contracts</strong> replace trusted
          backends — the rules are on-chain code, not a company's database; and <strong>tokens</strong>
          make ownership programmable — money, votes, membership, and assets all move on the same
          rails. Whether that matters for a given app depends on whether intermediaries were the
          actual problem.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The honest critique</h4>
        <p>
          Web3's real criticism: decentralization is hard and most users want convenience — many
          "Web3" apps quietly re-centralize around hosted wallets and company APIs. The hype
          burned a lot of people in 2021-22. The balanced take: the technology delivers where
          intermediaries genuinely extract rent (payments, remittances, tokenized assets) and
          overpromises where platforms were actually solving real problems.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where to start learning</h4>
        <p>
          Start with fundamentals — what a blockchain is, how keys and wallets work, what smart
          contracts do — before touching trading or NFTs. Our
          <a href="/crypto-fundamentals">Crypto Fundamentals hub</a> covers the concepts,
          the free <a href="/masterclasses/crypto-fundamentals">masterclass lessons</a> walk you
          through them, and the <a href="/stellar">Stellar</a> and
          <a href="/ethereum">Ethereum</a> hubs are the on-ramps to building real things.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/web3">Web3 glossary term</a> ·
          <a href="/crypto-fundamentals">Crypto Fundamentals hub</a> ·
          <a href="/blog/what-is-defi">What is DeFi?</a> ·
          <a href="/masterclasses/crypto-fundamentals">Crypto Fundamentals masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
