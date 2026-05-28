import React, { Component } from 'react';
import NavBar from '../../NavBar';
import suave from './stellarglobal.png';
import tag from './tag.png';
import lite from './lite.png';
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

export default class Blockchain extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/learn-about-blockchain';
    const title = 'Workshop: Learn about Blockchain and how to apply it to your day-to-day business life';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={suave} style={styles.hero} alt="Workshop: Learn about Blockchain and how to apply it to your day-to-day business life" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Blockchain · Education · Workshop</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Blockchain is one of the most transformative technologies of our time. In this workshop, we explore what blockchain is, how it works, and how you can apply it to your day-to-day business life.
            </p>
            <h4 style={styles.h4}>What is Blockchain?</h4>
            <p>
              A blockchain is a distributed ledger technology (DLT) that records transactions across many computers so that the record cannot be altered retroactively. Think of it as a shared Google Doc that everyone can read but no one can secretly edit — every change is visible and permanent.
            </p>
            <div style={styles.callout}>
              <strong>Key insight:</strong> Blockchain removes the need for a central authority (like a bank) to validate transactions. Instead, the network itself validates them through consensus mechanisms.
            </div>
            <img src={tag} style={styles.inlineImg} alt="Blockchain tag diagram" />
            <h4 style={styles.h4}>How does it work?</h4>
            <p>
              Each "block" in the chain contains a set of transactions, a timestamp, and a cryptographic hash of the previous block. This chaining of blocks makes it virtually impossible to alter historical records without changing all subsequent blocks — which would require the consensus of the entire network.
            </p>
            <h4 style={styles.h4}>Business Applications</h4>
            <p>
              Blockchain technology is being applied across many industries: supply chain management for tracking goods from origin to shelf, financial services for cross-border payments, healthcare for secure patient data sharing, and real estate for transparent property records.
            </p>
            <img src={lite} style={styles.inlineImg} alt="Blockchain business applications" />
            <h4 style={styles.h4}>Getting Started on Stellar</h4>
            <p>
              The Stellar network is one of the most accessible blockchain platforms for building real-world financial applications. With fast transaction times (3-5 seconds) and extremely low fees, it is ideal for payment applications, tokenization, and decentralized finance.
            </p>
            <p>
              If you enjoyed this workshop, feel free to share it and join our Discord community: <a href="https://discord.gg/pcenYYjPmd" style={styles.refLink}>https://discord.gg/pcenYYjPmd</a>
            </p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Blockchain educator and Web3 consultant based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
