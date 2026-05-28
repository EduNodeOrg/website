import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import sc from '../smartcontract.png';
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

export default class Contracts extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/smart-contracts';
    const title = 'What are Smart Contracts and how you can build them on Stellar?';
    const profilePic = profilePicImg;
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={sc} style={styles.hero} alt="Smart Contracts on Stellar" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Stellar · Smart Contracts · Soroban</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="Olvis Gil" />
            <span><strong>Olvis Gil</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They run on blockchain networks and automatically execute when predetermined conditions are met — no intermediary required.
            </p>
            <div style={styles.callout}>
              <strong>Analogy:</strong> Think of a smart contract like a vending machine. You put in money, select your item, and the machine automatically dispenses it. No cashier, no trust required — just code.
            </div>
            <h4 style={styles.h4}>What are Smart Contracts?</h4>
            <p>
              A smart contract is a program stored on a blockchain that runs when predetermined conditions are met. They are used to automate the execution of an agreement so that all participants can be immediately certain of the outcome, without any intermediary's involvement or time loss.
            </p>
            <h4 style={styles.h4}>Smart Contracts on Stellar with Soroban</h4>
            <p>
              Soroban is Stellar's smart contract platform, designed to be developer-friendly, scalable, and interoperable. Built in Rust, Soroban contracts are compiled to WebAssembly (WASM) and run on the Stellar network. This makes them fast, secure, and highly efficient.
            </p>
            <p>
              Key features of Soroban include: a developer-friendly SDK, predictable and low fees, built-in testing tools, and seamless integration with Stellar's existing payment infrastructure.
            </p>
            <h4 style={styles.h4}>Building Your First Smart Contract</h4>
            <p>
              To get started with Soroban, you need to install the Rust toolchain and the Soroban CLI. Once set up, you can write, test, and deploy contracts directly to the Stellar testnet. The Soroban documentation at <a href="https://soroban.stellar.org" style={styles.refLink}>soroban.stellar.org</a> provides comprehensive guides and examples.
            </p>
            <h4 style={styles.h4}>Use Cases</h4>
            <p>
              Smart contracts on Stellar can be used for: decentralized exchanges (DEX), lending and borrowing protocols, tokenized assets, escrow services, and automated payment systems. The combination of Stellar's speed and Soroban's programmability opens up an entirely new world of financial applications.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://soroban.stellar.org" style={styles.refLink}>Soroban — Stellar Smart Contracts Platform</a></p>
            <p>[2] <a href="https://stellar.org/blog/developers/project-jump-cannon-soroban-is-now-live-on-mainnet" style={styles.refLink}>Soroban is now live on Mainnet</a></p>
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
              <p style={styles.authorBio}>Founder of <a href="https://edunode.org" style={{ color: '#6B48FF' }}>EduNode</a> and <a href="https://www.mozartpay.com" style={{ color: '#6B48FF' }}>MozartPay</a>. Blockchain educator and smart contract developer based in Vienna, Austria.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
