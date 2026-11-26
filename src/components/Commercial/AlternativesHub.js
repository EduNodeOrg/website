import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import PageMeta from '../PageMeta';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import JsonLd from '../JsonLd';
import TrustSignals from '../TrustSignals';
import PlatformComparisonInfographic from '../Infographics/PlatformComparisonInfographic';
import {
  Page, Wrap, Eyebrow, HeroTitle, Lead, SectionTitle, SubTitle, Para,
  Card, CTAButton, GhostButton, CompareTable, Faq,
} from './shared';

const personas = [
  {
    who: 'Career switchers',
    need: 'A structured path from zero to employable — not a library of disconnected videos.',
    fit: 'Start with Python or IT Support masterclasses, then stack a certificate in your target field. €0 to try, €6.99/mo to finish.',
  },
  {
    who: 'Software engineers',
    need: 'Deep, current material on fast-moving topics — Rust, AI agents, L2 rollups, smart contract security.',
    fit: 'EduNode lessons are written and updated like documentation, not re-recorded video. Pro courses go senior-level on Web3 engineering.',
  },
  {
    who: 'Crypto, DLT & blockchain builders',
    need: 'Stellar, Soroban, Ethereum, ZK proofs, stablecoins and auditing — taught by a practicing consultant.',
    fit: 'The deepest catalog in this niche: 14 certified blockchain tracks plus free ecosystem guides on the blog.',
  },
  {
    who: 'Team leads & L&D managers',
    need: 'Ready-made technical curriculum with verifiable completion — without building an LMS course from scratch.',
    fit: 'Enterprise plans deliver the full catalog plus custom curriculum via OG Technologies EU. See the 360Learning comparison.',
  },
];

const faqs = [
  {
    q: 'Is EduNode a good Coursera alternative?',
    a: 'For hands-on IT, coding, AI and blockchain skills — yes. EduNode costs €6.99/month versus roughly €399/year for Coursera Plus, teaches through interactive text and code rather than video lectures, and issues verifiable certificates. Coursera remains the better choice if you specifically need accredited university credit.',
  },
  {
    q: 'How is EduNode different from Udemy?',
    a: 'Udemy sells courses individually (€10–€120 each) from thousands of independent instructors, so depth and freshness vary. EduNode is a single curated curriculum: 33 tracks written to one standard, kept current for 2026 topics, all included in one €6.99/month subscription.',
  },
  {
    q: 'Can EduNode replace 360Learning for team training?',
    a: 'For technical teams, yes: EduNode provides the ready-made curriculum — you do not have to author courses yourself. 360Learning is an LMS authoring platform, better suited when a company wants to build and host its own non-technical internal training.',
  },
  {
    q: 'Do EduNode certificates mean anything to employers?',
    a: 'Each certificate carries a unique number that employers can check at edunode.org/validCertificate, and completion is anchored on-chain — so a certificate is verifiable rather than a screenshot. It certifies course completion; it is not an accredited degree.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function AlternativesHub() {
  return (
    <Page>
      <PageMeta
        title="Best Coursera, Udemy & 360Learning Alternatives (2026)"
        description="Compare EduNode (€6.99/mo) against Coursera, Udemy, and 360Learning for coding, IT, AI, DLT, and blockchain courses with certificates — for solo & teams."
        path="/alternatives"
        image="https://edunode.org/og/alternatives.png"
      />
      <JsonLd data={faqLd} />
      <NavBar />
      <Wrap maxWidth="lg">
        <Eyebrow>Honest comparisons</Eyebrow>
        <HeroTitle variant="h3" component="h1">
          Best Coursera, Udemy &amp; 360Learning Alternatives (2026)
        </HeroTitle>
        <Lead>
          Looking for an alternative to the big learning platforms for IT, software development,
          coding, AI, DLT, crypto or blockchain skills? This page compares EduNode with Coursera,
          Udemy and 360Learning — including where each competitor genuinely wins.
        </Lead>
        <TrustSignals />

        <SectionTitle variant="h4" component="h2">The 30-second comparison</SectionTitle>
        <CompareTable>
          <thead>
            <tr>
              <th></th>
              <th className="hl">EduNode</th>
              <th>Coursera</th>
              <th>Udemy</th>
              <th>360Learning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              <td className="hl">Free tier + €6.99/mo all-access</td>
              <td>~€59/mo or ~€399/yr (Plus)</td>
              <td>€10–€120 per course</td>
              <td>Per-seat enterprise pricing</td>
            </tr>
            <tr>
              <td>Format</td>
              <td className="hl">Interactive text, code &amp; exercises</td>
              <td>University video lectures</td>
              <td>Instructor video courses</td>
              <td>LMS authoring platform</td>
            </tr>
            <tr>
              <td>Curriculum</td>
              <td className="hl">33 curated tracks, updated for 2026 AI &amp; DLT</td>
              <td>Broad catalog incl. accredited degrees</td>
              <td>Huge but uneven catalog</td>
              <td>You author the content</td>
            </tr>
            <tr>
              <td>Certificates</td>
              <td className="hl">PDF + blockchain-anchored, verifiable</td>
              <td>Accredited options (extra cost)</td>
              <td>Completion certificate</td>
              <td>Internal tracking</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td className="hl">Hands-on tech careers &amp; Web3 teams</td>
              <td>University credit &amp; credentials</td>
              <td>Casual, one-off topics</td>
              <td>Non-tech company training</td>
            </tr>
          </tbody>
        </CompareTable>
        <PlatformComparisonInfographic />

        <SectionTitle variant="h4" component="h2">Which alternative fits you?</SectionTitle>
        <Grid container spacing={3}>
          {personas.map((p) => (
            <Grid item xs={12} md={6} key={p.who}>
              <Card>
                <SubTitle variant="h6" component="h3">{p.who}</SubTitle>
                <Para sx={{ mb: 1 }}><strong style={{ color: '#fff' }}>You need:</strong> {p.need}</Para>
                <Para sx={{ mb: 0, fontSize: '0.92rem' }}><strong style={{ color: '#00d4ff' }}>EduNode fit:</strong> {p.fit}</Para>
              </Card>
            </Grid>
          ))}
        </Grid>

        <SectionTitle variant="h4" component="h2">Deep-dive comparisons</SectionTitle>
        <Para>
          <Link to="/alternatives/coursera-udemy" style={{ color: '#00d4ff' }}>
            Coursera &amp; Udemy alternative for coding, IT &amp; blockchain →
          </Link>
          <br />
          <Link to="/alternatives/360learning" style={{ color: '#00d4ff' }}>
            360Learning alternative for IT &amp; DLT team training →
          </Link>
        </Para>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
          <CTAButton href="/certified-courses">Browse certified courses</CTAButton>
          <GhostButton href="/pricing">See pricing — €6.99/mo</GhostButton>
        </div>

        <SectionTitle variant="h4" component="h2">Common questions</SectionTitle>
        {faqs.map((f) => (
          <Faq key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </Faq>
        ))}
      </Wrap>
      <Footer />
    </Page>
  );
}
