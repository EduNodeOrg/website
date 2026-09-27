import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import MemoryIcon from '@material-ui/icons/Memory';
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { Helmet } from 'react-helmet-async';

const styles = {
  page: {
    background: '#f8f9fc',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    background: 'linear-gradient(135deg, #3a2a8f 0%, #6B48FF 55%, #a06bff 100%)',
    padding: '72px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  heroIcon: {
    fontSize: '72px',
    marginBottom: '12px',
    display: 'inline-block',
    filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
  },
  heroText: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    opacity: 0.92,
    maxWidth: '720px',
    margin: '0 auto',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  tag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #6B48FF, #a06bff)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '800',
    lineHeight: '1.25',
    color: '#0d0d2b',
    marginBottom: '12px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    color: '#666',
    fontSize: '14px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #6B48FF',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e4e8f0',
    margin: '32px 0',
  },
  body: {
    fontSize: '1.05rem',
    lineHeight: '1.85',
    color: '#2d2d3a',
  },
  h4: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0d0d2b',
    marginTop: '36px',
    marginBottom: '12px',
    paddingBottom: '6px',
    borderBottom: '3px solid #6B48FF',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #f0ebff, #f6f2ff)',
    borderLeft: '4px solid #6B48FF',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  warn: {
    background: 'linear-gradient(135deg, #fff3e8, #ffece0)',
    borderLeft: '4px solid #e07b00',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  stepCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(107,72,255,0.07)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#6B48FF',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  faqItem: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
  },
  faqQ: {
    fontWeight: '700',
    color: '#0d0d2b',
    marginBottom: '6px',
    fontSize: '1rem',
  },
  refLink: {
    color: '#6B48FF',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  shareSection: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid #e4e8f0',
  },
  shareLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  shareButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  authorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '48px',
    boxShadow: '0 4px 20px rgba(107,72,255,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #6B48FF',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#0d0d2b',
    marginBottom: '4px',
  },
  authorBio: {
    fontSize: '0.9rem',
    color: '#555',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default class AiBlockchain extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/ai-and-blockchain';
    const title = 'AI and Blockchain: How Artificial Intelligence Meets Web3';
    const profilePic = profilePicImg;

    const useCases = [
      {
        name: 'AI agents with wallets',
        desc: 'Autonomous agents need to pay for APIs, compute, and services without a human approving each invoice. Crypto rails — especially low-fee networks like Stellar — let agents hold balances and settle machine-to-machine payments in seconds.',
      },
      {
        name: 'Content authenticity and provenance',
        desc: 'As AI-generated media floods the internet, blockchains provide tamper-proof timestamps and signatures proving who created what and when — the cryptographic backbone of standards like C2PA content credentials.',
      },
      {
        name: 'Decentralized compute and data marketplaces',
        desc: 'AI needs GPU time and training data; both are scarce and expensive. Token-incentivized networks let anyone contribute compute or data and get paid for it, turning idle hardware into a market.',
      },
      {
        name: 'Verifiable AI with zero-knowledge proofs',
        desc: 'ZK proofs can demonstrate that a model produced an output from a specific input without revealing the model or the data — enabling auditable AI for regulated industries. Our ZKP article covers the underlying cryptography.',
      },
      {
        name: 'AI-assisted security and development',
        desc: 'LLMs already write and audit smart contracts. Used well, they catch common vulnerability classes early; used blindly, they introduce them. Knowing the top smart contract vulnerabilities yourself remains essential.',
      },
    ];

    const faqs = [
      {
        q: 'Can AI run on a blockchain?',
        a: 'Not directly — running a large model inside a smart contract is far too expensive. What runs on-chain is verification, payments, and coordination: proofs that a computation happened, payments between agents, and registries of models and data. The heavy inference stays off-chain.',
      },
      {
        q: 'Why would an AI agent need a crypto wallet?',
        a: 'Agents that buy compute, data, or API access need a payment method that works programmatically, 24/7, without a bank account or credit card. Crypto wallets give agents self-custody, programmable spending rules (via smart contracts), and instant settlement.',
      },
      {
        q: 'Is "AI crypto" a real sector or just hype?',
        a: 'Both. Genuine work is happening in agent payments, provenance, and decentralized compute — while many tokens exist purely to ride the AI hype cycle. Evaluate whether a project needs a blockchain at all; if the token could be replaced by a Stripe API key, it probably should be.',
      },
      {
        q: 'What skills do I need to build at the AI + blockchain intersection?',
        a: 'Smart contract development (Soroban/Rust or Solidity), wallet and signing flows, oracle design for feeding AI outputs on-chain, plus standard ML engineering. Our blockchain developer roadmap lays out the sequence.',
      },
      {
        q: 'Does Stellar have a role in AI × blockchain?',
        a: 'Stellar\'s strengths map directly to agent payments: sub-cent fees, ~5-second finality, native USDC for stable value transfer, and Soroban smart contracts for programmable spending limits and escrow between agents.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'Where AI and blockchain actually intersect: agent payments, content provenance, decentralized compute, verifiable AI with ZK proofs, and the skills to build it.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
      datePublished: '2026-09-27',
      mainEntityOfPage: shareUrl,
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

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="description"
            content="AI and blockchain explained: how AI agents use crypto wallets and payments, content provenance, decentralized compute, verifiable AI with zero-knowledge proofs, and what to learn."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Where AI and blockchain actually intersect — agent payments, provenance, verifiable AI, and the skills to build it."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Where AI and blockchain actually intersect — agent payments, provenance, verifiable AI, and the skills to build it."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <MemoryIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            Two of the biggest technology waves of the decade — converging
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>AI · Web3 · Trends</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 27, 2026 &nbsp;·&nbsp; 7 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              AI and blockchain are often lumped together as buzzwords — but under the noise, they
              genuinely solve each other's hardest problems. AI is powerful but untrustworthy:
              outputs are hard to verify, models are black boxes, and agents can't hold a bank
              account. Blockchains are trustworthy but dumb: they execute deterministic logic and
              can't reason. Put them together and you get verifiable, programmable intelligence that
              can own assets and pay for things. If you're new to the underlying tech, start with{' '}
              <a href="https://edunode.org/blog/learn-about-blockchain" style={styles.refLink}>
                learn about blockchain
              </a>{' '}
              and{' '}
              <a href="https://edunode.org/blog/the-web3-revolution" style={styles.refLink}>
                the Web3 revolution
              </a>
              .
            </p>

            <h4 style={styles.h4}>What blockchain gives AI</h4>
            <p>
              Three things AI fundamentally lacks: <strong>payments</strong> (an agent can't open a
              bank account, but it can hold a crypto wallet and pay per API call),{' '}
              <strong>provenance</strong> (cryptographic proof of who created or said what, when),
              and <strong>trustless coordination</strong> (marketplaces for compute and data without
              a central operator). In an internet increasingly filled with synthetic content, being
              able to prove origin becomes critical infrastructure.
            </p>

            <h4 style={styles.h4}>What AI gives blockchain</h4>
            <p>
              Blockchains are rigid — every edge case must be anticipated in code. AI adds adaptive
              intelligence on top: contract auditing, anomaly detection for exploits, natural-language
              interfaces to protocols, and agents that can monitor and respond to on-chain events.
              The pattern that works: AI decides, the blockchain settles and verifies.
            </p>

            <h4 style={styles.h4}>Five real use cases</h4>
            {useCases.map((u, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>{u.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{u.desc}</p>
              </div>
            ))}

            <div style={styles.callout}>
              <strong>Why Stellar fits agent payments:</strong> AI agents need fees low enough for
              micropayments (sub-cent on Stellar), fast finality (~5 seconds), a stable unit of
              account (native{' '}
              <a href="https://edunode.org/blog/what-is-a-stablecoin" style={styles.refLink}>
                USDC
              </a>
              ), and programmable spending rules via{' '}
              <a href="https://edunode.org/blog/soroban" style={styles.refLink}>Soroban</a> smart
              contracts — for example, an agent wallet capped at $10/day with per-merchant limits
              enforced on-chain.
            </div>

            <div style={styles.warn}>
              <strong>Stay skeptical:</strong> "AI + blockchain" is also a favorite label for token
              launches with no substance. Ask what the blockchain is actually for — payments,
              provenance, and coordination are real needs; a token wrapper around an OpenAI API call
              is not a product.
            </div>

            <h4 style={styles.h4}>How to build in this space</h4>
            <p>
              The highest-leverage skills sit at the seam: smart contract development (Soroban/Rust
              on Stellar, or Solidity on Ethereum), wallet and signing flows, oracle design for
              getting AI outputs on-chain safely, and applied ML fundamentals. Our{' '}
              <a href="https://edunode.org/blog/blockchain-developer-roadmap" style={styles.refLink}>
                blockchain developer roadmap
              </a>{' '}
              sequences the learning path, the{' '}
              <a href="https://edunode.org/codeeditor" style={styles.refLink}>code playground</a> is
              a quick way to experiment, and the{' '}
              <a href="https://edunode.org/courses" style={styles.refLink}>course catalog</a> and{' '}
              <a href="https://edunode.org/resources" style={styles.refLink}>resources</a> page take
              you from fundamentals to protocol engineering.
            </p>

            <h4 style={styles.h4}>Frequently asked questions</h4>
            {faqs.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ}>{f.q}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{f.a}</p>
              </div>
            ))}

            <h4 style={styles.h4}>References</h4>
            <p>
              [1]{' '}
              <a href="https://c2pa.org" style={styles.refLink}>
                C2PA — Coalition for Content Provenance and Authenticity
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://soroban.stellar.org/docs" style={styles.refLink}>
                Soroban smart contracts — Stellar Docs
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://ethereum.org/en/ai-agents/" style={styles.refLink}>
                AI agents — ethereum.org
              </a>
            </p>
          </div>

          <div style={styles.shareSection}>
            <div style={styles.shareLabel}>Share this article</div>
            <div style={styles.shareButtons}>
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <FacebookShareCount url={shareUrl}>
                {(count) => (count > 0 ? <span style={{ fontSize: '12px', color: '#888' }}>{count}</span> : null)}
              </FacebookShareCount>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>
          </div>

          <div style={styles.authorCard}>
            <img src={profilePic} style={styles.authorAvatar} alt="Olvis Gil" />
            <div>
              <div style={styles.authorName}>Olvis Gil</div>
              <p style={styles.authorBio}>
                Founder of{' '}
                <a href="https://edunode.org" style={{ color: '#6B48FF' }}>
                  EduNode
                </a>{' '}
                and{' '}
                <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>
                  MozartPay
                </a>
                . Web3 educator, payment technology expert, and ISO standardisation contributor
                based in Vienna, Austria.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
