import React, { Component } from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import sc from '../Dockerr.png';
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

export default class Docker extends Component {
  render() {
    const shareUrl = 'https://edunode.org/blog/docker';
    const title = 'What is Docker and how you can use it?';
    const profilePic = profilePicImg;
    

    return (
      <div style={styles.page}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
        </Helmet>
        <NavBar />
        <img src={sc} style={styles.hero} alt="Docker for Blockchain Development" />
        <div style={styles.wrapper}>
          <div style={styles.tag}>Docker · DevOps · Blockchain</div>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.meta}>
            <img src={profilePic} style={styles.avatar} alt="EduNode Team" />
            <span><strong>EduNode Team</strong> &nbsp;·&nbsp; EduNode &nbsp;·&nbsp; 5 min read</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.body}>
            <p>
              Docker is one of the most powerful tools in a modern developer's toolkit. It allows you to package applications and their dependencies into portable containers that run consistently across any environment — from your laptop to a cloud server.
            </p>
            <div style={styles.callout}>
              <strong>Analogy:</strong> Think of Docker containers like shipping containers. Just as a shipping container can be loaded onto any ship, truck, or train regardless of its contents, a Docker container can run on any machine that has Docker installed — regardless of the underlying operating system.
            </div>
            <h4 style={styles.h4}>What is Docker?</h4>
            <p>
              Docker is an open-source platform that enables developers to build, ship, and run applications in containers. A container is a lightweight, standalone, executable package that includes everything needed to run a piece of software: code, runtime, system tools, libraries, and settings.
            </p>
            <h4 style={styles.h4}>Docker vs Virtual Machines</h4>
            <p>
              Unlike virtual machines (VMs), which virtualize an entire operating system, Docker containers share the host OS kernel and isolate the application processes. This makes containers much lighter, faster to start, and more resource-efficient than VMs.
            </p>
            <h4 style={styles.h4}>Docker in Blockchain Development</h4>
            <p>
              Docker is widely used in blockchain development for running local blockchain nodes, setting up development environments, and deploying decentralized applications. For Stellar development, you can run a local Stellar network using Docker to test your applications before deploying to the mainnet.
            </p>
            <h4 style={styles.h4}>Getting Started with Docker</h4>
            <p>
              To get started, download Docker Desktop from <a href="https://www.docker.com" style={styles.refLink}>docker.com</a>. Once installed, you can pull and run any container with a single command: <code>docker run hello-world</code>. From there, you can explore Docker Hub for thousands of pre-built images, including blockchain nodes, databases, and development tools.
            </p>
            <h4 style={styles.h4}>Resources</h4>
            <p>[1] <a href="https://docs.docker.com/get-started/" style={styles.refLink}>Docker — Get Started Guide</a></p>
            <p>[2] <a href="https://hub.docker.com/" style={styles.refLink}>Docker Hub — Container Registry</a></p>
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
            <img src={profilePic} style={styles.authorAvatar} alt="EduNode Team" />
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
