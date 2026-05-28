import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from './edunode-logo.jpg';
import sc from '../IPFS.png';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import four from './4.png';
import five from './5.png';
import six from './6.png';
import seven from './7.png';
import eight from './8.png';
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

export default class Ipfs extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/ipfs';
    const title = 'What is IPFS and how you can use it?';
    const profilePic = profilePicImg;
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={sc} style={styles.hero} alt="IPFS Decentralized Storage" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>IPFS · Web3 · Decentralized Storage</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="EduNode Logo" />
            <span><strong>EduNode Team</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              The InterPlanetary File System (IPFS) is one of the most important infrastructure components of the Web3 ecosystem. It provides a decentralized, peer-to-peer way to store and share files — addressing one of the fundamental limitations of the current web.
            </p>
            <div style={styles.callout}>
              <strong>The problem IPFS solves:</strong> On the traditional web, files are stored at a specific location (URL). If that server goes down, the file is gone. IPFS stores files based on their content hash, so as long as anyone in the network has the file, it is accessible.
            </div>
            <h4 style={styles.h4}>Introduction to IPFS</h4>
            <p>
              InterPlanetary File System (IPFS) is a distributed protocol and network for storing and sharing hypermedia in a peer-to-peer (P2P) fashion. IPFS is a decentralized alternative to the World Wide Web (WWW) and is built on top of it. The protocol was initially designed by Juan Benet, and it was first released in 2015.
            </p>
            <img src={one} style={styles.codeImg} alt="IPFS architecture" />
            <h4 style={styles.h4}>What is IPFS used for?</h4>
            <p>
              IPFS has several use cases, including: file sharing, decentralized websites, decentralized applications (dApps), NFT metadata storage, and permanent archival of important data. It is the backbone of many Web3 applications, including NFT platforms that store artwork on IPFS.
            </p>
            <img src={two} style={styles.codeImg} alt="IPFS use cases" />
            <h4 style={styles.h4}>How to Upload Images on IPFS</h4>
            <p>
              Uploading images on IPFS is a simple process that can be done in a few steps. The easiest way to get started is using Pinata or NFT.Storage, which provide user-friendly interfaces for uploading files to IPFS.
            </p>
            <img src={three} style={styles.codeImg} alt="IPFS upload step 1" />
            <img src={four} style={styles.codeImg} alt="IPFS upload step 2" />
            <img src={five} style={styles.codeImg} alt="IPFS upload step 3" />
            <img src={six} style={styles.codeImg} alt="IPFS upload step 4" />
            <img src={seven} style={styles.codeImg} alt="IPFS upload step 5" />
            <img src={eight} style={styles.codeImg} alt="IPFS upload step 6" />
            <h4 style={styles.h4}>Conclusion</h4>
            <p>
              IPFS is a powerful and innovative protocol that allows users to store and access files in a decentralized and secure manner. With its unique features, IPFS has the potential to revolutionize the way we store and share information online.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://ipfs.tech" style={styles.refLink}>IPFS — Official Website</a></p>
            <p>[2] <a href="https://docs.ipfs.tech/concepts/what-is-ipfs/" style={styles.refLink}>What is IPFS? — IPFS Docs</a></p>
            <p>[3] <a href="https://www.pinata.cloud" style={styles.refLink}>Pinata — IPFS Pinning Service</a></p>
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
            <img src={profilePic} style={styles.authorAvatar} alt="EduNode Logo" />
            <div>
              <div style={styles.authorName}>EduNode Team</div>
              <p style={styles.authorBio}>The EduNode editorial team — building Web3 education resources for developers and learners worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
