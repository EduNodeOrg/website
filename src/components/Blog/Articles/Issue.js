import React, { Component } from 'react';
import NavBar from '../NavBar';
import issue from './issue.png';
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

export default class Issue extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/How-to-issue';
    const title = 'How to issue assets on the Stellar Network';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={issue} style={styles.hero} alt="How to Issue Assets on Stellar" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Assets · Tokenization</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              One of the most powerful features of the Stellar network is the ability to issue custom assets — tokens that represent anything from fiat currencies and commodities to loyalty points and digital collectibles. In this guide, we walk through the process step by step.
            </p>
            <div style={styles.callout}>
              <strong>What is an asset on Stellar?</strong> An asset on Stellar is any token issued on the network. It is identified by a code (e.g., "USD") and the issuing account's public key. Assets can represent real-world value or be entirely digital.
            </div>
            <h4 style={styles.h4}>Prerequisites</h4>
            <p>
              To issue an asset on Stellar, you need: a funded Stellar account (the issuing account), a distribution account, and access to the Stellar SDK or Stellar Laboratory. You will also need to set up a trustline from the distribution account to the issuing account.
            </p>
            <h4 style={styles.h4}>Step 1: Create the Issuing Account</h4>
            <p>
              The issuing account is the source of your asset. Every unit of your asset that exists on the network was created by this account. It is best practice to keep the issuing account's secret key offline and only use it to issue new tokens.
            </p>
            <h4 style={styles.h4}>Step 2: Set Up a Trustline</h4>
            <p>
              Before an account can hold your asset, it must establish a trustline. A trustline is an explicit opt-in that says "I trust this issuer and am willing to hold their asset." This is done using the Change Trust operation.
            </p>
            <h4 style={styles.h4}>Step 3: Issue the Asset</h4>
            <p>
              Once the trustline is established, the issuing account can send the asset to the distribution account using a Payment operation. From there, the distribution account can send the asset to any account that has established a trustline.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://developers.stellar.org/docs/issuing-assets/how-to-issue-an-asset" style={styles.refLink}>How to Issue an Asset — Stellar Developers</a></p>
            <p>[2] <a href="https://laboratory.stellar.org" style={styles.refLink}>Stellar Laboratory — Test your transactions</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Stellar network expert and payment technology specialist based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
