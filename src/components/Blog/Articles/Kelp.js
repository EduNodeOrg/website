import React, { Component } from 'react';
import NavBar from '../NavBar';
import kelp from './sdf_stellar.png';
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

export default class Kelp extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/kelp';
    const title = 'Kelp: Setup your first trading bot on the Stellar Network';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={kelp} style={styles.hero} alt="Kelp Trading Bot on Stellar" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Trading · Bots</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Kelp is a free, customizable, and open-source trading bot for the Stellar decentralized exchange (SDEX). Whether you are a market maker, arbitrageur, or simply want to automate your trading strategy, Kelp provides a powerful and flexible framework.
            </p>
            <div style={styles.callout}>
              <strong>What is Kelp?</strong> Kelp is an open-source trading bot developed by the Stellar Development Foundation. It supports multiple trading strategies and can be configured to trade on the Stellar DEX automatically, 24/7.
            </div>
            <h4 style={styles.h4}>Why Use a Trading Bot?</h4>
            <p>
              Markets never sleep, but humans do. A trading bot can monitor price movements, execute trades, and manage your portfolio around the clock without emotional bias. For market makers on the Stellar DEX, Kelp can continuously place and update orders to provide liquidity and earn spread.
            </p>
            <h4 style={styles.h4}>Getting Started with Kelp</h4>
            <p>
              Kelp is available as a pre-compiled binary for Windows, macOS, and Linux. You can download it from the official GitHub repository at <a href="https://github.com/stellar/kelp" style={styles.refLink}>github.com/stellar/kelp</a>. Once downloaded, you configure it with a simple TOML configuration file that specifies your trading pair, strategy, and account credentials.
            </p>
            <h4 style={styles.h4}>Available Strategies</h4>
            <p>
              Kelp comes with several built-in strategies: <strong>buysell</strong> (simple buy/sell spread), <strong>balanced</strong> (maintain a balanced portfolio), <strong>mirror</strong> (mirror orders from another exchange), and <strong>sell</strong> (one-sided sell orders). You can also write custom strategies using the plugin architecture.
            </p>
            <h4 style={styles.h4}>Running Kelp</h4>
            <p>
              To run Kelp, simply execute the binary with your configuration file: <code>kelp trade --botConf ./trader.cfg --strategy buysell --stratConf ./buysell.cfg</code>. Kelp will connect to the Stellar network and start trading according to your configuration.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://github.com/stellar/kelp" style={styles.refLink}>Kelp on GitHub — Official Repository</a></p>
            <p>[2] <a href="https://kelpbot.io" style={styles.refLink}>Kelp Bot — Official Website</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Algorithmic trading enthusiast and Stellar network expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
