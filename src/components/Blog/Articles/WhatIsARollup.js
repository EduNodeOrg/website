import React from 'react';
import { Helmet } from 'react-helmet-async';
import LayersIcon from '@mui/icons-material/Layers';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/what-is-a-rollup';
const title = 'What Is a Rollup? Optimistic vs ZK Rollups Explained';
const description = 'A rollup is a Layer 2 that executes transactions off Ethereum and posts proofs back to mainnet. How optimistic and zk-rollups differ, what certified means, and why they matter.';
const image = 'https://edunode.org/og/what-is-a-rollup.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#232a6b 55%,#627eea 100%)';
const color = '#627eea';

const faqs = [{ q: 'What is a rollup in simple terms?', a: 'A rollup is a separate blockchain that processes transactions quickly and cheaply, then bundles (rolls up) the results and posts them to Ethereum mainnet. Ethereum keeps the final record and guarantees security; the rollup provides the speed.' }, { q: 'What is the difference between optimistic and zk rollups?', a: 'Optimistic rollups assume transaction batches are valid and give anyone about seven days to submit a fraud proof if they are not. ZK-rollups attach a cryptographic validity proof to every batch, so Ethereum can verify correctness instantly — faster finality, more complex math.' }, { q: 'What does it mean for a rollup to be certified or audited?', a: 'A certified rollup is one whose smart contracts and proving system have passed independent security audits and reached maturity stages tracked by resources like L2BEAT (Stage 0–2). It signals the bridge contracts that hold user funds have been reviewed.' }, { q: 'Which rollups exist today?', a: 'Major optimistic rollups include Arbitrum, Optimism, and Base; zk-rollups include zkSync, StarkNet, Polygon zkEVM, Linea, and Scroll. Each settles to Ethereum mainnet.' }];

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

export default function WhatIsARollup() {
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
        heroIcon={<LayersIcon style={s.heroIcon} />}
        heroText="Faster and cheaper — without giving up Ethereum security"
        tag="Ethereum · Layer 2 · Scaling"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Ethereum mainnet is secure but expensive: every node re-executes every transaction, which
          caps throughput and pushes fees up under load. A <strong>rollup</strong> is the industry's
          answer — a Layer 2 chain that executes transactions in a cheaper environment, compresses
          the results, and settles them to Ethereum so the security guarantee is never abandoned.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>How a rollup works</h4>
        <p>
          Users transact on the rollup (an L2 sequencer orders and executes the transactions), and the
          rollup periodically posts a compressed batch to a bridge contract on Ethereum mainnet. The
          batch contains enough data for anyone to reconstruct the L2 state. What differs between
          designs is <em>how Ethereum learns the batch is correct</em>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Optimistic rollups</h4>
        <p>
          Optimistic rollups — <strong>Arbitrum, Optimism, Base</strong> — publish batches assuming they
          are valid ("optimistically"). Anyone watching can submit a <strong>fraud proof</strong> within
          a challenge window, usually about seven days; a valid fraud proof reverts the bad batch and
          slashes the sequencer's bond. The trade-off is withdrawal latency: moving funds back to L1
          natively means waiting out the challenge period (fast bridges skip the wait for a fee).
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>ZK-rollups</h4>
        <p>
          ZK-rollups — <strong>zkSync, StarkNet, Polygon zkEVM, Linea, Scroll</strong> — attach a
          <strong>validity proof</strong> to every batch. The Ethereum contract verifies the
          zero-knowledge proof directly: if the math checks out, the batch is final immediately.
          No challenge window, fast withdrawals — but generating proofs is computationally heavy and
          making them EVM-compatible took years of engineering.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>What does "certified" mean for a rollup?</h4>
        <p>
          "Rollup certification" has no single formal registry — in practice it means the rollup's
          bridge contracts (which custody user funds) and its proving or fraud-proof system have
          passed <strong>independent security audits</strong>, and the system has reached recognized
          maturity stages. <a href="https://l2beat.com" target="_blank" rel="noopener noreferrer">L2BEAT</a>
          grades rollups from Stage 0 (centralized sequencer, upgradeable contracts, no live
          fraud/validity proofs) to Stage 2 (fully permissionless proofs and no committee override).
          When evaluating an L2, check its L2BEAT stage and published audit reports before bridging.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why rollups matter</h4>
        <p>
          Rollups are Ethereum's scaling roadmap: user-facing apps move to L2s while mainnet becomes
          a settlement and data-availability layer. Fees drop from dollars to cents, throughput rises
          orders of magnitude, and security is inherited rather than rebuilt — the reason most new
          Ethereum apps now launch on a rollup first.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/rollup">Rollup glossary term</a> ·
          <a href="/glossary/layer-2">What is Layer 2?</a> ·
          <a href="/glossary/zero-knowledge-proof-zkp">What is a ZK proof?</a> ·
          <a href="/ethereum">Ethereum hub</a> ·
          <a href="/masterclasses/zero-knowledge-proofs">ZK Proofs masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
