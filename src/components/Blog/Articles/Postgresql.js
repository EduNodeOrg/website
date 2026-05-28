import React, { Component } from 'react';
import NavBar from '../NavBar';
import sc from '../postgres.png';
import one from '../11.png';
import two from '../22.png';
import three from '../33.png';
import four from '../44.png';
import five from '../55.png';
import six from '../66.png';
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

export default class Postgresql extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/postgresql';
    const title = 'What is PostgreSQL and how you can use it?';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={sc} style={styles.hero} alt="PostgreSQL for Blockchain" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>PostgreSQL · Blockchain · Database</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              PostgreSQL is one of the most powerful and widely-used open-source relational database management systems in the world. In the context of blockchain and Web3 development, PostgreSQL plays a crucial role as the off-chain data layer for decentralized applications.
            </p>
            <div style={styles.callout}>
              <strong>Why PostgreSQL for blockchain?</strong> While blockchain stores immutable transaction records, most dApps need a fast, queryable database for user data, application state, and analytics. PostgreSQL provides the perfect complement to on-chain storage.
            </div>
            <h4 style={styles.h4}>Introduction to PostgreSQL</h4>
            <p>
              PostgreSQL is a popular open-source relational database management system that provides a robust platform for data storage, retrieval, and manipulation. It is widely used in various applications, including blockchain technology. In this blog, we will explore how to use PostgreSQL in blockchain applications.
            </p>
            <img src={one} style={styles.codeImg} alt="PostgreSQL setup step 1" />
            <h4 style={styles.h4}>Setting Up PostgreSQL</h4>
            <p>
              Setting up PostgreSQL is straightforward. On Ubuntu, you can install it with: <code>sudo apt-get install postgresql postgresql-contrib</code>. Once installed, you can connect to the default database using: <code>sudo -u postgres psql</code>.
            </p>
            <img src={two} style={styles.codeImg} alt="PostgreSQL setup step 2" />
            <img src={three} style={styles.codeImg} alt="PostgreSQL setup step 3" />
            <h4 style={styles.h4}>Connecting to PostgreSQL</h4>
            <p>
              Next, we need to grant the necessary permissions to the user and create a database for our blockchain application. This involves creating a new PostgreSQL role, setting a password, and granting the appropriate privileges.
            </p>
            <img src={four} style={styles.codeImg} alt="PostgreSQL connection" />
            <h4 style={styles.h4}>Storing Blockchain Data</h4>
            <p>
              When building a Stellar application, you might want to store transaction history, account balances, or application-specific data in PostgreSQL. This allows for fast queries and complex analytics that would be impractical to perform directly on the blockchain.
            </p>
            <img src={five} style={styles.codeImg} alt="Storing blockchain data" />
            <img src={six} style={styles.codeImg} alt="Querying blockchain data" />
            <h4 style={styles.h4}>Conclusion</h4>
            <p>
              PostgreSQL is a powerful database management system that can be used in blockchain applications to store and retrieve data efficiently. The combination of PostgreSQL's robust querying capabilities with Stellar's fast settlement makes for a powerful application stack.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://www.postgresql.org/docs/" style={styles.refLink}>PostgreSQL — Official Documentation</a></p>
            <p>[2] <a href="https://developers.stellar.org/docs/data/horizon" style={styles.refLink}>Horizon API — Stellar Data Layer</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Full-stack developer and database architect based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
