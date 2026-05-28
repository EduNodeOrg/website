import React, { Component } from 'react';
import NavBar from '../../../NavBar';
import profilePicImg from '../../mepic.png';
import creator from './creator.png';
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

export default class Web3 extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/the-web3-revolution';
    const title = 'The Web3 Revolution And The New Creator Economy';
    const profilePic = profilePicImg;

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={creator} style={styles.hero} alt="The Web3 Revolution And The New Creator Economy" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Web3 · Creator Economy · DeFi</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Web3 is the next evolution of the internet — one where users own their data, creators own their content, and financial transactions happen without intermediaries. This is not just a technological shift; it is a fundamental change in the power dynamics of the digital economy.
            </p>
            <h4 style={styles.h4}>What is Web3?</h4>
            <p>
              Web3 refers to a decentralized version of the internet built on blockchain technology. Unlike Web2 (the current internet dominated by platforms like Google, Facebook, and Amazon), Web3 aims to give users direct ownership and control over their digital assets and identity.
            </p>
            <div style={styles.callout}>
              <strong>The shift:</strong> In Web2, you are the product. In Web3, you are the owner. Creators can finally monetize their work directly, without giving up 30–50% to platform intermediaries.
            </div>
            <h4 style={styles.h4}>The New Creator Economy</h4>
            <p>
              The creator economy is booming. Millions of content creators — musicians, artists, writers, educators — are leveraging Web3 tools to build direct relationships with their audiences. NFTs, tokenized communities, and decentralized platforms are enabling creators to earn more while retaining full ownership of their work.
            </p>
            <p>
              Creators are now able to leverage this technology in the shape of NFTs (check out our guide to learn more about NFTs <a href="https://edunode.org/blog/minting-nfts" style={styles.refLink}>here</a>). Digital signatures, decentralized social networks, "play-to-earn" video games that reward players with crypto tokens, and NFT platforms are just some examples of the use cases for Web3.
            </p>
            <h4 style={styles.h4}>The Emergence of DAOs</h4>
            <p>
              Decentralized Autonomous Organizations (DAOs) are one of the most fascinating ideas rising from Web3 technology. DAOs are member-owned communities without centralized leadership. This means that creators are finally able to participate in a whole new, fully automated, and decentralized economy — where they are the true owners of their content.
            </p>
            <h4 style={styles.h4}>Decentralized Identifiers (DID)</h4>
            <p>
              Decentralized Identifiers (DIDs) are usually a URL that allows you to identify something. Participating in a new decentralized economy does not mean a lack of user responsibility — on the contrary, decentralization should empower participants to choose which data they wish to share. Some projects developing DID solutions include <a href="https://trustoverip.org/" style={styles.refLink}>Trust Over IP Foundation</a> and <a href="https://www.hyperledger.org/use/aries" style={styles.refLink}>Hyperledger Aries</a>.
            </p>
            <h4 style={styles.h4}>Conclusion</h4>
            <p>
              Web3 has set a new paradigm where creators have actual ownership over their content. With great power comes great responsibility — and even though Web3 is still in its infancy, we can all agree that this technology is here to stay. Every day, new use cases across countless industries are being developed, taking us to a time where the web has a deeper and more meaningful role in our daily lives.
            </p>
            <p>If you enjoyed this blog post, please share it with your friends!</p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Web3 educator and blockchain technology expert based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
