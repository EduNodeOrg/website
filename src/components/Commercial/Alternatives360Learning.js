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
  Card, CTAButton, GhostButton, CompareTable, BulletList, Faq,
} from './shared';

const faqs = [
  {
    q: 'Is EduNode a 360Learning competitor?',
    a: 'They solve different problems. 360Learning is an LMS authoring platform — it gives your L&D team tools to create and distribute courses. EduNode is the course content itself: 33 ready-made technical tracks plus enterprise curriculum development through OG Technologies EU.',
  },
  {
    q: 'Can we get custom courses for our team?',
    a: 'Yes. EduNode Enterprise — delivered with OG Technologies EU, a Vienna-based IT consultancy — provides tailored curriculum, dedicated support and certificate tracking for employees. Contact sales via the pricing page.',
  },
  {
    q: 'How does pricing compare to 360Learning?',
    a: '360Learning uses per-seat enterprise pricing via sales quote. EduNode Pro is €6.99 per person per month with no minimum seat count, and Enterprise is quoted per engagement — typically far below LMS platform pricing for small technical teams.',
  },
  {
    q: 'Can employees verify their certificates externally?',
    a: 'Yes. Every certificate carries a unique number checkable at edunode.org/validCertificate and is anchored on-chain — useful for compliance evidence and audit trails.',
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

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '360Learning Alternative for IT, Coding & DLT Team Training',
  description: 'A factual comparison of EduNode Enterprise and 360Learning for technical team upskilling in IT, software engineering, AI and blockchain.',
  url: 'https://edunode.org/alternatives/360learning',
  datePublished: '2026-11-26',
  dateModified: '2026-11-26',
  author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org/about#founder', jobTitle: 'Founder, EduNode & OG Technologies EU' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  mainEntityOfPage: 'https://edunode.org/alternatives/360learning',
};

export default function Alternatives360Learning() {
  return (
    <Page>
      <PageMeta
        title="360Learning Alternative for IT, Coding & DLT Team Training"
        description="Need ready-made IT, software engineering, AI & blockchain courses instead of an empty LMS? Compare EduNode Enterprise + OG Technologies EU vs 360Learning."
        path="/alternatives/360learning"
        image="https://edunode.org/og/alternatives-360learning.png"
      />
      <JsonLd data={faqLd} />
      <JsonLd data={articleLd} />
      <NavBar />
      <Wrap maxWidth="lg">
        <Eyebrow>For teams &amp; L&amp;D</Eyebrow>
        <HeroTitle variant="h3" component="h1">
          A 360Learning alternative when you need the curriculum, not just the LMS
        </HeroTitle>
        <Lead>
          360Learning is a strong platform for companies that want to author their own internal
          training. But if your goal is to upskill engineers on IT, software development, AI, DLT or
          blockchain — you need ready-made, expert-written content. That is what EduNode Enterprise,
          delivered with OG Technologies EU, provides.
        </Lead>
        <TrustSignals />

        <SectionTitle variant="h4" component="h2">The core difference</SectionTitle>
        <CompareTable>
          <thead>
            <tr>
              <th></th>
              <th className="hl">EduNode Enterprise</th>
              <th>360Learning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What you buy</td>
              <td className="hl">Finished technical curriculum + custom development</td>
              <td>An LMS platform to build your own courses</td>
            </tr>
            <tr>
              <td>Time to first lesson</td>
              <td className="hl">Day one — content already exists</td>
              <td>After your team authors the content</td>
            </tr>
            <tr>
              <td>Technical depth</td>
              <td className="hl">Practitioner-written: DLT, security auditing, AI agents, cloud</td>
              <td>Depends on your internal authors</td>
            </tr>
            <tr>
              <td>Pricing model</td>
              <td className="hl">€6.99/mo per person, or custom Enterprise engagement</td>
              <td>Per-seat SaaS pricing via sales quote</td>
            </tr>
            <tr>
              <td>Proof of completion</td>
              <td className="hl">Verifiable certificates — online + on-chain anchored</td>
              <td>Internal completion tracking</td>
            </tr>
            <tr>
              <td>Customization</td>
              <td className="hl">Custom curriculum built with OG Technologies EU consultants</td>
              <td>You author with their tooling</td>
            </tr>
          </tbody>
        </CompareTable>
        <PlatformComparisonInfographic />

        <SectionTitle variant="h4" component="h2">Who EduNode Enterprise fits</SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <SubTitle variant="h6" component="h3">Engineering teams</SubTitle>
              <Para sx={{ mb: 0 }}>
                Upskill developers on Rust, Docker, AI-assisted workflows, or Web3 engineering —
                with exercises and projects, not passive video.
              </Para>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <SubTitle variant="h6" component="h3">Fintech &amp; DLT companies</SubTitle>
              <Para sx={{ mb: 0 }}>
                Stellar, Soroban, stablecoins, smart contract security and ISO 20022-adjacent
                knowledge — written by a practicing blockchain consultant.
              </Para>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <SubTitle variant="h6" component="h3">IT &amp; support orgs</SubTitle>
              <Para sx={{ mb: 0 }}>
                Networking, Linux, cybersecurity and troubleshooting foundations with verifiable
                completion records for audits.
              </Para>
            </Card>
          </Grid>
        </Grid>

        <SectionTitle variant="h4" component="h2">When 360Learning is the better choice</SectionTitle>
        <Para>
          If your company already employs instructional designers and wants to produce its own
          onboarding, compliance or soft-skills content at scale, an authoring-first LMS like
          360Learning is designed for exactly that — EduNode does not try to replace it.
          Where EduNode wins is when the content itself is the hard part: deep technical,
          current, expert-authored curriculum.
        </Para>
        <BulletList>
          <li><strong style={{ color: '#fff' }}>OG Technologies EU</strong> — the Vienna consultancy behind EduNode — can build custom tracks around your stack and compliance needs.</li>
          <li><strong style={{ color: '#fff' }}>Verifiable completion:</strong> certificate numbers resolve publicly, useful evidence for ISO/security audits.</li>
          <li><strong style={{ color: '#fff' }}>No seat minimums:</strong> pilot with three engineers on Pro before any enterprise commitment.</li>
        </BulletList>

        <SectionTitle variant="h4" component="h2">Talk to us</SectionTitle>
        <Para>
          Pilot free lessons today, or reach out about a custom enterprise track for your team.
        </Para>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
          <CTAButton href="mailto:hi@ogtechnologies.co?subject=Enterprise%20Training%20Inquiry">Contact enterprise sales</CTAButton>
          <GhostButton href="/certified-courses">See the catalog</GhostButton>
        </div>
        <Para sx={{ mt: 3 }}>
          Comparing individual plans too?{' '}
          <Link to="/alternatives/coursera-udemy" style={{ color: '#00d4ff' }}>
            Coursera &amp; Udemy comparison →
          </Link>
        </Para>

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
