import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/ethereum';
const title = 'Learn Ethereum: Smart Contracts, Gas & Web3 Development';
const description = 'Your Ethereum learning hub: free courses and a masterclass covering ETH, gas, smart contracts, Solidity, DeFi, and Layer 2 — plus plain-English glossary answers for every key term.';
const image = 'https://edunode.org/og/ethereum.png';
const accent = 'linear-gradient(135deg, #1c1340 0%, #3b2f8f 55%, #627eea 100%)';

const sections = [
  {
    heading: 'Learn Ethereum step by step',
    blurb: 'Structured paths from first concepts to smart contract development.',
    links: [
      { href: '/masterclasses/ethereum-development', title: 'Ethereum Development Essentials masterclass', desc: 'A 10-lesson path from wallets and gas to Solidity smart contracts, testing, and deployment. First two lessons free.' },
      { href: '/courses/107', title: 'Ethereum Basics course', desc: 'Interactive introduction to Ethereum: accounts, transactions, gas, and how the network works.' },
      { href: '/courses/113', title: 'Advanced Smart Contract Development', desc: 'Solidity patterns, upgradeable contracts, gas optimization, and DeFi application architecture. (Pro)' },
      { href: '/courses/114', title: 'DeFi Protocol Engineering', desc: 'AMMs, lending, oracles, and flash loans — the protocols that run on Ethereum. (Pro)' },
    ],
  },
  {
    heading: 'Journals: Ethereum and smart contracts',
    blurb: 'Deep-dives on the concepts Ethereum developers and users ask about most.',
    links: [
      { href: '/blog/smart-contracts', title: 'What Are Smart Contracts?', desc: 'Self-executing agreements in code — what they are, how they run on Ethereum, and why they matter.' },
      { href: '/blog/smart-contract-security-vulnerabilities', title: 'Top 10 Smart Contract Security Vulnerabilities', desc: 'Reentrancy, oracle manipulation, access control failures — the bugs auditors hunt for.' },
      { href: '/blog/what-is-defi', title: 'What Is DeFi? A Beginner’s Guide', desc: 'Decentralized finance protocols — most of which live on Ethereum — explained simply.' },
    ],
  },
  {
    heading: 'Glossary: Ethereum vocabulary',
    blurb: 'Every "what is…" answer in plain English.',
    chips: [
      { href: '/glossary/ethereum', label: 'Ethereum' },
      { href: '/glossary/gas', label: 'Gas' },
      { href: '/glossary/evm-ethereum-virtual-machine', label: 'EVM' },
      { href: '/glossary/smart-contract', label: 'Smart Contract' },
      { href: '/glossary/smart-contract-audit', label: 'Smart Contract Audit' },
      { href: '/glossary/proof-of-stake-pos', label: 'Proof of Stake' },
      { href: '/glossary/layer-2', label: 'Layer 2' },
      { href: '/glossary/rollup', label: 'Rollup' },
      { href: '/glossary/mev-maximal-extractable-value', label: 'MEV' },
    ],
  },
];

const faqs = [
  {
    q: 'What is Ethereum in simple terms?',
    a: 'Ethereum is a programmable blockchain — a global shared computer where developers deploy smart contracts that power DeFi apps, NFTs, stablecoins, and DAOs. Its native currency is ETH.',
  },
  {
    q: 'What is gas in Ethereum?',
    a: 'Gas is the fee paid to the network for every operation — sending ETH, swapping tokens, or running a smart contract. Fees are priced in ETH and rise with network congestion.',
  },
  {
    q: 'What is the difference between Bitcoin and Ethereum?',
    a: 'Bitcoin is designed primarily as digital money with a fixed supply. Ethereum is a general-purpose platform: its main product is computation, letting anyone deploy programs (smart contracts) that move assets and enforce rules automatically.',
  },
  {
    q: 'How do I start learning Ethereum development?',
    a: 'Start with the fundamentals — accounts, transactions, and gas — in our free Ethereum Basics course, then move to the Ethereum Development masterclass for hands-on Solidity practice.',
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

export default function Ethereum() {
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
        title="Learn Ethereum: From Gas Fees to Smart Contracts"
        lead="Ethereum is the programmable backbone of Web3. Learn how it works — accounts, gas, smart contracts, DeFi, and Layer 2 scaling — with free courses, journals, and a hands-on masterclass."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
