import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
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
    background: 'linear-gradient(135deg, #001233 0%, #0466c8 55%, #48cae4 100%)',
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
    background: 'linear-gradient(135deg, #0466c8, #48cae4)',
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
    border: '2px solid #0466c8',
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
    borderBottom: '3px solid #0466c8',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #e8f4ff, #eefbff)',
    borderLeft: '4px solid #0466c8',
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
    boxShadow: '0 2px 8px rgba(4,102,200,0.07)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#0466c8',
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
    color: '#0466c8',
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
    boxShadow: '0 4px 20px rgba(4,102,200,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #0466c8',
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

export default class Freighter extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/freighter-wallet';
    const title = 'Freighter Wallet: How to Set Up and Use Stellar\'s Most Popular Wallet';
    const profilePic = profilePicImg;

    const steps = [
      {
        name: 'Install the extension',
        desc: 'Freighter is a browser extension available for Chrome, Firefox, Edge, and Brave. Install it only from freighter.app or the official browser extension stores — never from links sent to you in DMs or search ads.',
      },
      {
        name: 'Create a new wallet',
        desc: 'Open the extension and choose "Create Wallet". You will set a password that encrypts Freighter locally — this protects the extension on your device but is not your recovery method.',
      },
      {
        name: 'Back up your recovery phrase',
        desc: 'Freighter shows you a 24-word mnemonic phrase. Write it down on paper and store it somewhere safe and offline. Anyone with this phrase controls your funds; no one legitimate will ever ask for it.',
      },
      {
        name: 'Fund your account',
        desc: 'Your public address (starting with "G") is your receive address. A Stellar account needs a minimum balance of 1 XLM to be activated — buy XLM on an exchange or via an on-ramp and send it to your address.',
      },
      {
        name: 'Add assets with trustlines',
        desc: 'Stellar requires an explicit opt-in (a "trustline") before your account can hold non-native assets. In Freighter, go to Manage Assets, find the asset (e.g., USDC issued by Circle), and approve the trustline — it costs 0.5 XLM of reserved balance per trustline.',
      },
      {
        name: 'Send, swap, and connect',
        desc: 'Send payments to any Stellar address, swap assets through the built-in swap feature (powered by the Stellar DEX), and connect to Soroban dApps — Freighter pops up a signing window whenever an app requests a transaction.',
      },
    ];

    const faqs = [
      {
        q: 'Is Freighter wallet safe?',
        a: 'Freighter is a non-custodial wallet developed by the Stellar Development Foundation — your keys are generated and stored on your device, never sent to a server. Safety ultimately depends on how you protect your recovery phrase and which sites you sign transactions for.',
      },
      {
        q: 'Is Freighter free to use?',
        a: 'Yes, the wallet is free. You only pay the Stellar network itself: the 1 XLM minimum account balance, 0.5 XLM reserves per trustline, and transaction fees around 0.00001 XLM.',
      },
      {
        q: 'What if I lose my recovery phrase?',
        a: 'Without the recovery phrase there is no way to restore the wallet — non-custodial means no company can reset it for you. Store the phrase offline in at least two secure locations and never digitally (no photos, cloud notes, or email).',
      },
      {
        q: 'Does Freighter work on mobile?',
        a: 'Freighter started as a browser extension; for mobile Stellar wallets, apps like Lobstr are popular. For dApp connections, the extension remains the standard — Soroban apps use the Freighter API to request signatures.',
      },
      {
        q: 'Freighter vs Lobstr vs xBull — which Stellar wallet?',
        a: 'Freighter is the default choice for desktop and dApp development. Lobstr is popular on mobile. xBull offers advanced features like multi-signature support. Many users run Freighter for dApps and a mobile wallet for daily payments.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'How to set up and use the Freighter wallet for Stellar: installation, recovery phrase backup, trustlines, sending USDC and XLM, and connecting to Soroban dApps.',
      author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org' },
      publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
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
            content="Complete Freighter wallet guide: install the Stellar browser extension, back up your recovery phrase, add USDC trustlines, send payments, and connect to Soroban dApps."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Set up Freighter — Stellar's most popular wallet — and learn trustlines, sending payments, and connecting to Soroban dApps."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Set up Freighter — Stellar's most popular wallet — trustlines, payments, and Soroban dApps."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <AccountBalanceWalletIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            Your gateway to the Stellar network — keys, assets, and dApps in one extension
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Wallet · Tutorial</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span>
              <strong>Olvis Gil</strong> &nbsp;·&nbsp; September 25, 2026 &nbsp;·&nbsp; 7 min read
            </span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.body}>
            <p>
              Freighter is a non-custodial browser extension wallet for the Stellar network, developed
              by the Stellar Development Foundation. "Non-custodial" means your private keys are
              generated and encrypted on your own device — no company holds them, and no one can
              recover your account for you. It is the wallet nearly every Stellar dApp integrates
              with, and the one you will use throughout EduNode's{' '}
              <a href="https://edunode.org/courses" style={styles.refLink}>courses</a>.
            </p>

            <h4 style={styles.h4}>Setting up Freighter in 6 steps</h4>
            {steps.map((s, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>
                  Step {i + 1}: {s.name}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{s.desc}</p>
              </div>
            ))}

            <div style={styles.warn}>
              <strong>Golden rule:</strong> your recovery phrase is your wallet. Freighter support,
              EduNode, exchanges, and "admins" will never ask for it. Anyone who does is trying to
              steal your funds — no exceptions.
            </div>

            <h4 style={styles.h4}>Understanding trustlines</h4>
            <p>
              Stellar works differently from account-based chains: before your wallet can hold an
              asset like USDC, your account must explicitly opt in via a trustline. This is a feature,
              not friction — it prevents strangers from spamming unwanted tokens into your account and
              lets issuers enforce compliance on who can hold their assets. Each trustline locks 0.5
              XLM as a reserve, which you get back if you remove it.
            </p>

            <h4 style={styles.h4}>Using Freighter with dApps</h4>
            <p>
              Freighter is how you interact with{' '}
              <a href="https://edunode.org/blog/soroban" style={styles.refLink}>Soroban</a> smart
              contracts: when a dApp needs a signature, Freighter opens a confirmation window showing
              exactly what you are about to sign — read it every time. For signing flows without a
              browser extension,{' '}
              <a href="https://edunode.org/blog/albedo" style={styles.refLink}>Albedo</a> is a
              popular alternative. Developers integrate Freighter through its JavaScript API
              (freighter-api), which handles address lookup and transaction signing.
            </p>

            <h4 style={styles.h4}>Security checklist</h4>
            <p>
              <strong>Verify the source</strong> — install only from freighter.app or official browser
              stores.
              <br />
              <strong>Paper backup</strong> — write the 24-word phrase on paper, stored offline, in
              two locations.
              <br />
              <strong>Read every signature request</strong> — a malicious site can only take what you
              sign.
              <br />
              <strong>Separate hot and cold funds</strong> — keep savings on a hardware wallet, and
              only spending amounts in Freighter. More tips in{' '}
              <a href="https://edunode.org/blog/security-tools" style={styles.refLink}>
                how to keep your lumens safe
              </a>
              .
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
              <a href="https://www.freighter.app" style={styles.refLink}>
                Freighter — official site
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://developers.stellar.org/docs/build/apps/freighter-wallet" style={styles.refLink}>
                Freighter for developers — Stellar Docs
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://github.com/stellar/freighter" style={styles.refLink}>
                Freighter source code — GitHub
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
