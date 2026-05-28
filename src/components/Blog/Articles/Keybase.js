import React, { Component } from 'react';
import NavBar from '../NavBar';
import kbt from './keybaseicon.png';
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

export default class Keybase extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/What-is-Keybase';
    const title = 'What is Keybase and how to use it with Stellar?';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={kbt} style={styles.hero} alt="Keybase for Stellar" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Keybase · Identity</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Keybase is a key directory that maps social media identities to encryption keys in a publicly auditable manner. For Stellar users, Keybase provides a way to verify your identity and associate it with your Stellar account — adding a layer of trust and discoverability to your on-chain presence.
            </p>
            <div style={styles.callout}>
              <strong>What is Keybase?</strong> Keybase is a free, open-source security app for mobile and desktop. It combines end-to-end encrypted messaging, file sharing, and cryptographic identity verification — all in one platform.
            </div>
            <h4 style={styles.h4}>Why Keybase Matters for Stellar</h4>
            <p>
              Stellar's federation protocol allows you to use a human-readable address (like <code>olvis*stellar.org</code>) instead of a long public key. Keybase enhances this by allowing you to prove that your Stellar address belongs to you — verified against your GitHub, Twitter, Reddit, and other social accounts.
            </p>
            <h4 style={styles.h4}>Setting Up Keybase with Stellar</h4>
            <p>
              1. Download and install Keybase from <a href="https://keybase.io" style={styles.refLink}>keybase.io</a><br/>
              2. Create a Keybase account and verify your social identities<br/>
              3. In the Keybase app, navigate to the Stellar wallet section<br/>
              4. Link your Stellar public key to your Keybase identity<br/>
              5. Your Keybase username becomes your Stellar federation address
            </p>
            <h4 style={styles.h4}>Sending Stellar Payments via Keybase</h4>
            <p>
              Once set up, you can send XLM and other Stellar assets directly to any Keybase user by their username. This makes sending crypto as easy as sending a message — no need to copy and paste long public keys.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://keybase.io" style={styles.refLink}>Keybase — Official Website</a></p>
            <p>[2] <a href="https://stellar.org/learn/stellar-federation" style={styles.refLink}>Stellar Federation — How it Works</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Web3 identity and cryptography enthusiast based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
