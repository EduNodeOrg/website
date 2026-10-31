import React from 'react';
import { Helmet } from 'react-helmet-async';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-a-liquidity-pool';
const title = 'What Is a Liquidity Pool? AMMs and DeFi Trading Explained';
const description = 'Liquidity pools let DEXs trade without order books — users deposit token pairs, algorithms price them, providers earn fees. How it works, impermanent loss, and where the yield comes from.';
const image = 'https://edunode.org/og/what-is-a-liquidity-pool.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#1f2a6b 55%,#2962ff 100%)';
const color = '#2962ff';

const faqs = [{ q: 'What is a liquidity pool in simple terms?', a: 'A liquidity pool is a smart contract holding a pair of tokens — say USDC and XLM — that users can trade against directly. Instead of matching buyers with sellers, the pool’s algorithm sets the price from the ratio of tokens inside.' }, { q: 'How do liquidity providers earn money?', a: 'Every trade through the pool pays a small fee (typically 0.3%) that is distributed to liquidity providers proportional to their share. On busy pools this adds up; on quiet ones it does not cover the risks.' }, { q: 'What is impermanent loss?', a: 'When the price ratio of your deposited tokens changes, the pool rebalances your share — you end up with more of the token that fell and less of the one that rose. Compared to just holding, you can be worse off. It is called impermanent because it reverses if prices return to your entry ratio — but often they do not.' }, { q: 'Are liquidity pools safe?', a: 'The mechanism is sound but risks are real: smart-contract bugs, scam pools with fake tokens, impermanent loss, and thin liquidity causing slippage. Stick to established protocols and audited pools.' }];

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

export default function WhatIsALiquidityPool() {
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
        heroIcon={<WaterDropIcon style={s.heroIcon} />}
        heroText="The engine behind every decentralized exchange"
        tag="DeFi · Liquidity · AMM"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Every time you swap tokens on a decentralized exchange, a <strong>liquidity pool</strong>
          made it possible. No order book, no market maker — just a smart contract holding tokens
          that anyone can trade against, priced by math instead of matching orders. It is the
          mechanism DeFi runs on.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>How a pool works</h4>
        <p>
          Users called <strong>liquidity providers</strong> deposit a token pair — for example
          equal values of USDC and XLM — into a smart contract. Traders swap against that pool:
          put USDC in, take XLM out. The pool's <a href="/glossary/automated-market-maker-amm">AMM</a>
          sets the price automatically from the token ratio (the classic formula is x·y=k — sell
          one token and it gets scarcer, so its price rises). Every trade pays a small fee,
          typically ~0.3%, distributed to providers pro-rata.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where the yield comes from — and the catch</h4>
        <p>
          Provider yield is real: you earn a share of every trade through your pool. The catch is
          <strong>impermanent loss</strong> — when prices move, the pool automatically rebalances
          your position to hold more of the token that fell and less of the one that rose. On a
          big price move you can end up worse than just holding. The yield compensates you for
          this risk — on volatile pairs, sometimes not enough.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Liquidity pools on Stellar</h4>
        <p>
          Stellar has native liquidity pools built into the protocol itself (not just smart
          contracts) — any asset pair can have a pool, fees route to providers, and swaps can
          execute against pools or the built-in order-book DEX, whichever gives the better rate.
          Path payments even chain multiple conversions automatically, so a USDC→EURC payment can
          route through pools mid-transaction.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The honest take</h4>
        <p>
          Pools are a genuine innovation — they made on-chain trading work without market makers.
          But "provide liquidity and earn" is not passive income: impermanent loss, scam pools
          with worthless tokens, and thin liquidity all eat returns. Established pools with real
          volume and stablecoin pairs are the sensible starting point; triple-digit APY pools are
          where beginners learn the risk lesson.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/liquidity-pool">Liquidity pool term</a> ·
          <a href="/glossary/automated-market-maker-amm">What is an AMM?</a> ·
          <a href="/glossary/impermanent-loss">Impermanent loss</a> ·
          <a href="/blog/defi-for-beginners">DeFi for Beginners</a> ·
          <a href="/blog/defi-on-stellar-soroswap">DeFi on Stellar: Soroswap</a>
        </p>
      </ArticleLayout>
    </>
  );
}
