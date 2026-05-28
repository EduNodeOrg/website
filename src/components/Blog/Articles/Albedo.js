import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import albedo from './albedo.png';
import albedo1 from './albedo1.png';
import albedo2 from './albedo2.png';
import albedo3 from './albedo3.png';
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

export default class Albedo extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/albedo-identity';
    const title = 'Identity verification with Albedo';
    const profilePic = profilePicImg;
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={albedo} style={styles.hero} alt="Albedo Identity Verification" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Identity · Albedo</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Identity verification is a critical component of any financial application. Albedo is a permission manager and transaction signer for the Stellar network that allows users to grant applications access to their Stellar account without ever sharing their private key.
            </p>
            <div style={styles.callout}>
              <strong>What is Albedo?</strong> Albedo is a web-based keystore and signer for Stellar. It acts as a secure intermediary between your Stellar account and web applications — similar to how MetaMask works for Ethereum.
            </div>
            <h4 style={styles.h4}>How Albedo Works</h4>
            <p>
              When a web application requests access to your Stellar account, Albedo opens a secure popup window. You review the requested permissions and either approve or reject them. Your private key never leaves the Albedo interface — the application only receives a signed transaction or a public key.
            </p>
            <img src={albedo1} style={styles.inlineImg} alt="Albedo login flow" />
            <h4 style={styles.h4}>Key Features</h4>
            <p>
              Albedo supports several intent types: <strong>publicKey</strong> (request the user's public key), <strong>signMessage</strong> (sign an arbitrary message for authentication), <strong>tx</strong> (sign a Stellar transaction), and <strong>pay</strong> (request a payment). This makes it incredibly versatile for building Web3 applications.
            </p>
            <img src={albedo2} style={styles.inlineImg} alt="Albedo sign transaction" />
            <h4 style={styles.h4}>Integrating Albedo</h4>
            <p>
              Integrating Albedo into your application is straightforward. Install the Albedo SDK via npm: <code>npm install @albedo-link/intent</code>. Then use the intent API to request permissions from the user. The SDK handles all the cryptographic operations securely.
            </p>
            <img src={albedo3} style={styles.inlineImg} alt="Albedo code integration" />
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://albedo.link" style={styles.refLink}>Albedo — Stellar Permission Manager</a></p>
            <p>[2] <a href="https://github.com/stellar-expert/albedo" style={styles.refLink}>Albedo on GitHub</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Web3 identity and authentication expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
