import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import snft from './newnft1.png';
import lite from './litemintlogo.png';
import keybase from './keybaseicon.png';
import nft1 from './nft1.jpg';
import jack from './jackfirsttweet.jpeg';
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

export default class NFT extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/minting-nfts';
    const title = 'What are NFTs and how to mint them using the Stellar Network?';
    const profilePic = profilePicImg;
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={snft} style={styles.hero} alt="NFTs on Stellar Network" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · NFTs · Litemint</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Non-Fungible Tokens (NFTs) have taken the digital world by storm. But what exactly are they, and how can you mint your own on the Stellar Network? In this guide, we break it all down.
            </p>
            <div style={styles.callout}>
              <strong>What is an NFT?</strong> An NFT (Non-Fungible Token) is a unique digital asset verified using blockchain technology. Unlike regular cryptocurrencies, each NFT is one-of-a-kind and cannot be replicated or exchanged on a like-for-like basis.
            </div>
            <h4 style={styles.h4}>Fungible vs Non-Fungible</h4>
            <p>
              A fungible asset is interchangeable — one dollar is worth the same as any other dollar. A non-fungible asset is unique — a specific painting by Picasso is not interchangeable with any other painting. NFTs bring this concept of uniqueness to the digital world.
            </p>
            <img src={nft1} style={styles.inlineImg} alt="NFT concept" />
            <h4 style={styles.h4}>NFTs on Stellar</h4>
            <p>
              The Stellar network supports NFTs through its native asset issuance mechanism. By issuing an asset with a maximum supply of 1 and locking the issuing account, you create a truly unique, non-fungible token. This approach is simple, cost-effective, and leverages Stellar's fast settlement times.
            </p>
            <img src={jack} style={styles.inlineImg} alt="First tweet NFT" />
            <h4 style={styles.h4}>Minting with Litemint</h4>
            <p>
              Litemint is one of the leading NFT marketplaces built on the Stellar network. It provides a user-friendly interface for minting, buying, and selling NFTs. You can visit their platform at <a href="https://litemint.com" style={styles.refLink}>litemint.com</a> to get started.
            </p>
            <img src={lite} style={styles.inlineImg} alt="Litemint marketplace" />
            <h4 style={styles.h4}>Step-by-Step: Minting Your First NFT</h4>
            <p>
              1. Create a Stellar wallet (Freighter or Albedo)<br/>
              2. Fund your account with XLM<br/>
              3. Connect your wallet to Litemint<br/>
              4. Upload your digital artwork<br/>
              5. Set your price and mint!
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://litemint.com" style={styles.refLink}>Litemint — NFT Marketplace on Stellar</a></p>
            <p>[2] <a href="https://developers.stellar.org/docs/issuing-assets/anatomy-of-an-asset" style={styles.refLink}>Anatomy of an Asset — Stellar Developers</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Web3 educator and digital asset specialist based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
