import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
    background: 'linear-gradient(135deg, #4a0c0c 0%, #7a0c0c 55%, #e63946 100%)',
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
    background: 'linear-gradient(135deg, #7a0c0c, #e63946)',
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
    border: '2px solid #7a0c0c',
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
    borderBottom: '3px solid #7a0c0c',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #ffeef0, #fff5f6)',
    borderLeft: '4px solid #e63946',
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
    boxShadow: '0 2px 8px rgba(122,12,12,0.07)',
  },
  stepTitle: {
    fontWeight: '700',
    color: '#7a0c0c',
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
    color: '#7a0c0c',
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
    boxShadow: '0 4px 20px rgba(122,12,12,0.1)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #7a0c0c',
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

export default class WalletSecurity extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/crypto-wallet-security';
    const title = 'Crypto Wallet Security: Seed Phrases, Passkeys, and How Not to Lose Your Funds';
    const profilePic = profilePicImg;

    const attacks = [
      {
        name: 'Phishing sites and fake extensions',
        desc: 'Lookalike domains and malicious browser extensions impersonate real wallets to harvest recovery phrases. Always verify the URL character-by-character and install only from official sources — see our Freighter setup guide for the safe install path.',
      },
      {
        name: 'Seed phrase theft',
        desc: '"Support agents," fake airdrops, and "wallet verification" forms that ask for your 12 or 24 words are always scams. No legitimate service ever needs your phrase — it is only ever typed into your own wallet during recovery.',
      },
      {
        name: 'Address poisoning',
        desc: 'Attackers send a dust transaction from an address that looks like one you use, hoping you copy their address from your history. Always confirm the first and last characters of the recipient address — or better, use saved contacts.',
      },
      {
        name: 'SIM swapping',
        desc: 'Attackers port your phone number to intercept SMS 2FA and email resets, then drain exchange accounts. Use authenticator apps or hardware keys instead of SMS, and ask your carrier for a port-out PIN.',
      },
      {
        name: 'Malicious signature requests',
        desc: 'A compromised dApp can ask you to sign a transaction that empties your account — and one click is all it takes. Read every signing request; on Stellar, check which operations and trustlines it contains before approving.',
      },
    ];

    const checklist = [
      {
        name: 'Back up your recovery phrase on paper (or steel)',
        desc: 'Write it down, store it offline in two separate secure locations. Never in photos, notes apps, email, or cloud storage — anything connected to the internet can be breached.',
      },
      {
        name: 'Split hot and cold funds',
        desc: 'Keep daily-use amounts in a hot wallet like Freighter, and long-term savings in a hardware wallet or multisig setup. A hot wallet is a pocket wallet, not a vault.',
      },
      {
        name: 'Prefer passkeys where supported',
        desc: 'Passkeys (WebAuthn) replace passwords and seed-phrase UX with device-bound biometrics — phishing-resistant by design. Smart wallets on Soroban can use passkeys as signers, removing the seed phrase single point of failure.',
      },
      {
        name: 'Use multi-signature for serious funds',
        desc: 'Stellar has native multi-sig: require 2-of-3 keys to move funds, so one compromised key or device cannot drain the account. See our glossary entry on multi-signature for how it works.',
      },
      {
        name: 'Verify before you sign, every time',
        desc: 'Check the URL, read the transaction details in the signing window, and reject anything you did not initiate. When in doubt, cancel — a rejected transaction costs nothing.',
      },
    ];

    const faqs = [
      {
        q: 'What is a seed phrase and why does it matter so much?',
        a: 'A seed (recovery) phrase is a human-readable encoding of your wallet\'s private keys — typically 12 or 24 words. Anyone who has it controls your funds, and if you lose it there is no recovery. It is simultaneously your backup and your biggest attack surface.',
      },
      {
        q: 'Are passkeys safer than seed phrases?',
        a: 'Passkeys remove the "type your secrets into a website" attack entirely — the credential never leaves your device and is bound to the real domain, so phishing sites cannot capture it. They are a major UX and security upgrade, though you should still keep a recovery method configured.',
      },
      {
        q: 'Custodial vs non-custodial wallet — which is safer?',
        a: 'Custodial wallets (exchanges) hold your keys — convenient, but you are trusting their security and solvency. Non-custodial wallets give you full control and full responsibility. Many people use both: an exchange for trading, a self-custody wallet for holding.',
      },
      {
        q: 'What should I do if I think my wallet is compromised?',
        a: 'Act fast: create a fresh wallet on a clean device, transfer all assets immediately, and revoke trustlines/authorizations on the old account. Assume the seed phrase is burned forever and never reuse it.',
      },
      {
        q: 'How does wallet security work on Stellar specifically?',
        a: 'Stellar accounts support native multi-signature and weighted signers, so you can build 2-of-3 setups without smart contracts. Watch what you sign with wallets like Freighter, and be cautious with trustlines — only add assets from issuers you recognize.',
      },
    ];

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description:
        'How to secure a crypto wallet: seed phrase best practices, passkeys, hardware wallets, multi-signature, and the phishing attacks that drain accounts.',
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
            content="Crypto wallet security explained: seed phrase best practices, passkeys, hardware wallets, multi-signature on Stellar, and the phishing attacks that drain accounts."
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Your keys, your coins — seed phrases, passkeys, multi-sig, and the attacks to watch for."
          />
          <meta property="og:url" content={shareUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content="Your keys, your coins — seed phrases, passkeys, multi-sig, and the attacks to watch for."
          />
          <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>

        <NavBar />

        <div style={styles.hero}>
          <VpnKeyIcon style={styles.heroIcon} />
          <div style={styles.heroText}>
            Your keys, your coins — protect both like they matter, because they do
          </div>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.tag}>Security · Wallet · Guide</div>
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
              In crypto, a wallet isn't an app — it's a set of keys, and whoever holds the keys holds
              the money. There is no "forgot password" flow and no fraud department to reverse a bad
              transaction. That makes wallet security the single most important skill for anyone in
              Web3. If you're just getting set up, start with our{' '}
              <a href="https://edunode.org/blog/freighter-wallet" style={styles.refLink}>
                Freighter wallet guide
              </a>{' '}
              for Stellar, then come back here for the security fundamentals. (También disponible en
              español:{' '}
              <a
                href="https://edunode.org/blog/herramientas-de-seguridad"
                style={styles.refLink}
              >
                herramientas de seguridad
              </a>
              .)
            </p>

            <h4 style={styles.h4}>Custodial vs non-custodial</h4>
            <p>
              A <strong>custodial</strong> wallet — typically an exchange account — means a company
              holds your keys for you. You get password resets and customer support, but you're
              trusting their security and solvency. A <strong>non-custodial</strong> wallet puts the
              keys on your device: full control, full responsibility. The crypto maxim "not your
              keys, not your coins" exists because exchange failures have wiped out billions in user
              funds. Both models are defined in our{' '}
              <a href="https://edunode.org/glossary" style={styles.refLink}>glossary</a>.
            </p>

            <h4 style={styles.h4}>The attacks that actually drain wallets</h4>
            {attacks.map((a, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>{a.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{a.desc}</p>
              </div>
            ))}

            <div style={styles.warn}>
              <strong>Golden rule:</strong> your recovery phrase is only ever typed into your own
              wallet during a restore. Anyone who asks for it — "support," "admins," "verification"
              forms, EduNode, exchanges — is stealing from you. No exceptions. More on this in{' '}
              <a href="https://edunode.org/blog/security-tools" style={styles.refLink}>
                how to keep your lumens safe
              </a>
              .
            </div>

            <h4 style={styles.h4}>Your security checklist</h4>
            {checklist.map((c, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepTitle}>{c.name}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{c.desc}</p>
              </div>
            ))}

            <h4 style={styles.h4}>Passkeys: the end of seed-phrase anxiety?</h4>
            <p>
              Passkeys use the secure hardware already in your phone or laptop to sign with
              biometrics — the credential is bound to the real domain, so a phishing site literally
              cannot ask for it. Combined with smart-contract wallets (account abstraction) on{' '}
              <a href="https://edunode.org/blog/soroban" style={styles.refLink}>Soroban</a>, passkeys
              enable wallets with social recovery, spending limits, and no seed phrase at all. For
              developers, this is one of the most important shifts in wallet UX — covered in our{' '}
              <a href="https://edunode.org/courses/113" style={styles.refLink}>
                Advanced Smart Contract Development
              </a>{' '}
              and{' '}
              <a href="https://edunode.org/courses/116" style={styles.refLink}>
                Blockchain Security Auditing
              </a>{' '}
              courses.
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
                Freighter — official Stellar wallet
              </a>
            </p>
            <p>
              [2]{' '}
              <a href="https://passkeys.dev" style={styles.refLink}>
                passkeys.dev — passkey documentation and guidance
              </a>
            </p>
            <p>
              [3]{' '}
              <a href="https://fidoalliance.org/passkeys/" style={styles.refLink}>
                FIDO Alliance — What are passkeys?
              </a>
            </p>
            <p>
              [4]{' '}
              <a href="https://developers.stellar.org/docs/learn/fundamentals/accounts" style={styles.refLink}>
                Stellar accounts and signatures — Stellar Docs
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
