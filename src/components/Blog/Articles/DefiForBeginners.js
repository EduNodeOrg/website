import React from 'react';
import { Helmet } from 'react-helmet-async';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/defi-for-beginners';
const title = 'DeFi for Beginners: How Decentralized Finance Actually Works';
const description = 'A hands-on introduction to DeFi — wallets, swaps, liquidity pools, lending, and stablecoins — explained without jargon, with honest risks and a safe first-steps path.';
const image = 'https://edunode.org/og/defi-for-beginners.png';
const accent = 'linear-gradient(135deg,#04121f 0%,#0f3d2e 55%,#00d4a0 100%)';
const color = '#00d4a0';

const faqs = [{ q: 'What is DeFi in one sentence?', a: 'DeFi — decentralized finance — is a set of smart contracts that let people trade, lend, borrow, and earn interest directly on a blockchain, without banks or brokers.' }, { q: 'Is DeFi safe for beginners?', a: 'DeFi has real risks: smart-contract bugs, scams, impermanent loss, and no customer support if you make a mistake. Start small with money you can afford to lose, use established protocols, and learn on a testnet first.' }, { q: 'How do I start with DeFi?', a: 'Get a non-custodial wallet (MetaMask for Ethereum, Varial for Stellar), buy a small amount of crypto or a stablecoin on an exchange, withdraw to your wallet, and try a small swap on a major DEX. Learn the mechanics with amounts that do not matter.' }, { q: 'What can you earn in DeFi?', a: 'Yields come from trading fees (liquidity provision), lending interest, and protocol incentives. Sustainable single-digit yields exist; double-digit “APY” offers usually hide token inflation or risk. If a yield seems too good, it is.' }];

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

export default function DefiForBeginners() {
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
        heroIcon={<TrendingUpIcon style={s.heroIcon} />}
        heroText="Finance without banks — learn it safely, step by step"
        tag="DeFi · Beginner · Guide"
        title={title}
        date="October 31, 2026"
        readTime="9 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          DeFi — decentralized finance — is crypto's second act after "digital money": a stack of
          smart contracts that replicate banking functions — trading, lending, borrowing, earning
          interest — without the bank. This is the beginner path: what the pieces are, how to try
          them safely, and where the honest risks hide.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The building blocks</h4>
        <p>
          DeFi is a handful of composable primitives: <strong>DEXs</strong> (decentralized
          exchanges like Uniswap or the Stellar DEX) swap tokens via liquidity pools instead of
          order-matching middlemen; <strong>lending protocols</strong> (Aave, Blend) let you earn
          interest or borrow against collateral automatically; <strong>stablecoins</strong>
          (USDC, EURC) give the whole system a stable unit of account. Everything composes — a
          loan collateralizes a stablecoin which swaps on a DEX — which is why people call it
          money Lego.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Your first five steps</h4>
        <p>
          1) Get a <a href="/glossary/non-custodial-wallet">non-custodial wallet</a> and secure
          the seed phrase. 2) Buy a small amount of crypto or USDC on a regulated exchange.
          3) Withdraw to your wallet — small test amount first. 4) Make a small swap on a
          major DEX — feel what a gas fee or network fee is. 5) Optional: provide a small amount
          of liquidity to a pool and watch fees accrue. Every step is reversible and cheap to
          learn on a testnet first.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where the yield comes from</h4>
        <p>
          DeFi yields are not magic: liquidity providers earn a share of trading fees, lenders
          earn borrower interest, and protocols sometimes subsidize adoption with token rewards.
          The first two are real cash flows; the third is inflation with extra steps. Sustainable
          yields in DeFi look like bond yields — anything advertising triple digits is selling
          risk you have not identified yet.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The honest risk list</h4>
        <p>
          Smart contracts have bugs (audited ones too); pools suffer impermanent loss; scams are
          rampant — fake tokens, phishing sites, rug pulls. There is no chargeback and no support
          desk. The defense: start small, use audited established protocols, verify URLs
          obsessively, never sign a transaction you do not understand, and never invest more than
          you can fully lose.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/blog/what-is-defi">What is DeFi?</a> ·
          <a href="/glossary/liquidity-pool">What is a liquidity pool?</a> ·
          <a href="/glossary/automated-market-maker-amm">What is an AMM?</a> ·
          <a href="/stablecoins">Stablecoins hub</a> ·
          <a href="/masterclasses/crypto-fundamentals">Crypto Fundamentals masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
