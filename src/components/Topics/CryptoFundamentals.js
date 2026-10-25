import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/crypto-fundamentals';
const title = 'Crypto Fundamentals: Plain-English Answers to "What Is…?"';
const description = 'The fundamentals of crypto explained simply: what is a smart contract audit, a liquidity pool, gas in Ethereum, a seed phrase, DeFi, NFTs and more — with free courses and a masterclass.';
const image = 'https://edunode.org/og/crypto-fundamentals.png';
const accent = 'linear-gradient(135deg, #3d1d04 0%, #9c5a12 55%, #f2a33c 100%)';

const sections = [
  {
    heading: '“What is…?” — the questions everyone asks',
    blurb: 'Each answer links to its own glossary page with a clear definition and further reading.',
    chips: [
      { href: '/glossary/smart-contract-audit', label: 'What is a smart contract audit?' },
      { href: '/glossary/liquidity-pool', label: 'What is a liquidity pool?' },
      { href: '/glossary/gas', label: 'What is gas in Ethereum?' },
      { href: '/glossary/seed-phrase', label: 'What is a seed phrase?' },
      { href: '/glossary/public-and-private-keys', label: 'What are private keys?' },
      { href: '/glossary/wallet', label: 'What is a crypto wallet?' },
      { href: '/glossary/stablecoin', label: 'What is a stablecoin?' },
      { href: '/glossary/decentralized-finance-defi', label: 'What is DeFi?' },
      { href: '/glossary/nft-non-fungible-token', label: 'What is an NFT?' },
      { href: '/glossary/blockchain', label: 'What is blockchain?' },
      { href: '/glossary/smart-contract', label: 'What is a smart contract?' },
      { href: '/glossary/oracle', label: 'What is an oracle?' },
      { href: '/glossary/mining', label: 'What is mining?' },
      { href: '/glossary/proof-of-work-pow', label: 'What is Proof of Work?' },
      { href: '/glossary/proof-of-stake-pos', label: 'What is Proof of Stake?' },
      { href: '/glossary/token', label: 'What is a token?' },
      { href: '/glossary/testnet', label: 'What is a testnet?' },
      { href: '/glossary/mainnet', label: 'What is mainnet?' },
      { href: '/glossary/airdrop', label: 'What is an airdrop?' },
      { href: '/glossary/decentralized-application-dapp', label: 'What is a dApp?' },
    ],
  },
  {
    heading: 'Learn the fundamentals properly',
    blurb: 'Structured paths that build real understanding, not just vocabulary.',
    links: [
      { href: '/masterclasses/crypto-fundamentals', title: 'Crypto Fundamentals masterclass', desc: 'A 10-lesson path covering keys, wallets, tokens, transactions, DeFi basics, and staying safe. First two lessons free.' },
      { href: '/courses/101', title: 'Basic Concepts course', desc: 'Interactive introduction to blockchain and Stellar fundamentals.' },
      { href: '/courses/112', title: 'Web3 Fundamentals course', desc: 'Web3 development, blockchain technology, and dApps — free for members.' },
      { href: '/glossary', title: 'Full Web3 & Blockchain glossary', desc: 'Every term in the ecosystem, each with its own page.' },
    ],
  },
  {
    heading: 'Journals for beginners',
    blurb: 'Longer reads that connect the dots between the fundamentals.',
    links: [
      { href: '/blog/learn-about-blockchain', title: 'Learn About Blockchain', desc: 'How distributed ledgers work and why they matter beyond cryptocurrency.' },
      { href: '/blog/crypto-wallet-security', title: 'Crypto Wallet Security: Seed Phrases & Passkeys', desc: 'How to protect your keys — the single most important skill in crypto.' },
      { href: '/blog/what-is-defi', title: 'What Is DeFi? A Beginner’s Guide', desc: 'Lending, trading, and earning without banks — explained simply.' },
      { href: '/blog/what-is-a-stablecoin', title: 'What Is a Stablecoin?', desc: 'The bridge between traditional money and the blockchain economy.' },
    ],
  },
];

const faqs = [
  {
    q: 'What is the most important thing to learn first in crypto?',
    a: 'Key management. Every crypto asset is controlled by private keys and seed phrases — whoever holds them owns the funds. Understanding wallets and security before buying anything prevents the most common beginner losses.',
  },
  {
    q: 'What is the difference between a coin and a token?',
    a: 'A coin is a blockchain’s native currency — BTC on Bitcoin, ETH on Ethereum, XLM on Stellar. A token is issued on top of a chain by a smart contract or asset issuer — USDC, governance tokens, and NFTs are all tokens.',
  },
  {
    q: 'Is crypto safe for beginners?',
    a: 'The technology is reliable, but the risks are real: volatility, scams, phishing, and irreversible mistakes. Learning the fundamentals — wallets, seed phrases, how transactions work — before investing is the safest path.',
  },
  {
    q: 'Do I need money to start learning crypto?',
    a: 'No. Testnets provide free practice funds, and EduNode’s free courses, masterclass lessons, and challenges let you learn and experiment without spending anything.',
  },
];

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: shareUrl,
  isPartOf: { '@type': 'WebSite', name: 'EduNode', url: 'https://edunode.org' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function CryptoFundamentals() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <TopicPage
        accent={accent}
        eyebrow="EduNode Topic Hub"
        title="Crypto Fundamentals: The Basics, Explained Simply"
        lead="New to crypto? Start here. Plain-English answers to every “what is…” question — wallets, keys, gas, liquidity pools, audits — plus free courses and a masterclass to build real understanding."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
