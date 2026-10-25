import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/stellar';
const title = 'Learn Stellar: Payments, Assets, Anchors & Soroban';
const description = 'Your Stellar learning hub: courses, a masterclass, and journals covering XLM, the Stellar Consensus Protocol, anchors, trustlines, USDC, and Soroban smart contracts.';
const image = 'https://edunode.org/og/stellar.png';
const accent = 'linear-gradient(135deg, #04121f 0%, #0b3d5c 55%, #00add8 100%)';

const sections = [
  {
    heading: 'Learn Stellar step by step',
    blurb: 'Structured paths from network fundamentals to building payment applications.',
    links: [
      { href: '/masterclasses/stellar-network-development', title: 'Stellar Network Development masterclass', desc: 'A 10-lesson path covering assets, trustlines, Horizon, anchors, path payments, and Soroban. First two lessons free.' },
      { href: '/courses/101', title: 'Basic Concepts course', desc: 'Blockchain and Stellar fundamentals — the starting point.' },
      { href: '/courses/102', title: 'Operations course', desc: 'Stellar network operations and multi-signature accounts.' },
      { href: '/courses/103', title: 'Anchors course', desc: 'How anchors bridge fiat money and Stellar assets.' },
      { href: '/courses/104', title: 'SEPs course', desc: 'Stellar Ecosystem Proposals — the standards that make services interoperable.' },
      { href: '/courses/106', title: 'Soroban course', desc: 'Smart contracts on Stellar, written in Rust and compiled to WebAssembly.' },
    ],
  },
  {
    heading: 'Journals: Stellar in depth',
    blurb: 'Deep-dives on the pieces that make the network tick.',
    links: [
      { href: '/blog/usdc-on-stellar', title: 'USDC on Stellar: Fast, Cheap Dollar Payments', desc: 'How native USDC settles in seconds for fractions of a cent — and how to hold and send it.' },
      { href: '/blog/Stellarnomics', title: 'Stellarnomics: Stellar Network Economics', desc: 'Lumens, reserves, fees, and the incentives behind the ledger.' },
      { href: '/blog/zero-knowledge-proofs', title: 'Zero-Knowledge Proofs on Stellar', desc: 'What ZK verification on Soroban enables for private, compliant payments.' },
      { href: '/blog/build-stellar-apps-with-go', title: "A Go Developer's Guide to Stellar", desc: 'Build Stellar applications with the Go SDK.' },
      { href: '/blog/freighter-wallet', title: "Freighter Wallet: Stellar's Most Popular Wallet", desc: 'Set up and use the go-to browser wallet for Stellar.' },
      { href: '/blog/what-is-a-stablecoin', title: 'What Is a Stablecoin?', desc: 'The asset class that makes Stellar payment rails useful.' },
    ],
  },
  {
    heading: 'Glossary: Stellar vocabulary',
    blurb: 'Every key term, each with its own page.',
    chips: [
      { href: '/glossary/stellar', label: 'Stellar' },
      { href: '/glossary/lumens-xlm', label: 'Lumens (XLM)' },
      { href: '/glossary/stellar-consensus-protocol-scp', label: 'SCP' },
      { href: '/glossary/soroban', label: 'Soroban' },
      { href: '/glossary/horizon', label: 'Horizon' },
      { href: '/glossary/trustline', label: 'Trustline' },
      { href: '/glossary/anchors', label: 'Anchors' },
      { href: '/glossary/path-payment', label: 'Path Payment' },
      { href: '/glossary/stellar-ecosystem-proposal-sep', label: 'SEP' },
      { href: '/glossary/stellar-core', label: 'Stellar Core' },
      { href: '/glossary/base-reserve', label: 'Base Reserve' },
      { href: '/glossary/usdc', label: 'USDC' },
    ],
  },
];

const faqs = [
  {
    q: 'What is Stellar used for?',
    a: 'Stellar is built for moving money: payments, remittances, asset issuance, and currency exchange. It settles transactions in about five seconds for fractions of a cent, and hosts regulated assets like USDC through anchors.',
  },
  {
    q: 'What is the difference between Stellar and Ethereum?',
    a: 'Ethereum is a general-purpose world computer; Stellar is purpose-built for payments and asset issuance. Stellar has faster finality, near-zero fees, built-in DEX and path payments, and Soroban for smart contracts where custom logic is needed.',
  },
  {
    q: 'What is Soroban?',
    a: 'Soroban is Stellar’s smart contracts platform. Contracts are written in Rust and compiled to WebAssembly, enabling programmable DeFi, tokens, and custom payment logic on Stellar.',
  },
  {
    q: 'How do I start learning Stellar development?',
    a: 'Begin with the free Basic Concepts course to learn accounts, assets, and transactions, then move to the Stellar Network Development masterclass for hands-on Horizon, anchors, and Soroban work.',
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

export default function Stellar() {
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
        title="Learn Stellar: The Network Built for Moving Money"
        lead="Stellar settles payments in five seconds for fractions of a cent — home of native USDC, anchors, path payments, and Soroban smart contracts. Courses, journals, and a hands-on masterclass to take you from basics to building."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
