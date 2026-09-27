import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
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
    background: 'linear-gradient(135deg, #0a3d1f 0%, #0a7d5c 55%, #00c389 100%)',
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
    background: 'linear-gradient(135deg, #0a7d5c, #00c389)',
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
    border: '2px solid #0a7d5c',
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
    borderBottom: '3px solid #0a7d5c',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #e8fff4, #eefbf5)',
    borderLeft: '4px solid #0a7d5c',
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
    boxShadow: '0 2px 8px rgba(10,125,92,0.07)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#0a7d5c',
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
    color: '#0a7d5c',
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
    boxShadow: '0 4px 20px rgba(10,125,92,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #0a7d5c',
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

export default class Defi extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/what-is-defi';
    const title = 'What Is DeFi? A Beginner\'s Guide to Decentralized Finance';
    const profilePic = profilePicImg;

    const blocks = [
      {
        name: 'Decentralized exchanges (DEXs) and AMMs',
        desc: 'Swap assets peer-to-peer without a broker. Most DEXs use automated market makers — liquidity pools that price assets algorithmically instead of an order book. Read our explainer on automated market makers for the math behind them.',
      },
      {
        name: 'Lending and borrowing',
        desc: 'Deposit crypto to earn interest, or borrow against collateral — all enforced by smart contracts instead of loan officers. Loans are typically over-collateralized because there is no credit score or court to fall back on.',
      },
      {
        name: 'Stablecoins',
        desc: 'Tokens pegged to fiat currencies (like USDC) are the settlement layer of DeFi — they let you trade, lend, and pay without exposure to crypto price swings. See our guide to how stablecoins work on Stellar.',
      },
      {
        name: 'Staking and yield',
        desc: 'Lock tokens to help secure a network or provide liquidity and earn rewards in return. "Yield farming" is the practice of moving capital between protocols chasing the highest returns.',
      },
      {
        name: 'Tokenized real-world assets',
        desc: 'Treasuries, money-market funds, real estate, and commodities are being brought on-chain as tokens — our RWA tokenization article covers why institutions are moving trillions in this direction.',
      },
    ];

    const faqs = [
      {
        q: 'Is DeFi safe?',
        a: 'DeFi removes intermediaries, not risk. Smart contract bugs, oracle manipulation, and scams have caused billions in losses. Stick to audited, battle-tested protocols, never invest more than you can afford to lose, and learn the common vulnerability classes before depositing serious funds.',
      },
      {
        q: 'What is the difference between DeFi and CeFi?',
        a: 'CeFi (centralized finance) means companies like exchanges or lending platforms hold your funds and execute trades for you. In DeFi, smart contracts hold the funds and execute the logic — you keep custody of your keys, and the rules are enforced by code anyone can inspect.',
      },
      {
        q: 'Do I need a bank account to use DeFi?',
        a: 'No — that is part of the point. You need a crypto wallet and some tokens, which you can acquire through an on-ramp or exchange. This makes DeFi accessible to anyone with an internet connection, including the unbanked.',
      },
      {
        q: 'Can I do DeFi on Stellar?',
        a: 'Yes. Stellar has a built-in decentralized exchange and protocol-level liquidity pools, and Soroban adds full smart contracts for lending, AMMs, and structured products — all with sub-cent fees and ~5-second finality.',
      },
      {
        q: 'What is TVL?',
        a: 'Total Value Locked — the aggregate value of assets deposited in a DeFi protocol\'s smart contracts. It is the standard metric for comparing protocol size and adoption, though it says nothing about security or sustainability.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'A beginner-friendly guide to decentralized finance: how DeFi works, DEXs and AMMs, lending, stablecoins, yield, risks, and how to start on Stellar.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
      datePublished: '2026-09-27',
      image: 'https://edunode.org/og/what-is-defi.png',
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
            content="What is DeFi? A beginner's guide to decentralized finance — DEXs, AMMs, lending, stablecoins, yield farming, risks, and how DeFi works on Stellar and Soroban."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Lending, trading, and earning without banks — how decentralized finance works, its building blocks, and how to start on Stellar."
          />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:image" content="https://edunode.org/og/what-is-defi.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://edunode.org/og/what-is-defi.png" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Lending, trading, and earning without banks — how DeFi works and how to start on Stellar."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <AccountBalanceIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            Lending, trading, and earning — financial services without banks
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>DeFi · Beginner · Guide</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 27, 2026 &nbsp;·&nbsp; 8 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              <strong>Decentralized finance (DeFi)</strong> is an umbrella term for financial
              services — trading, lending, borrowing, insurance, payments — built on public
              blockchains instead of banks and brokers. Where a traditional exchange matches buyers
              and sellers inside a company's database, a DeFi protocol does it inside a{' '}
              <a href="https://edunode.org/blog/smart-contracts" style={styles.refLink}>
                smart contract
              </a>{' '}
              that anyone can inspect and no single party controls. If you are new to the
              terminology, our <a href="https://edunode.org/glossary" style={styles.refLink}>Web3
              glossary</a> defines every term in this article.
            </p>

            <h4 style={styles.h4}>How DeFi works</h4>
            <p>
              DeFi replaces three things institutions traditionally provide: <strong>custody</strong>
              (your wallet holds funds, not a bank), <strong>execution</strong> (smart contracts run
              the trades and loans), and <strong>settlement</strong> (the blockchain finalizes
              transactions in seconds). Because everything runs on shared public infrastructure,
              protocols are composable — developers can plug lending into exchanges into stablecoin
              rails like LEGO bricks, which is why DeFi iterates so much faster than traditional
              fintech.
            </p>

            <h4 style={styles.h4}>The core building blocks</h4>
            {blocks.map((b, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>{b.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{b.desc}</p>
              </div>
            ))}

            <div style={styles.callout}>
              <strong>DeFi on Stellar:</strong> Stellar was doing DeFi before the term existed — the
              protocol has a built-in decentralized exchange (SDEX) and native liquidity pools at the
              protocol layer.{' '}
              <a href="https://edunode.org/blog/soroban" style={styles.refLink}>Soroban</a>, Stellar's
              smart contract platform, adds fully programmable DeFi: lending markets, custom AMMs,
              and structured products with sub-cent fees. We teach this hands-on in the{' '}
              <a href="https://edunode.org/courses/114" style={styles.refLink}>
                DeFi Protocol Engineering course
              </a>
              .
            </div>

            <h4 style={styles.h4}>The risks — read this before depositing</h4>
            <p>
              DeFi's openness cuts both ways. There is no customer support line, no chargebacks, and
              no deposit insurance. The main risk categories:
            </p>
            <p>
              <strong>Smart contract exploits</strong> — bugs in protocol code get drained; see our{' '}
              <a
                href="https://edunode.org/blog/smart-contract-security-vulnerabilities"
                style={styles.refLink}
              >
                top 10 smart contract vulnerabilities
              </a>
              .
              <br />
              <strong>Impermanent loss</strong> — liquidity providers can end up worse off than
              simply holding when prices move.
              <br />
              <strong>Oracle manipulation</strong> — protocols that trust bad price data get
              liquidated unfairly.
              <br />
              <strong>Scams and rug pulls</strong> — anonymous teams launching tokens, pumping, and
              disappearing. Wallet hygiene matters as much as protocol choice — see our{' '}
              <a href="https://edunode.org/blog/crypto-wallet-security" style={styles.refLink}>
                crypto wallet security guide
              </a>
              .
            </p>

            <div style={styles.warn}>
              <strong>Rule of thumb:</strong> a yield that looks too good to be true usually is.
              Sustainable DeFi yields come from real activity — trading fees, borrowing demand —
              not from printing tokens. If you can't explain where the yield comes from, you're the
              yield.
            </div>

            <h4 style={styles.h4}>Getting started in 4 steps</h4>
            <p>
              <strong>1.</strong> Set up a non-custodial wallet —{' '}
              <a href="https://edunode.org/blog/freighter-wallet" style={styles.refLink}>
                Freighter
              </a>{' '}
              is the standard for Stellar.
              <br />
              <strong>2.</strong> Fund it with a small amount of XLM, and add a{' '}
              <a href="https://edunode.org/blog/what-is-a-stablecoin" style={styles.refLink}>
                stablecoin
              </a>{' '}
              like USDC via a trustline.
              <br />
              <strong>3.</strong> Try a swap or a tiny liquidity-pool deposit on the Stellar DEX to
              see the mechanics first-hand.
              <br />
              <strong>4.</strong> Go deeper with structured learning — our{' '}
              <a href="https://edunode.org/courses" style={styles.refLink}>course catalog</a> covers
              everything from blockchain basics to advanced DeFi protocol engineering, and the{' '}
              <a href="https://edunode.org/codeeditor" style={styles.refLink}>code playground</a>{' '}
              lets you experiment in the browser.
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
              <a href="https://ethereum.org/en/defi/" style={styles.refLink}>
                Decentralized finance (DeFi) — ethereum.org
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://stellar.org/learn/intro-to-stellar" style={styles.refLink}>
                Intro to Stellar — stellar.org
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://developers.stellar.org/docs" style={styles.refLink}>
                Stellar Developer Documentation
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
