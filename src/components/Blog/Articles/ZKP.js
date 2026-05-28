import React, { Component } from 'react';
import NavBar from '../../NavBar';
import zkpimg from './zkp_diagram.png';
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
    width: '100%',
    maxHeight: '420px',
    objectFit: 'cover',
    display: 'block',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  tag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #6B48FF, #00C6FF)',
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
    background: 'linear-gradient(135deg, #f0ecff, #e8f7ff)',
    borderLeft: '4px solid #6B48FF',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  useCaseCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(107,72,255,0.06)',
  },
  useCaseTitle: {
    fontWeight: '700',
    color: '#6B48FF',
    marginBottom: '4px',
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
    boxShadow: '0 4px 20px rgba(107,72,255,0.08)',
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

export default class ZKP extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/zero-knowledge-proofs';
    const title = 'Zero-Knowledge Proofs on the Stellar Network: The Future of Privacy';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';

    const useCases = [
      {
        name: 'zkTokens (Confidential Tokens)',
        desc: 'Tokens protected by zero-knowledge proofs that enable private transactions and balances while maintaining public ledger transparency.',
      },
      {
        name: 'zkLogin (Zero-Knowledge Login)',
        desc: 'Enables users to prove ownership of a credential without sending secrets over the wire, replacing traditional passwords.',
      },
      {
        name: 'zkKYC (Selective Disclosure Compliance)',
        desc: 'Users complete verification with a trusted provider and selectively disclose aspects of that verification, balancing compliance with privacy.',
      },
      {
        name: 'zkVoting (Zero-Knowledge Voting)',
        desc: 'Provides transparent and private governance — an individual\'s vote stays private while the overall process remains verifiable.',
      },
      {
        name: 'zkVM (Zero-Knowledge Virtual Machines)',
        desc: 'Moves computation off-chain and verifies a proof on-chain, far more efficient than computing full transaction sets on every node.',
      },
    ];

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="description"
            content="Explore Zero-Knowledge Proofs on Stellar for enhanced privacy, scalability, and interoperability in financial applications."
          />
        </Helmet>

        <NavBar />

        <img src={zkpimg} style={styles.hero} alt="Zero-Knowledge Proofs on Stellar" />

        <div style={styles.wrapper}>
          {/* Tag + Title + Meta */}
          <div style={styles.tag}>Stellar · Privacy · ZKP</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; May 27, 2026 &nbsp;·&nbsp; 5 min read
            </span>
          </div>

          <hr style={styles.divider} />

          {/* Body */}
          <div style={styles.body}>
            <p>
              Imagine living in a world where trust, privacy, and efficiency coexist seamlessly.
              Zero-knowledge proofs (ZK Proofs) make this possible — ensuring that privacy,
              scalability, and interoperability go hand in hand. By leveraging ZK Proofs on the
              Stellar Network, we can increase privacy for unbanked people across the globe,
              enhance scalability for cross-border payment systems, and improve interoperability
              for cash-to-crypto applications.
            </p>

            <h4 style={styles.h4}>What are Zero-Knowledge Proofs?</h4>
            <p>
              ZK Proofs are a breakthrough in cryptographic technology. They allow one party (the{' '}
              <strong>prover</strong>) to prove to another (the <strong>verifier</strong>) that a
              statement is true without revealing any information beyond the validity of the
              statement itself.
            </p>

            <div style={styles.callout}>
              <strong>Example on Stellar:</strong> A verifier can confirm that a prover's wallet
              holds more than X USDC — without ever knowing the exact balance. This technology,
              researched for over four decades, is now becoming a production reality on blockchain
              networks.
            </div>

            <h4 style={styles.h4}>The Three Pillars of ZK Proofs</h4>
            <p>
              <strong>Completeness</strong> — If the statement is true, an honest prover can
              always convince the verifier.
              <br />
              <strong>Soundness</strong> — A cheating prover cannot convince the verifier of a
              false statement.
              <br />
              <strong>Zero-Knowledge</strong> — The verifier learns nothing beyond the truth of
              the statement itself.
            </p>

            <h4 style={styles.h4}>Zero-Knowledge Proofs on Stellar</h4>
            <p>
              Stellar aims to surpass other networks by utilizing the full capabilities of modern
              computing. By placing cryptographic processes into dedicated "slots" within each
              block, the Stellar core protocol can handle larger volumes of transactions without
              slowing down — a significant advantage for validators and operators managing
              high-throughput payment corridors.
            </p>

            <h4 style={styles.h4}>5 Real-World Use Cases</h4>
            {useCases.map((uc, i) => (
              <div key={i} style={styles.useCaseCard}>
                <div style={styles.useCaseTitle}>{i + 1}. {uc.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{uc.desc}</p>
              </div>
            ))}

            <h4 style={styles.h4}>Prototyping Privacy Pools</h4>
            <p>
              The Stellar ecosystem is actively exploring <strong>Privacy Pools</strong> — a
              protocol that incorporates Association Set Providers (ASPs) to define inclusion
              criteria intended to mitigate illicit use. This enables participants to selectively
              associate with sets of other participants who meet their chosen compliance standards,
              achieving privacy guarantees using Groth16 ZK proofs and Circom circuits on Soroban.
            </p>
            <p>
              As Stellar continues to evolve, the integration of ZK Proofs will undoubtedly play
              a crucial role in shaping the future of decentralized finance and blockchain privacy.
            </p>

            <h4 style={styles.h4}>References</h4>
            <p>
              [1]{' '}
              <a href="https://stellar.org/learn/zero-knowledge-proof" style={styles.refLink}>
                Zero-Knowledge Proofs on Stellar — stellar.org
              </a>
            </p>
            <p>
              [2]{' '}
              <a
                href="https://stellar.org/blog/developers/5-real-world-zero-knowledge-use-cases"
                style={styles.refLink}
              >
                5 Real-World Zero-Knowledge Use Cases — stellar.org
              </a>
            </p>
            <p>
              [3]{' '}
              <a
                href="https://stellar.org/blog/ecosystem/prototyping-privacy-pools-on-stellar"
                style={styles.refLink}
              >
                Prototyping Privacy Pools on Stellar — stellar.org
              </a>
            </p>
          </div>

          {/* Share */}
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

          {/* Author Card */}
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
