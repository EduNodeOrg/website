import React, { Component } from 'react';
import NavBar from '../../../NavBar';
import amm from './AMMs.png';
import aqua from './aquaimg.png';
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
  shareSection: { marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e4e8f0' },
  shareLabel: { fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  shareButtons: { display: 'flex', gap: '10px', alignItems: 'center' },
  authorCard: { display: 'flex', alignItems: 'center', gap: '20px', background: '#fff', border: '1px solid #e4e8f0', borderRadius: '16px', padding: '24px', marginTop: '48px', boxShadow: '0 4px 20px rgba(107,72,255,0.08)' },
  authorAvatar: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6B48FF', flexShrink: 0 },
  authorName: { fontWeight: '700', fontSize: '1.1rem', color: '#0d0d2b', marginBottom: '4px' },
  authorBio: { fontSize: '0.9rem', color: '#555', lineHeight: '1.5', margin: 0 },
  refLink: { color: '#6B48FF', textDecoration: 'none', wordBreak: 'break-all' },
};

export default class AMM extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/automated-market-maker';
    const title = 'DeFi Explained: What is an Automated Market Maker?';
    const profilePic = 'https://edunode.org/static/media/mepic.b4df988c06dc4700be7c.png';
    const ammy = "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/2JYSUKBZKJDLPAOVBQT2EH2IHI.png";
    const off = "https://media0.giphy.com/media/SEWEmCymjv8XDbsb8I/giphy.gif";
    const sc = "https://media0.giphy.com/media/idKeY3nvmdIsM/giphy.gif?cid=ecf05e47m4lxujqwiffgwaoopcey55b4lmhv4xtu24r1cev3&rid=giphy.gif&ct=g";

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta name="description" content="What are AMMs? Why are they useful? And how they are being used in decentralized finance." />
        </Helmet>
        <NavBar />
        <img src={amm} style={styles.hero} alt="Automated Market Maker" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · DeFi · AMM</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>One of the most interesting ideas in DeFi is the concept of AMMs, so I thought it would be a good idea to talk about: What are AMMs? Why are they useful? And how they are being used in decentralized finance.</p>
            <h4 style={styles.h4}>What are AMMs?</h4>
            <p>AMM stands for "Automated Market Maker" and we can describe them as a tool used to provide liquidity to decentralized applications. AMMs are basically a <a href="https://edunode.org/blog/smart-contracts" style={styles.refLink}>Smart Contract</a> where the supply and the demand of the assets involved are determined by a mathematical algorithm.</p>
            <img src={sc} style={styles.inlineImg} alt="Smart contract diagram" />
            <div style={styles.callout}>
              <strong>How it works:</strong> An AMM allows traders to buy and sell certain assets or tokens using an algorithm that dictates how expensive something should be, based on how much of it there is. As someone buys one asset, it gets more expensive because there is less of it — and as they give another asset, it gets cheaper because there is more of it.
            </div>
            <img src={ammy} style={styles.inlineImg} alt="AMM price curve" />
            <p>This is unlike traditional Market Makers, which are usually managed by one person or a group of people.</p>
            <img src={off} style={styles.inlineImg} alt="Traditional vs AMM comparison" />
            <h4 style={styles.h4}>State of the Art</h4>
            <p>There are several popular decentralized and permission-less exchanges that allow the trading of tokens, such as Uniswap and Aave. Uniswap in particular was one of the first widely used DApps that implemented AMMs for the trade of ERC-20 tokens. Uniswap and other DeFi Exchanges use a simple <strong>x*y=k</strong> equation to set the mathematical relationship between the particular assets held in the liquidity pools. <a href="https://defipulse.com/" style={styles.refLink}>Here</a> you can find details about the DApps with the most locked value.</p>
            <h4 style={styles.h4}>AMMs on Stellar</h4>
            <p>The release of protocol 18 on November 3rd brought the long-awaited AMM functionality to the Stellar network. This release is particularly exciting because it is a new way to bring liquidity by leveraging liquidity pools on the network.</p>
            <p>Liquidity providers earn a <strong>0.3% fee</strong> on all trades proportional to their share of the pool. Fees are added to the pool and accumulated in real time. Fees can be claimed by withdrawing your liquidity. You can find more details in <a href="https://stellar.org/blog/introducing-automated-market-makers-on-stellar" style={styles.refLink}>this blog post</a> written by Justin Rice.</p>
            <p>AMMs are being used significantly, and one of the projects leveraging this new functionality on Stellar is called StellarX. On this <a href="https://medium.com/stellarxhq/amms-on-stellarx-b0f9c493936c" style={styles.refLink}>blog post</a>, written by Dima from the StellarX team, you can learn how you can create liquidity pools.</p>
            <p>Another project leveraging AMMs on Stellar is <strong>Aquarius</strong>, a liquidity management layer for the Stellar Network. Aquarius is designed to supercharge trading on Stellar, bring more liquidity, and give control over how it is distributed across various market pairs. It adds incentives for SDEX traders ("market maker rewards") and rewards for AMM liquidity providers. <a href="https://aqua.network/" style={styles.refLink}>https://aqua.network/</a></p>
            <img src={aqua} style={styles.inlineImg} alt="Aquarius on Stellar" />
            <h4 style={styles.h4}>Conclusion</h4>
            <p>AMMs are one of the most popular applications in decentralized finance and have proven to work as one of the best ways of generating liquidity across a great range of DeFi projects. We look forward to the future of AMMs, especially on the Stellar Network, where it has begun to gain serious momentum.</p>
            <p>If you enjoy this blog post, feel free to share it with your friends and join our Discord server: <a href="https://discord.gg/pcenYYjPmd" style={styles.refLink}>https://discord.gg/pcenYYjPmd</a></p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://stellar.org/blog/introducing-automated-market-makers-on-stellar" style={styles.refLink}>Introducing Automated Market Makers on Stellar</a></p>
            <p>[2] <a href="https://medium.com/stellarxhq/amms-on-stellarx-b0f9c493936c" style={styles.refLink}>AMMs on StellarX</a></p>
            <p>[3] <a href="https://www.coindesk.com/learn/2021/08/20/what-is-an-automated-market-maker/" style={styles.refLink}>What Is an Automated Market Maker? — CoinDesk</a></p>
            <p>[4] <a href="https://stellar.org/blog/amms-in-the-stellar-ecosystem" style={styles.refLink}>AMMs in the Stellar Ecosystem</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Web3 educator, DeFi enthusiast, and payment technology expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
