import React from 'react';
import NavBar from '../../NavBar';
import profilePicImg from '../mepic.png';
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

// Shared visual shell for journal articles — mirrors the layout used in
// Stablecoin.js. Meta (<Helmet>) stays in each article file so the static
// HTML generator can extract it.
export const articleStyles = {
  page: {
    background: '#f8f9fc',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    padding: '72px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  heroIcon: {
    fontSize: '72px',
    marginBottom: '12px',
    display: 'inline-block',
    filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
  },
  heroText: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    opacity: 0.92,
    maxWidth: '720px',
    margin: '0 auto',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  tag: {
    display: 'inline-block',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '800',
    lineHeight: '1.25',
    color: '#0d0d2b',
    marginBottom: '12px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    color: '#666',
    fontSize: '14px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e4e8f0',
    margin: '32px 0',
  },
  body: {
    fontSize: '1.05rem',
    lineHeight: '1.85',
    color: '#2d2d3a',
  },
  h4: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0d0d2b',
    marginTop: '36px',
    marginBottom: '12px',
    paddingBottom: '6px',
    display: 'inline-block',
  },
  callout: {
    background: 'linear-gradient(135deg, #e8fff5, #e8f7ff)',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: '1rem',
    color: '#2d2d3a',
    lineHeight: '1.7',
  },
  card: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(10,125,92,0.07)',
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: '4px',
    fontSize: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '0.95rem',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(10,125,92,0.07)',
  },
  th: {
    background: '#0d0d2b',
    color: '#fff',
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px 14px',
    borderTop: '1px solid #e4e8f0',
    color: '#2d2d3a',
    verticalAlign: 'top',
  },
  faqItem: {
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
  },
  faqQ: {
    fontWeight: '700',
    color: '#0d0d2b',
    marginBottom: '6px',
    fontSize: '1rem',
  },
  shareSection: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid #e4e8f0',
  },
  shareLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  shareButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  authorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '48px',
    boxShadow: '0 4px 20px rgba(10,125,92,0.08)',
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#0d0d2b',
    marginBottom: '4px',
  },
  authorBio: {
    fontSize: '0.9rem',
    color: '#555',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default function ArticleLayout({
  accent,
  color,
  heroIcon,
  heroText,
  tag,
  title,
  date,
  readTime,
  shareUrl,
  shareTitle,
  faqs,
  children,
}) {
  const s = articleStyles;
  return (
    <div style={s.page}>
      <NavBar />
      <div style={{ ...s.hero, background: accent }}>
        {heroIcon}
        <div style={s.heroText}>{heroText}</div>
      </div>
      <div style={s.wrapper}>
        <div style={{ ...s.tag, background: accent }}>{tag}</div>
        <h1 style={s.title}>{title}</h1>
        <div style={s.meta}>
          <img src={profilePicImg} style={{ ...s.avatar, border: `2px solid ${color}` }} alt="Olvis Gil" />
          <span>
            <strong>Olvis Gil</strong> &nbsp;·&nbsp; {date} &nbsp;·&nbsp; {readTime}
          </span>
        </div>
        <hr style={s.divider} />
        <div style={s.body}>
          {children}
          {faqs && faqs.length > 0 && (
            <>
              <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Frequently asked questions</h4>
              {faqs.map((faq) => (
                <div key={faq.q} style={s.faqItem}>
                  <div style={s.faqQ}>{faq.q}</div>
                  <div>{faq.a}</div>
                </div>
              ))}
            </>
          )}
        </div>
        <div style={s.shareSection}>
          <div style={s.shareLabel}>Share this article</div>
          <div style={s.shareButtons}>
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={shareTitle}>
              <LinkedinIcon size={36} round />
            </LinkedinShareButton>
            <FacebookShareCount url={shareUrl} />
          </div>
        </div>
        <div style={s.authorCard}>
          <img src={profilePicImg} style={{ ...s.authorAvatar, border: `3px solid ${color}` }} alt="Olvis Gil" />
          <div>
            <div style={s.authorName}>Olvis Gil</div>
            <p style={s.authorBio}>
              Founder of EduNode — an educational platform teaching blockchain
              development on Stellar, Ethereum, Soroban, and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
