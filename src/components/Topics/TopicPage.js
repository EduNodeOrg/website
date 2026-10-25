import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

// Shared layout for topic hub pages (/stablecoins, /ethereum,
// /crypto-fundamentals). Each route component supplies its own <Helmet>
// with literal meta so the static HTML generator can bake it — this file
// is layout only.
export const topicStyles = {
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
  heroEyebrow: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.6px',
    textTransform: 'uppercase',
    opacity: 0.85,
    marginBottom: '14px',
  },
  heroTitle: {
    fontSize: '2.6rem',
    fontWeight: '800',
    lineHeight: '1.2',
    maxWidth: '860px',
    margin: '0 auto 16px',
  },
  heroLead: {
    fontSize: '1.15rem',
    fontWeight: '500',
    opacity: 0.92,
    maxWidth: '720px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0d0d2b',
    marginTop: '44px',
    marginBottom: '6px',
  },
  sectionBlurb: {
    color: '#555',
    fontSize: '1rem',
    marginBottom: '18px',
    lineHeight: '1.7',
  },
  card: {
    display: 'block',
    background: '#fff',
    border: '1px solid #e4e8f0',
    borderRadius: '14px',
    padding: '18px 22px',
    marginBottom: '12px',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(13,13,43,0.05)',
  },
  cardTitle: {
    fontWeight: '700',
    color: '#0d0d2b',
    fontSize: '1.05rem',
    marginBottom: '4px',
  },
  cardDesc: {
    color: '#555',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '8px',
  },
  chip: {
    border: '1px solid #e4e8f0',
    background: '#fff',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#0d0d2b',
    textDecoration: 'none',
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
  faqA: {
    color: '#2d2d3a',
    lineHeight: '1.75',
    fontSize: '0.98rem',
  },
};

function HubLink({ link, accent }) {
  return (
    <Link to={link.href} style={{ ...topicStyles.card, borderLeft: `4px solid ${accent}` }}>
      <div style={topicStyles.cardTitle}>{link.title}</div>
      {link.desc && <div style={topicStyles.cardDesc}>{link.desc}</div>}
    </Link>
  );
}

export default function TopicPage({ accent, eyebrow, title, lead, sections, faqs }) {
  return (
    <div style={topicStyles.page}>
      <NavBar />
      <div style={{ ...topicStyles.hero, background: accent }}>
        <div style={topicStyles.heroEyebrow}>{eyebrow}</div>
        <h1 style={topicStyles.heroTitle}>{title}</h1>
        <div style={topicStyles.heroLead}>{lead}</div>
      </div>
      <div style={topicStyles.wrapper}>
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 style={topicStyles.sectionTitle}>{section.heading}</h2>
            {section.blurb && <p style={topicStyles.sectionBlurb}>{section.blurb}</p>}
            {section.links
              ? section.links.map((link) => <HubLink key={link.href} link={link} accent={accent} />)
              : (
                <div style={topicStyles.chipRow}>
                  {section.chips.map((chip) => (
                    <Link key={chip.href} to={chip.href} style={topicStyles.chip}>{chip.label}</Link>
                  ))}
                </div>
              )}
          </section>
        ))}
        {faqs && faqs.length > 0 && (
          <section>
            <h2 style={topicStyles.sectionTitle}>Frequently asked questions</h2>
            <div style={{ marginTop: '14px' }}>
              {faqs.map((faq) => (
                <div key={faq.q} style={topicStyles.faqItem}>
                  <div style={topicStyles.faqQ}>{faq.q}</div>
                  <div style={topicStyles.faqA}>{faq.a}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
