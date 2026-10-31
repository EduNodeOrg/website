import React from 'react';
import { Helmet } from 'react-helmet-async';
import MemoryIcon from '@mui/icons-material/Memory';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-the-evm';
const title = 'What Is the EVM? Ethereum’s Virtual Machine Explained';
const description = 'The EVM is the shared computer every Ethereum node runs — it executes smart contracts identically worldwide. How it works, what EVM-compatible means, and why that compatibility matters.';
const image = 'https://edunode.org/og/what-is-the-evm.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#232a6b 55%,#627eea 100%)';
const color = '#627eea';

const faqs = [{ q: 'What is the EVM in simple terms?', a: 'The Ethereum Virtual Machine is the computer every Ethereum node runs — it executes smart contracts the same way on every machine in the world, producing one agreed result. Think of it as a global shared computer no one controls.' }, { q: 'What does EVM-compatible mean?', a: 'A blockchain is EVM-compatible if it runs the same bytecode and contracts as Ethereum — tools like MetaMask, Solidity, and Hardhat work unchanged. Chains like Polygon, BNB Chain, Avalanche C-Chain, Arbitrum, and Base are EVM-compatible.' }, { q: 'Why is EVM compatibility such a big deal?', a: 'It means developers write code once and deploy anywhere in the EVM ecosystem — the largest pool of tools, audits, libraries, and developer knowledge in Web3. It also means users keep one wallet and one address across dozens of chains.' }, { q: 'What are alternatives to the EVM?', a: 'Stellar runs Soroban — a Rust/WASM VM that is not EVM-compatible; Solana has its own runtime (SVM); Move-based chains (Aptos, Sui) use different languages entirely. Each trades ecosystem compatibility for performance or different design choices.' }];

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

export default function WhatIsTheEVM() {
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
        heroIcon={<MemoryIcon style={s.heroIcon} />}
        heroText="One computer, thousands of nodes — the engine behind Ethereum"
        tag="Ethereum · EVM · Smart Contracts"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Ask what makes Ethereum "programmable" and the answer is the <strong>EVM</strong> — the
          Ethereum Virtual Machine. It's the computer every one of the thousands of Ethereum
          nodes runs, executing smart contracts identically everywhere so the whole network
          agrees on one result. Understanding the EVM is understanding how Ethereum actually works.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>A world computer</h4>
        <p>
          Your smart contract doesn't run on a server — it compiles to <strong>EVM bytecode</strong>
          that every node executes when the transaction is included in a block. Every node
          performs the same computation and must reach the same result, which is what lets the
          network trust the output without trusting any single machine. It's slow and expensive
          by design — the redundancy is the point.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Gas: paying for computation</h4>
        <p>
          Every EVM operation costs <a href="/glossary/gas">gas</a> — priced in ETH — which serves
          two purposes: it pays validators for executing your code, and it stops infinite loops
          (run out of gas and execution halts). That makes the EVM a quasi-Turing-complete
          machine: powerful enough for arbitrary programs, metered enough that it can't be
          abused.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The EVM ecosystem effect</h4>
        <p>
          The EVM's network effect is massive: <strong>EVM-compatible chains</strong> — Polygon,
          BNB Chain, Avalanche, Arbitrum, Base — run the same bytecode, so Solidity contracts,
          MetaMask, Hardhat, and every developer tool work unchanged across dozens of networks.
          That's why "EVM compatibility" became the default strategy for new chains: instant
          access to Ethereum's tooling and developer pool.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Not everyone chose the EVM</h4>
        <p>
          Stellar built Soroban on Rust→WASM instead — different design, not EVM-compatible, but
          with deterministic metering and a security-focused model for payments-focused contracts.
          Solana has its own runtime; Move chains use a resource-oriented language. The trade-off
          is real: compatibility buys ecosystem; new VMs buy design freedom. Both bets have
          produced working systems — learn the EVM first since it dominates, then explore the
          alternatives with eyes open.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/evm-ethereum-virtual-machine">EVM glossary term</a> ·
          <a href="/ethereum">Ethereum hub</a> ·
          <a href="/glossary/gas">What is gas?</a> ·
          <a href="/masterclasses/ethereum-development">Ethereum Development masterclass</a> ·
          <a href="/stellar">Stellar hub</a>
        </p>
      </ArticleLayout>
    </>
  );
}
