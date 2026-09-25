import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import MapIcon from '@material-ui/icons/Map';
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
    background: 'linear-gradient(135deg, #0d0d2b 0%, #3a2a8f 55%, #6B48FF 100%)',
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
  stepCard: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(107,72,255,0.06)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#6B48FF',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '0.95rem',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(107,72,255,0.06)',
  },
  th: {
    background: '#0d0d2b',
    color: '#fff',
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px 14px',
    borderTop: '1px solid #e4e8f0',
    color: '#2d2d3a',
    verticalAlign: 'top',
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

export default class Roadmap extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/blockchain-developer-roadmap';
    const title = 'How to Become a Blockchain Developer in 2026 (Complete Roadmap)';
    const profilePic = profilePicImg;

    const steps = [
      {
        name: 'Master programming fundamentals',
        desc: 'Learn at least one general-purpose language well — JavaScript/TypeScript or Python are the most common entry points. Get comfortable with data structures (maps, trees, linked lists), algorithms, and how networks and the web work (HTTP, APIs, JSON).',
      },
      {
        name: 'Learn blockchain fundamentals',
        desc: 'Understand what a blockchain actually is: distributed ledgers, consensus mechanisms, blocks and transactions, public/private key cryptography, wallets, and gas or network fees. Try sending a real transaction on a testnet before writing any code.',
      },
      {
        name: 'Pick an ecosystem and a smart contract language',
        desc: 'Choose a chain to specialize in first. Ethereum uses Solidity, Stellar uses Rust on Soroban, and Solana uses Rust. Solidity has the largest job market; Rust-based stacks are growing fast and reward strong engineers.',
      },
      {
        name: 'Write, test, and deploy smart contracts',
        desc: 'Build contracts on a testnet: tokens, escrows, voting, simple DeFi primitives. Learn the tooling — Hardhat/Foundry for Ethereum, the Soroban CLI and SDK for Stellar — and write unit tests for every contract.',
      },
      {
        name: 'Build full-stack dApps',
        desc: 'Connect contracts to real frontends: React, wallet integration (Freighter, MetaMask, WalletConnect), blockchain SDKs, indexers, and decentralized storage like IPFS.',
      },
      {
        name: 'Study smart contract security',
        desc: 'Learn the common vulnerability classes — reentrancy, access-control bugs, oracle manipulation — and defensive patterns like checks-effects-interactions. Security skills are what separate average developers from top candidates.',
      },
      {
        name: 'Build a public portfolio and get certified',
        desc: 'Ship projects on GitHub and mainnet, earn verifiable certificates, join hackathons, and contribute to open-source repos. Employers hire proof of work, not resumes.',
      },
    ];

    const faqs = [
      {
        q: 'How long does it take to become a blockchain developer?',
        a: 'If you already know how to program, expect 3–6 months of focused study to build and deploy your first smart contracts and dApps. Starting from zero programming experience, plan for 9–12 months. The biggest accelerator is building real projects early instead of only consuming tutorials.',
      },
      {
        q: 'Do I need a computer science degree?',
        a: 'No. Blockchain hiring is heavily portfolio-driven. A degree helps with fundamentals, but deployed contracts, open-source contributions, hackathon results, and verifiable certificates matter far more to most employers.',
      },
      {
        q: 'Which language should I learn first?',
        a: 'JavaScript or TypeScript for tooling and dApp frontends, then Solidity (Ethereum) or Rust (Stellar Soroban, Solana) for smart contracts. If you are unsure, start with Solidity — it has the most tutorials, jobs, and tooling.',
      },
      {
        q: 'How much do blockchain developers earn?',
        a: 'Compensation varies widely by region and specialization, but smart contract engineers and auditors consistently rank among the highest-paid software roles, with senior positions frequently exceeding $150k USD in major markets.',
      },
      {
        q: 'Is it too late to start in 2026?',
        a: 'No. The industry is still short on engineers who can ship secure, production-grade contracts. Institutional adoption — tokenized funds, stablecoin payments, on-chain settlement — is expanding demand for builders rather than shrinking it.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'A complete step-by-step roadmap to become a blockchain developer in 2026: programming basics, smart contracts, Solidity vs Rust, dApps, security, and portfolio building.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: {
        '@type': 'Organization',
        name: 'EduNode',
        url: 'https://edunode.org',
      },
      datePublished: '2026-09-25',
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
            content="Step-by-step blockchain developer roadmap for 2026: programming fundamentals, smart contracts, Solidity vs Rust, dApps, security, and how to land your first Web3 job."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Step-by-step blockchain developer roadmap for 2026: programming fundamentals, smart contracts, dApps, security, and your first Web3 job."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Step-by-step blockchain developer roadmap for 2026: smart contracts, dApps, security, and your first Web3 job."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <MapIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            A practical, step-by-step path from zero to a deployed smart contract portfolio
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Web3 · Career · Roadmap</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 25, 2026 &nbsp;·&nbsp; 10 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              A blockchain developer builds software that runs on decentralized networks — from the
              smart contracts that move billions of dollars to the dApps, wallets, and protocols
              people use every day. It is one of the few engineering fields where a single developer
              can ship code that secures real financial value, and demand for people who can do it
              safely keeps outpacing supply. This roadmap lays out the exact sequence to get there
              in 2026.
            </p>

            <h4 style={styles.h4}>What does a blockchain developer actually do?</h4>
            <p>
              The job splits into two broad tracks. <strong>Core developers</strong> work on the
              protocol itself — consensus, networking, virtual machines — usually in Rust, Go, or
              C++. <strong>Application developers</strong> (the far larger market) build on top of
              existing chains: smart contracts, decentralized applications, integrations, and
              tooling. Most people asking "how do I become a blockchain developer" mean the second
              track, and that is what this roadmap covers.
            </p>

            <h4 style={styles.h4}>The 7-step roadmap</h4>
            {steps.map((s, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>
                  Step {i + 1}: {s.name}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{s.desc}</p>
              </div>
            ))}

            <div style={styles.callout}>
              <strong>The shortcut that is not a shortcut:</strong> every step compounds. Developers
              who skip fundamentals and jump straight to copying contract code are the ones whose
              contracts get drained in production. Go in order.
            </div>

            <h4 style={styles.h4}>Solidity vs Rust: which smart contract language?</h4>
            <p>
              Your choice of language largely determines your ecosystem, so it is worth
              understanding the trade-offs before committing.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Language</th>
                  <th style={styles.th}>Ecosystem</th>
                  <th style={styles.th}>Difficulty</th>
                  <th style={styles.th}>Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}><strong>Solidity</strong></td>
                  <td style={styles.td}>Ethereum, L2s, most EVM chains</td>
                  <td style={styles.td}>Beginner-friendly syntax</td>
                  <td style={styles.td}>Largest job market, most tutorials and tooling</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>Rust</strong></td>
                  <td style={styles.td}>Stellar (Soroban), Solana, Near</td>
                  <td style={styles.td}>Steeper curve, memory-safe</td>
                  <td style={styles.td}>High-performance and safer contracts; growing demand</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>JavaScript/TS</strong></td>
                  <td style={styles.td}>All ecosystems</td>
                  <td style={styles.td}>Easy</td>
                  <td style={styles.td}>dApp frontends, SDKs, tests, tooling — required regardless</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>Go / Move</strong></td>
                  <td style={styles.td}>Protocol work, Aptos/Sui</td>
                  <td style={styles.td}>Moderate</td>
                  <td style={styles.td}>Core development and newer chains</td>
                </tr>
              </tbody>
            </table>
            <p>
              If you are torn, a proven path is to learn blockchain basics on{' '}
              <a href="https://edunode.org/courses/101" style={styles.refLink}>Stellar</a> — where
              concepts like assets, trustlines, and anchors are easy to grasp — then move into{' '}
              <a href="https://edunode.org/courses/106" style={styles.refLink}>Soroban (Rust)</a> or{' '}
              <a href="https://edunode.org/courses/113" style={styles.refLink}>Solidity</a> for smart
              contracts.
            </p>

            <h4 style={styles.h4}>How long does it take?</h4>
            <p>
              It depends entirely on where you start:
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Starting point</th>
                  <th style={styles.th}>Realistic timeline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Experienced software developer</td>
                  <td style={styles.td}>2–3 months to first deployed contracts and dApps</td>
                </tr>
                <tr>
                  <td style={styles.td}>Can program, new to blockchain</td>
                  <td style={styles.td}>3–6 months of consistent part-time study</td>
                </tr>
                <tr>
                  <td style={styles.td}>Complete beginner</td>
                  <td style={styles.td}>9–12 months, including programming fundamentals</td>
                </tr>
              </tbody>
            </table>

            <h4 style={styles.h4}>Skills employers actually screen for</h4>
            <p>
              Job posts list long wishlists, but interviews and take-homes tend to test a short list:
              writing a correct contract under time pressure, spotting a planted vulnerability,
              explaining transaction lifecycle and gas, and wiring a wallet to a frontend. Security
              awareness is the biggest differentiator — read our{' '}
              <a href="https://edunode.org/blog/smart-contract-security-vulnerabilities" style={styles.refLink}>
                guide to the most common smart contract vulnerabilities
              </a>{' '}
              before your first interview.
            </p>

            <h4 style={styles.h4}>Projects that get you hired</h4>
            <p>
              Three portfolio projects cover most of what interviewers probe: (1) an ERC-20 or Stellar
              asset with full test coverage, (2) a small DeFi primitive such as an escrow, vesting
              contract, or simple{' '}
              <a href="https://edunode.org/blog/automated-market-maker" style={styles.refLink}>AMM</a>,
              and (3) a full-stack dApp with wallet connection deployed to a public testnet or
              mainnet. Document each with a README explaining design decisions — that write-up is
              often what gets read first.
            </p>

            <h4 style={styles.h4}>Frequently asked questions</h4>
            {faqs.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ}>{f.q}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{f.a}</p>
              </div>
            ))}

            <h4 style={styles.h4}>Start learning</h4>
            <p>
              EduNode's course catalog follows this exact roadmap — from{' '}
              <a href="https://edunode.org/courses/101" style={styles.refLink}>basic concepts</a>{' '}
              through{' '}
              <a href="https://edunode.org/courses/113" style={styles.refLink}>
                advanced smart contract development
              </a>
              ,{' '}
              <a href="https://edunode.org/courses/114" style={styles.refLink}>
                DeFi protocol engineering
              </a>
              , and{' '}
              <a href="https://edunode.org/courses/116" style={styles.refLink}>
                security auditing
              </a>
              — with verifiable certificates you can add to your portfolio.
            </p>

            <h4 style={styles.h4}>References</h4>
            <p>
              [1]{' '}
              <a href="https://ethereum.org/en/developers/" style={styles.refLink}>
                Ethereum Developer Resources — ethereum.org
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://developers.stellar.org" style={styles.refLink}>
                Stellar Developer Documentation
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://soroban.stellar.org" style={styles.refLink}>
                Soroban Smart Contracts — stellar.org
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
