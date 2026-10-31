import React from 'react';
import { Helmet } from 'react-helmet-async';
import LockIcon from '@mui/icons-material/Lock';
import ArticleLayout, { articleStyles as s } from './ArticleLayout';

const shareUrl = 'https://edunode.org/blog/zero-knowledge-proofs-explained';
const title = 'Zero-Knowledge Proofs, Explained Simply';
const description = 'A ZK proof lets you prove something is true without revealing the underlying data. How it works with intuitive examples, what zk-SNARKs and zk-STARKs are, and where ZK is actually used.';
const image = 'https://edunode.org/og/zero-knowledge-proofs-explained.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#2d1b4d 55%,#9c27b0 100%)';
const color = '#9c27b0';

const faqs = [{ q: 'What is a zero-knowledge proof in simple terms?', a: 'A zero-knowledge proof lets you prove a statement is true without revealing the information behind it. Classic example: prove you know a password without typing it, or prove a transaction is valid without revealing the amounts.' }, { q: 'What are zk-SNARKs and zk-STARKs?', a: 'Two families of ZK constructions. zk-SNARKs produce tiny proofs that verify instantly but need a trusted setup; zk-STARKs need no trusted setup and resist quantum attacks but produce larger proofs. Both are used in production — Zcash uses SNARKs, StarkNet uses STARKs.' }, { q: 'Where are ZK proofs used today?', a: 'Privacy coins (Zcash), zk-rollups that scale Ethereum (zkSync, StarkNet, Polygon zkEVM), private identity proofs (prove age without revealing birthdate), and increasingly for verifiable computation — proving a program ran correctly without rerunning it.' }, { q: 'Is ZK the same as encryption?', a: 'No — encryption hides data so only key-holders can read it. ZK proves properties about data without revealing it at all. They solve different problems and are often combined.' }];

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

export default function ZeroKnowledgeProofsExplained() {
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
        heroIcon={<LockIcon style={s.heroIcon} />}
        heroText="Prove it — without showing your work"
        tag="Cryptography · ZK · Privacy"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          A <strong>zero-knowledge proof (ZKP)</strong> lets you prove something is true without
          revealing <em>why</em> it's true — the information itself stays hidden. It sounds like
          magic; it's real mathematics, and it's becoming one of the most important technologies
          in crypto. Here's the intuition without the math degree.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>The cave analogy</h4>
        <p>
          Classic intuition: there's a cave with a locked door inside a circular path — you claim
          you know the password. To prove it without revealing it, a verifier waits outside, you
          enter by one side, then the verifier calls which exit to take. If you know the password
          you can always take whichever exit is called; a cheat guessing would fail half the
          time. Repeat enough rounds and the verifier is convinced — while learning zero
          information about the password itself.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>From toy examples to real proofs</h4>
        <p>
          Real ZK proofs work on computation: <em>prove this program ran correctly on this
          private input</em>. That lets you prove "I have more than $10,000" without revealing
          your balance, "I'm over 18" without revealing your birthdate, or "these 10,000
          transactions are all valid" without revealing each one. The verifier checks a small
          mathematical proof instead of the data.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>SNARKs vs STARKs</h4>
        <p>
          Two main families in production: <strong>zk-SNARKs</strong> — tiny proofs, instant
          verification, but require a "trusted setup" ceremony to generate parameters (Zcash
          pioneered this); <strong>zk-STARKs</strong> — no trusted setup, quantum-resistant, but
          larger proofs (StarkNet uses them). Newer systems like Halo2 and Plonk blur the lines.
          The engineering trade-off is proof size and setup trust, not capability.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Where ZK is used right now</h4>
        <p>
          <strong>Privacy:</strong> Zcash proves transactions are valid while amounts and parties
          stay encrypted. <strong>Scaling:</strong> zk-rollups compress thousands of L2
          transactions into one validity proof Ethereum verifies — the whole L2 inherits mainnet
          security. <strong>Identity:</strong> prove credentials without revealing them.
          <strong>Verifiable compute:</strong> prove a program ran correctly off-chain — the
          foundation of projects like RISC Zero and zkVMs. Our
          <a href="/masterclasses/zero-knowledge-proofs">ZK masterclass</a> teaches the concepts
          hands-on.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="/glossary/zero-knowledge-proof-zkp">ZK proof glossary</a> ·
          <a href="/blog/zero-knowledge-proofs">ZK proofs on Stellar</a> ·
          <a href="/blog/what-is-a-rollup">What is a rollup?</a> ·
          <a href="/masterclasses/zero-knowledge-proofs">ZK Proofs masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
