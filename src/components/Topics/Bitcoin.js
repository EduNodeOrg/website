import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/bitcoin';
const title = 'Learn Bitcoin: How the First Cryptocurrency Works';
const description = 'Your Bitcoin learning hub: plain-English journals, a free masterclass, and glossary answers covering mining, Proof of Work, keys, wallets, and the blockchain Bitcoin created.';
const image = 'https://edunode.org/og/bitcoin.png';
const accent = 'linear-gradient(135deg, #241203 0%, #7a4a0f 55%, #f7931a 100%)';

const sections = [
  {
    heading: 'Learn the fundamentals',
    blurb: 'Bitcoin is where it all started — and the best way to understand it is through the fundamentals it invented.',
    links: [
      { href: '/masterclasses/crypto-fundamentals', title: 'Crypto Fundamentals masterclass', desc: 'A 10-lesson path covering keys, wallets, transactions, tokens, and staying safe — with Bitcoin as the running example. First two lessons free.' },
      { href: '/courses/101', title: 'Basic Concepts course', desc: 'Blockchain fundamentals: distributed ledgers, consensus, and how Bitcoin’s design works.' },
      { href: '/courses/112', title: 'Web3 Fundamentals course', desc: 'The ecosystem Bitcoin launched — wallets, dApps, and Web3 — free for members.' },
    ],
  },
  {
    heading: 'Journals: Bitcoin and the tech behind it',
    blurb: 'Longer reads on the ideas Bitcoin introduced and the ecosystem it spawned.',
    links: [
      { href: '/blog/learn-about-blockchain', title: 'Learn About Blockchain', desc: 'The distributed ledger Bitcoin invented — how blocks, mining, and consensus fit together.' },
      { href: '/blog/crypto-wallet-security', title: 'Crypto Wallet Security: Seed Phrases & Passkeys', desc: 'Keys, seed phrases, and hardware wallets — how to hold BTC safely.' },
      { href: '/blog/what-is-a-stablecoin', title: 'What Is a Stablecoin?', desc: 'Why Bitcoin’s volatility created demand for dollar-pegged tokens.' },
      { href: '/blog/what-is-defi', title: 'What Is DeFi?', desc: 'The financial ecosystem that grew from Bitcoin’s invention.' },
    ],
  },
  {
    heading: 'Glossary: Bitcoin vocabulary',
    blurb: 'Every key term, each with its own page.',
    chips: [
      { href: '/glossary/bitcoin', label: 'Bitcoin' },
      { href: '/glossary/blockchain', label: 'Blockchain' },
      { href: '/glossary/mining', label: 'Mining' },
      { href: '/glossary/proof-of-work-pow', label: 'Proof of Work' },
      { href: '/glossary/cryptocurrency', label: 'Cryptocurrency' },
      { href: '/glossary/distributed-ledger', label: 'Distributed Ledger' },
      { href: '/glossary/node', label: 'Node' },
      { href: '/glossary/wallet', label: 'Wallet' },
      { href: '/glossary/public-and-private-keys', label: 'Keys' },
      { href: '/glossary/seed-phrase', label: 'Seed Phrase' },
      { href: '/glossary/mainnet', label: 'Mainnet' },
      { href: '/glossary/testnet', label: 'Testnet' },
    ],
  },
];

const faqs = [
  {
    q: 'What is Bitcoin in simple terms?',
    a: 'Bitcoin is digital money secured by a public blockchain instead of a bank. It has a fixed supply of 21 million coins, is maintained by thousands of independent computers, and lets anyone send value globally without permission.',
  },
  {
    q: 'What is Bitcoin mining?',
    a: 'Mining is how new blocks are added and coins issued. Miners race to solve a computational puzzle (Proof of Work); the winner adds the next block of transactions and earns the block reward. The energy spent makes the ledger expensive to attack.',
  },
  {
    q: 'What is the difference between Bitcoin and Ethereum?',
    a: 'Bitcoin is designed as money — a scarce store of value with a simple, conservative protocol. Ethereum is a programmable platform for smart contracts and apps. Bitcoin optimizes for security and simplicity; Ethereum for flexibility.',
  },
  {
    q: 'Can I learn about Bitcoin without buying it?',
    a: 'Yes — completely. Our free courses, masterclass lessons, and articles explain how Bitcoin works, and testnet environments let you experiment without spending anything.',
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

export default function Bitcoin() {
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
        title="Learn Bitcoin: The Original Cryptocurrency"
        lead="Bitcoin introduced the world to blockchain — a fixed-supply digital money secured by Proof of Work. Learn how it works, why mining matters, and how to hold keys safely with free courses, journals, and a masterclass."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
