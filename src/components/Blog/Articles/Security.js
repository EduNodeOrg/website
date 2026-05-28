import React, { Component } from 'react';
import NavBar from '../NavBar';
import security from '../cyber-security.png';
import lobstr from '../lobstr.png';
import stellarguard from '../stellarguard.png';
import freighter from '../freighter.PNG';
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
  page: { background: '#f8f9fc', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  hero: { width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' },
  wrapper: { maxWidth: '780px', margin: '0 auto', padding: '40px 24px 80px' },
  tag: { display: 'inline-block', background: 'linear-gradient(135deg, #6B48FF, #00C6FF)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', marginBottom: '16px' },
  title: { fontSize: '2.4rem', fontWeight: '800', lineHeight: '1.25', color: '#0d0d2b', marginBottom: '12px' },
  meta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', color: '#666', fontSize: '14px' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6B48FF' },
  divider: { border: 'none', borderTop: '1px solid #e4e8f0', margin: '32px 0' },
  body: { fontSize: '1.05rem', lineHeight: '1.85', color: '#2d2d3a' },
  h4: { fontSize: '1.3rem', fontWeight: '700', color: '#0d0d2b', marginTop: '36px', marginBottom: '12px', paddingBottom: '6px', borderBottom: '3px solid #6B48FF', display: 'inline-block' },
  callout: { background: 'linear-gradient(135deg, #f0ecff, #e8f7ff)', borderLeft: '4px solid #6B48FF', borderRadius: '8px', padding: '16px 20px', margin: '24px 0', fontSize: '1rem', color: '#2d2d3a', lineHeight: '1.7' },
  inlineImg: { width: '100%', borderRadius: '12px', margin: '20px 0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  codeImg: { width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e4e8f0' },
  shareSection: { marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e4e8f0' },
  shareLabel: { fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  shareButtons: { display: 'flex', gap: '10px', alignItems: 'center' },
  authorCard: { display: 'flex', alignItems: 'center', gap: '20px', background: '#fff', border: '1px solid #e4e8f0', borderRadius: '16px', padding: '24px', marginTop: '48px', boxShadow: '0 4px 20px rgba(107,72,255,0.08)' },
  authorAvatar: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6B48FF', flexShrink: 0 },
  authorName: { fontWeight: '700', fontSize: '1.1rem', color: '#0d0d2b', marginBottom: '4px' },
  authorBio: { fontSize: '0.9rem', color: '#555', lineHeight: '1.5', margin: 0 },
  refLink: { color: '#6B48FF', textDecoration: 'none', wordBreak: 'break-all' },
};

export default class Security extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/security-tools';
    const title = 'How to keep your lumens safe | Tips and security tools';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={security} style={styles.hero} alt="Stellar Security Tools" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Security · Wallets</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Security is the foundation of trust in any financial system — and blockchain is no different. In this guide, we cover the best practices and tools to keep your Stellar lumens (XLM) and other assets safe.
            </p>
            <div style={styles.callout}>
              <strong>Golden rule:</strong> Not your keys, not your coins. The most important security principle in crypto is to control your own private keys. Never share them with anyone, and never store them online.
            </div>
            <h4 style={styles.h4}>Choose the Right Wallet</h4>
            <p>
              Your wallet is your gateway to the Stellar network. There are several excellent options, each with different security trade-offs:
            </p>
            <img src={freighter} style={styles.inlineImg} alt="Freighter wallet" />
            <p>
              <strong>Freighter</strong> is a browser extension wallet developed by the Stellar Development Foundation. It is open-source, non-custodial, and integrates seamlessly with Soroban dApps.
            </p>
            <img src={lobstr} style={styles.inlineImg} alt="LOBSTR wallet" />
            <p>
              <strong>LOBSTR</strong> is a mobile-first Stellar wallet known for its clean interface and built-in exchange. It supports multi-signature accounts and is available on iOS and Android.
            </p>
            <h4 style={styles.h4}>Enable Multi-Signature</h4>
            <p>
              Multi-signature (multisig) requires multiple private keys to authorize a transaction. This is one of the most effective ways to protect large holdings. Stellar's native multisig support allows you to require 2-of-3 or any combination of signers.
            </p>
            <img src={stellarguard} style={styles.inlineImg} alt="StellarGuard" />
            <h4 style={styles.h4}>Best Practices</h4>
            <p>
              • Never share your secret key or seed phrase with anyone<br/>
              • Use a hardware wallet for large holdings<br/>
              • Enable two-factor authentication on all exchange accounts<br/>
              • Verify URLs carefully before connecting your wallet<br/>
              • Keep your software and wallet apps up to date<br/>
              • Use a dedicated device for crypto transactions
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://www.freighter.app" style={styles.refLink}>Freighter — Stellar Browser Wallet</a></p>
            <p>[2] <a href="https://lobstr.co" style={styles.refLink}>LOBSTR — Stellar Mobile Wallet</a></p>
            <p>[3] <a href="https://developers.stellar.org/docs/encyclopedia/signatures-multisig" style={styles.refLink}>Multisig on Stellar — Developer Docs</a></p>
          </div>
          <div style={styles.shareSection}>
            <div style={styles.shareLabel}>Share this article</div>
            <div style={styles.shareButtons}>
              <FacebookShareButton url={shareUrl} quote={title}><FacebookIcon size={36} round /></FacebookShareButton>
              <FacebookShareCount url={shareUrl}>{(count) => (count > 0 ? <span style={{ fontSize: '12px', color: '#888' }}>{count}</span> : null)}</FacebookShareCount>
              <TwitterShareButton url={shareUrl} title={title}><TwitterIcon size={36} round /></TwitterShareButton>
              <LinkedinShareButton url={shareUrl}><LinkedinIcon size={36} round /></LinkedinShareButton>
            </div>
          </div>
          <div style={styles.authorCard}>
            <img src={profilePic} style={styles.authorAvatar} alt="Olvis Gil" />
            <div>
              <div style={styles.authorName}>Olvis Gil</div>
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Cybersecurity advocate and payment technology expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
