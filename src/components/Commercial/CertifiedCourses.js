import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Grid } from '@mui/material';
import PageMeta from '../PageMeta';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import JsonLd from '../JsonLd';
import TrustSignals from '../TrustSignals';
import CertificateRoadmapInfographic from '../Infographics/CertificateRoadmapInfographic';
import SkillStackInfographic from '../Infographics/SkillStackInfographic';
import { catalog } from '../Masterclasses/catalog';
import { allCourses } from '../ProCourses/data';
import {
  Page, Wrap, Eyebrow, HeroTitle, Lead, SectionTitle, SubTitle, Para,
  Card, CTAButton, GhostButton, Faq,
} from './shared';

const CERT_GROUP = {
  Programming: 'Coding & Data', Data: 'Coding & Data',
  'Web Development': 'Coding & Data', 'Developer Tools': 'Coding & Data',
  Security: 'IT, Cloud & Security', 'Cloud & DevOps': 'IT, Cloud & Security',
  Infrastructure: 'IT, Cloud & Security', 'IT Support': 'IT, Cloud & Security',
  'AI & Automation': 'AI & Automation', 'AI Assistants': 'AI & Automation',
  'Web3 & Blockchain': 'Blockchain, DLT & Crypto',
};
const GROUPS = ['Coding & Data', 'IT, Cloud & Security', 'AI & Automation', 'Blockchain, DLT & Crypto'];

const tracks = [
  ...catalog.map((c) => ({
    name: c.title, group: CERT_GROUP[c.category] || c.category,
    href: `/masterclasses/${c.slug}`, meta: '10 lessons · 6–8 hours · free lessons 1–2',
  })),
  ...allCourses.map((c) => ({
    name: c.title, group: 'Blockchain, DLT & Crypto',
    href: `/courses/${c.id}`, meta: `${c.modules.length} modules · ${c.duration} · Pro course`,
  })),
];

const faqs = [
  {
    q: 'Are EduNode courses really free to try?',
    a: 'Yes. The first two lessons — 20% — of every masterclass are free without an account or credit card. You can evaluate the teaching style, depth and exercises before paying anything.',
  },
  {
    q: 'What kind of certificate do I get?',
    a: 'Completing a course issues a downloadable PDF certificate of completion with a unique certificate number. Certificates can be verified online at edunode.org/validCertificate and are anchored on-chain for tamper-proof verification.',
  },
  {
    q: 'How much does full access cost?',
    a: 'EduNode Pro is €6.99 per month and unlocks every masterclass and Pro course — all 33 certified tracks. There are no per-course fees; you can cancel anytime.',
  },
  {
    q: 'Are these video courses?',
    a: 'No. Lessons are written, interactive walkthroughs with worked examples, exercises with suggested solutions, and knowledge checks — built to be read and practiced at your own pace, not watched.',
  },
  {
    q: 'Can my team use EduNode for training?',
    a: 'Yes. Enterprise plans add custom curriculum, dedicated support and certificate tracking for teams through OG Technologies EU. See the pricing page or contact sales.',
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

export default function CertifiedCourses() {
  const [group, setGroup] = useState('All tracks');
  const shown = tracks.filter((t) => group === 'All tracks' || t.group === group);
  return (
    <Page>
      <PageMeta
        title="Online IT, Coding & Blockchain Courses with Certificates"
        description="33 self-paced IT, Python, SQL, AI, Rust, DLT & blockchain courses with verifiable PDF certificates. Start 2 lessons free or unlock all with Pro (€6.99/mo)."
        path="/certified-courses"
        image="https://edunode.org/og/certified-courses.png"
      />
      <JsonLd data={faqLd} />
      <NavBar />
      <Wrap maxWidth="lg">
        <Eyebrow>Certified learning paths</Eyebrow>
        <HeroTitle variant="h3" component="h1">
          Online IT, Coding &amp; Blockchain Courses with Certificates
        </HeroTitle>
        <Lead>
          Thirty-three self-paced tracks across coding &amp; data, IT &amp; cloud, AI engineering, and
          blockchain/DLT — each ending with a real project and a verifiable certificate of completion.
          Start the first two lessons of any masterclass free, no account required.
        </Lead>
        <TrustSignals />

        <SectionTitle variant="h4" component="h2">Choose your track</SectionTitle>
        <Para>
          Filter by field. Every track lists its time commitment, project, and certificate up front —
          no hidden tiers.
        </Para>
        <div style={{ margin: '8px 0 24px' }}>
          {['All tracks', ...GROUPS].map((g) => (
            <Chip
              key={g}
              label={g}
              onClick={() => setGroup(g)}
              sx={{
                mr: 1, mb: 1, cursor: 'pointer',
                background: group === g ? 'linear-gradient(45deg,#00d4ff,#7b2ff7)' : 'rgba(123,47,247,0.15)',
                color: '#fff', border: '1px solid rgba(123,47,247,0.4)',
              }}
            />
          ))}
        </div>
        <Grid container spacing={3}>
          {shown.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.href}>
              <Card>
                <Para sx={{ mb: 0.5, fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#00d4ff' }}>
                  {t.group}
                </Para>
                <SubTitle variant="h6" component="h3">
                  <Link to={t.href} style={{ color: '#fff', textDecoration: 'none' }}>{t.name}</Link>
                </SubTitle>
                <Para sx={{ fontSize: '0.85rem' }}>{t.meta}</Para>
                <Link to={t.href} style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '0.9rem' }}>
                  View course →
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>

        <SectionTitle variant="h4" component="h2">How the certificate path works</SectionTitle>
        <CertificateRoadmapInfographic />
        <SkillStackInfographic />

        <SectionTitle variant="h4" component="h2">Pricing, plainly</SectionTitle>
        <Para>
          Free gets you lessons 1–2 of every masterclass. Pro (€6.99/month) unlocks all 270+ lessons,
          every Pro course, and the downloadable PDF + blockchain-anchored certificates.
          One subscription — not a different price per course.
        </Para>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
          <CTAButton href="/masterclasses">Start free lessons</CTAButton>
          <GhostButton href="/pricing">Buy Pro — €6.99/mo</GhostButton>
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
