import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/stablecoins';
const title = 'Stablecoins: Learn How Digital Dollars Work on Blockchain';
const description = 'Your stablecoin learning hub: plain-English journals on USDC vs USDT, decentralization, and how fiat- and crypto-backed stablecoins work — plus a free masterclass and glossary.';
const image = 'https://edunode.org/og/stablecoins.png';
const accent = 'linear-gradient(135deg, #063a2c 0%, #0a7d5c 55%, #00c389 100%)';

const sections = [
  {
    heading: 'Journals: understand stablecoins',
    blurb: 'In-depth guides covering what stablecoins are, how they hold their peg, and how the biggest issuers compare.',
    links: [
      { href: '/blog/what-is-a-stablecoin', title: 'What Is a Stablecoin? How USDC Works on Stellar', desc: 'The foundations: what stablecoins are, the four types, and why they matter for payments and DeFi.' },
      { href: '/blog/usdc-vs-usdt', title: "USDC vs USDT: What's the Difference?", desc: 'The two largest dollar stablecoins compared on reserves, transparency, regulation, and where each is used.' },
      { href: '/blog/how-stablecoins-work', title: 'How Stablecoins Work: Fiat-Backed vs Crypto-Backed vs Algorithmic', desc: 'The three peg mechanisms explained — reserves, over-collateralization, and algorithms — with real examples.' },
      { href: '/blog/are-stablecoins-decentralized', title: 'Are Stablecoins Actually Decentralized?', desc: 'A honest look at issuer control, freezing powers, reserve custody, and what "decentralized" really means here.' },
      { href: '/blog/usdc-on-stellar', title: 'USDC on Stellar: Fast, Cheap Dollar Payments', desc: 'How native USDC on Stellar settles in seconds for fractions of a cent — and how to hold and send it.' },
    ],
  },
  {
    heading: 'Go deeper: masterclass and courses',
    blurb: 'Structured lessons that take you from concepts to hands-on practice.',
    links: [
      { href: '/masterclasses/stablecoins-in-practice', title: 'Stablecoins in Practice: Digital Dollars on the Blockchain', desc: 'A 10-lesson masterclass on stablecoin mechanics, risks, and real-world use. First two lessons free.' },
      { href: '/courses/103', title: 'Anchors course', desc: 'Learn how anchors connect fiat money to the Stellar network — the rails stablecoins run on.' },
      { href: '/courses/101', title: 'Basic Concepts course', desc: 'Blockchain and Stellar fundamentals for beginners.' },
    ],
  },
  {
    heading: 'Glossary: stablecoin vocabulary',
    blurb: 'Quick definitions of every term used across these guides.',
    chips: [
      { href: '/glossary/stablecoin', label: 'Stablecoin' },
      { href: '/glossary/usdc', label: 'USDC' },
      { href: '/glossary/usdt', label: 'USDT' },
      { href: '/glossary/depeg', label: 'Depeg' },
      { href: '/glossary/anchors', label: 'Anchors' },
      { href: '/glossary/trustline', label: 'Trustline' },
      { href: '/glossary/path-payment', label: 'Path Payment' },
      { href: '/glossary/liquidity-pool', label: 'Liquidity Pool' },
    ],
  },
];

const faqs = [
  {
    q: 'What is a stablecoin in simple terms?',
    a: 'A stablecoin is a cryptocurrency designed to hold a steady value — usually pegged 1:1 to a fiat currency like the US dollar. It combines the stability of traditional money with the speed and programmability of blockchain.',
  },
  {
    q: 'Which stablecoin is the safest?',
    a: 'Fiat-backed stablecoins from regulated issuers are generally considered safest. USDC (Circle) publishes monthly reserve attestations and is overseen by US regulators; USDT (Tether) is larger but has faced more scrutiny over its reserves. No stablecoin is risk-free — depegs and issuer risk exist.',
  },
  {
    q: 'Can a stablecoin lose its peg?',
    a: 'Yes. Depegging happens when the market price drifts from the intended value. USDC briefly traded near $0.87 during the 2023 Silicon Valley Bank crisis before recovering; algorithmic stablecoin UST collapsed entirely in 2022.',
  },
  {
    q: 'Why do people use stablecoins instead of bank transfers?',
    a: 'Stablecoin transfers settle in seconds, run 24/7, cost fractions of a cent on networks like Stellar, and can be programmed into apps — making them useful for remittances, payroll, trading, and DeFi.',
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

export default function Stablecoins() {
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
        title="Stablecoins: Digital Dollars on the Blockchain"
        lead="Everything you need to understand stablecoins — what they are, how they hold their peg, how USDC and USDT differ, and why networks like Stellar make them useful for real payments."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
