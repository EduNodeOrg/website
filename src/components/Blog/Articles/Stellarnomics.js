import React, { Component } from 'react';
import NavBar from '../NavBar';
import economics from './economics.png';
import nodes from './nodes.PNG';
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

export default class Stellarnomics extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/stellarnomics';
    const title = 'Stellarnomics: Understanding the Stellar Network Economics';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={economics} style={styles.hero} alt="Stellar Network Economics" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Economics · XLM</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Understanding the economics of the Stellar network is essential for anyone building on it. From the role of XLM as the native currency to the fee structure and inflation mechanism, Stellar's economic design is carefully crafted to enable fast, low-cost global payments.
            </p>
            <div style={styles.callout}>
              <strong>Key fact:</strong> Stellar was designed from the ground up to facilitate cross-border payments. With transaction fees as low as 0.00001 XLM and settlement times of 3-5 seconds, it is one of the most efficient payment networks in existence.
            </div>
            <h4 style={styles.h4}>The Role of XLM</h4>
            <p>
              Lumens (XLM) are the native currency of the Stellar network. They serve three primary purposes: as a bridge currency for cross-asset transactions, as a spam prevention mechanism (each transaction requires a small fee), and as a minimum balance requirement for accounts (currently 1 XLM base reserve).
            </p>
            <img src={economics} style={styles.inlineImg} alt="Stellar economics diagram" />
            <h4 style={styles.h4}>The Stellar Network Structure</h4>
            <p>
              The Stellar network is maintained by a decentralized network of nodes. Each node participates in the Stellar Consensus Protocol (SCP), a federated Byzantine agreement system that allows nodes to reach consensus without a central authority. This makes the network both decentralized and highly efficient.
            </p>
            <img src={nodes} style={styles.inlineImg} alt="Stellar network nodes" />
            <h4 style={styles.h4}>Transaction Fees</h4>
            <p>
              Every transaction on Stellar requires a small fee, currently set at 100 stroops (0.00001 XLM) as the base fee. This fee serves as a spam prevention mechanism. During periods of high network activity, users can set higher fees to prioritize their transactions.
            </p>
            <h4 style={styles.h4}>Anchors and the Bridge Currency Model</h4>
            <p>
              Anchors are entities that bridge the gap between traditional finance and the Stellar network. They accept deposits in fiat currency and issue equivalent tokens on the Stellar network. When you want to send USD to someone in Europe as EUR, Stellar uses XLM as an intermediate bridge currency, converting automatically through the decentralized exchange.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://stellar.org/learn/intro-to-stellar" style={styles.refLink}>Introduction to Stellar — stellar.org</a></p>
            <p>[2] <a href="https://developers.stellar.org/docs/fundamentals-and-concepts/lumens" style={styles.refLink}>Lumens (XLM) — Stellar Developer Docs</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Stellar network economist and payment technology expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
