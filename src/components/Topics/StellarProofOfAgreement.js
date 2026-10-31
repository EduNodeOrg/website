import React from 'react';
import { Helmet } from 'react-helmet-async';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';

const shareUrl = 'https://edunode.org/stellar/proof-of-agreement';
const title = 'Stellar Proof-of-Agreement: How SCP Consensus Works (Not Proof of Stake)';
const description = 'Stellar does not use proof of work or proof of stake — it reaches consensus through Proof-of-Agreement via the Stellar Consensus Protocol. How federated voting and quorum slices actually work.';
const image = 'https://edunode.org/og/stellar-proof-of-agreement.png';
const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a3a2f 55%,#00d4a0 100%)';
const color = '#00d4a0';

const faqs = [{ q: 'Is Stellar proof of stake?', a: 'No — this is the most common misconception. Stellar uses neither proof of work nor proof of stake. It uses Proof-of-Agreement via the Stellar Consensus Protocol (SCP): validators vote on transaction sets through federated agreement, with no tokens at stake and no mining.' }, { q: 'What is Proof-of-Agreement?', a: 'Stellar’s term for how its network reaches consensus: open, decentralized agreement among validators through SCP’s federated voting. Each validator chooses whom it trusts (its quorum slice), and the network finalizes a ledger when enough trusted validators agree.' }, { q: 'How fast is Stellar consensus?', a: 'A new ledger closes roughly every 5 seconds, with finality — once a transaction is in a closed ledger it cannot be reverted, unlike probabilistic PoW chains.' }, { q: 'Can anyone become a Stellar validator?', a: 'Yes — anyone can run stellar-core. But your votes only matter when other validators include you in their quorum slices, which is earned by operating reliably over time.' }];

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

export default function StellarProofOfAgreement() {
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
        heroIcon={<HandshakeIcon style={s.heroIcon} />}
        heroText="Consensus by agreement — not mining, not staking"
        tag="Stellar · Consensus · SCP"
        title={title}
        date="October 31, 2026"
        readTime="8 min read"
        shareUrl={shareUrl}
        shareTitle={title}
        faqs={faqs}
      >
        <p>
          Search for how Stellar reaches consensus and you will find a lot of confusion —
          people assume it must be proof of stake like Ethereum. It is not. Stellar uses
          <strong>Proof-of-Agreement (PoA)</strong>: consensus reached through the Stellar
          Consensus Protocol (SCP), a federated Byzantine agreement system with no mining,
          no staking, and no elected leader. Here is how it actually works, based on the
          <a href="https://stellar.org/learn/proof-of-agreement" target="_blank" rel="noopener noreferrer">SDF's Proof-of-Agreement explainer</a>.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Not PoW, not PoS — federated agreement</h4>
        <p>
          Proof of work burns energy to elect a block producer; proof of stake elects one based
          on locked tokens. SCP does neither. Instead, <strong>every validator votes on what the
          next ledger contains</strong>, and the network finalizes a ledger when a
          <em>quorum</em> — an overlapping web of trusted validators — agrees. There is no
          competition to win the next block; agreement is reached cooperatively roughly every
          5 seconds.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Quorum slices: trust is chosen, not assigned</h4>
        <p>
          Each validator declares a <strong>quorum slice</strong> — the set of other validators
          it trusts. Your node accepts a ledger when your slice reaches agreement, and the
          network reaches consensus when slices overlap enough to form a quorum. This is what
          makes SCP <em>federated</em>: trust emerges bottom-up from individual choices rather
          than top-down from a fixed validator set.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Federated voting in three steps</h4>
        <p>
          SCP's vote-commit-accept flow: validators <em>vote</em> for a transaction set,
          <em>confirm</em> they see their quorum voting the same, and <em>accept</em> it once
          the quorum does — then externalize it into the closed ledger. If slices are poorly
          chosen the worst case is a <em>halt</em> (the network pauses) rather than a fork —
          safety over liveness, the right trade-off for money.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Why this design</h4>
        <p>
          No mining means near-zero energy and no fee market wars; ~5-second ledgers with true
          finality means payments settle fast and stay settled — why Stellar is built for
          payments and remittances. The cost: validators earn no rewards, so the network relies
          on aligned incentives — businesses (anchors, exchanges, wallets) run validators to
          protect their own infrastructure.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Run a validator yourself</h4>
        <p>
          Anyone can run stellar-core — see our
          <a href="/stellar/validator-node-guide">validator node setup guide</a>. Your votes
          count once established operators include you in their quorum slices, so reliable
          uptime is how you earn real influence.
        </p>
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <a href="https://stellar.org/learn/proof-of-agreement" target="_blank" rel="noopener noreferrer">SDF: Proof-of-Agreement</a> ·
          <a href="/glossary/stellar-consensus-protocol-scp">SCP glossary</a> ·
          <a href="/glossary/federated-byzantine-agreement-fba">Federated Byzantine Agreement</a> ·
          <a href="/stellar/validator-node-guide">Run a validator</a> ·
          <a href="/stellar">Stellar hub</a> ·
          <a href="/masterclasses/stellar-network-development">Stellar Network masterclass</a>
        </p>
      </ArticleLayout>
    </>
  );
}
