import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import PageMeta from '../PageMeta';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import JsonLd from '../JsonLd';
import TrustSignals from '../TrustSignals';
import PricingValueInfographic from '../Infographics/PricingValueInfographic';
import {
  Page, Wrap, Eyebrow, HeroTitle, Lead, SectionTitle, SubTitle, Para,
  Card, CTAButton, GhostButton, CompareTable, BulletList, Faq,
} from './shared';

const faqs = [
  {
    q: 'Is EduNode cheaper than Coursera?',
    a: 'Yes. EduNode Pro is €6.99 per month — about €84 per year — versus roughly €59 per month or €399 per year for Coursera Plus. EduNode also has a permanent free tier: the first 20% of every masterclass with no account.',
  },
  {
    q: 'Can I buy a single EduNode course like on Udemy?',
    a: 'No — EduNode is one subscription, not a marketplace. €6.99/month unlocks all 33 tracks. If you only ever want one topic, a single Udemy course on sale can cost less; if you plan to keep learning, the subscription is far cheaper.',
  },
  {
    q: 'Do I get a certificate like on Coursera?',
    a: 'Yes. Every completed track issues a PDF certificate with a unique, publicly verifiable certificate number, anchored on-chain. Coursera certificates carry university branding; EduNode certificates verify hands-on completion.',
  },
  {
    q: 'Who writes EduNode courses?',
    a: 'The curriculum is written and reviewed by Olvis E. Gil Rios, founder of EduNode and OG Technologies EU — a Vienna-based blockchain, payments and cybersecurity consultancy — rather than uploaded by independent instructors.',
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
  headline: 'Coursera & Udemy Alternative for Coding, IT & Blockchain',
  description: 'A factual comparison of EduNode, Coursera and Udemy for hands-on IT, software development, AI, DLT and blockchain education.',
  url: 'https://edunode.org/alternatives/coursera-udemy',
  datePublished: '2026-11-26',
  dateModified: '2026-11-26',
  author: { '@type': 'Person', name: 'Olvis Gil', url: 'https://edunode.org/about#founder', jobTitle: 'Founder, EduNode & OG Technologies EU' },
  publisher: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
  mainEntityOfPage: 'https://edunode.org/alternatives/coursera-udemy',
};

export default function AlternativesCourseraUdemy() {
  return (
    <Page>
      <PageMeta
        title="Coursera & Udemy Alternative for Coding, IT & Blockchain"
        description="Tired of outdated video lectures or €59/mo subscriptions? Compare EduNode (€6.99/mo) vs Coursera & Udemy for hands-on Python, SQL, AI & Web3 certificates."
        path="/alternatives/coursera-udemy"
        image="https://edunode.org/og/alternatives-coursera-udemy.png"
      />
      <JsonLd data={faqLd} />
      <JsonLd data={articleLd} />
      <NavBar />
      <Wrap maxWidth="lg">
        <Eyebrow>Comparison guide</Eyebrow>
        <HeroTitle variant="h3" component="h1">
          A Coursera &amp; Udemy alternative built for hands-on tech skills
        </HeroTitle>
        <Lead>
          Coursera and Udemy are excellent at what they were designed for — university-style video
          lectures and a giant instructor marketplace. If what you actually want is to <em>do</em> IT,
          coding, AI, DLT or blockchain work with a verifiable certificate at the end, EduNode was
          built specifically for that.
        </Lead>
        <TrustSignals />

        <SectionTitle variant="h4" component="h2">Side by side</SectionTitle>
        <CompareTable>
          <thead>
            <tr>
              <th></th>
              <th className="hl">EduNode</th>
              <th>Coursera</th>
              <th>Udemy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What you pay</td>
              <td className="hl">€0 to start · €6.99/mo for everything</td>
              <td>~€59/mo or ~€399/yr for Plus</td>
              <td>€10–€120 each course, per course</td>
            </tr>
            <tr>
              <td>How you learn</td>
              <td className="hl">Written lessons you practice: exercises, quizzes, projects</td>
              <td>Video lectures + peer assignments</td>
              <td>Video lectures, quality varies by instructor</td>
            </tr>
            <tr>
              <td>Fast-moving topics</td>
              <td className="hl">Lessons updated like docs — 2026 AI agents, L2 rollups, Soroban</td>
              <td>Courses update on university schedules</td>
              <td>Depends whether the instructor still updates</td>
            </tr>
            <tr>
              <td>Try before paying</td>
              <td className="hl">First 2 lessons of every class, no account</td>
              <td>Audit mode on selected courses</td>
              <td>Preview videos only</td>
            </tr>
            <tr>
              <td>Certificate</td>
              <td className="hl">PDF + on-chain anchored, publicly verifiable</td>
              <td>University-branded (paid tiers)</td>
              <td>Completion PDF, not verifiable externally</td>
            </tr>
          </tbody>
        </CompareTable>
        <PricingValueInfographic />

        <SectionTitle variant="h4" component="h2">Why video marketplaces struggle with 2026 tech</SectionTitle>
        <Para>
          Topics like smart contract auditing, Layer-2 rollups, Soroban development and AI-agent
          workflows change quarterly. A video course recorded eighteen months ago shows screens that
          no longer exist — and re-recording is expensive, so it rarely happens. Written,
          exercise-first lessons can be corrected the week a protocol ships, the same way good
          documentation is maintained.
        </Para>
        <BulletList>
          <li><strong style={{ color: '#fff' }}>Practice-first:</strong> every lesson ends with an exercise and a knowledge check, not a quiz about what you watched.</li>
          <li><strong style={{ color: '#fff' }}>One curriculum, one standard:</strong> all 33 tracks are authored to the same structure — no roulette on instructor quality.</li>
          <li><strong style={{ color: '#fff' }}>Portfolio output:</strong> each track ends in a project you can show, plus a certificate an employer can verify online.</li>
        </BulletList>

        <SectionTitle variant="h4" component="h2">When Coursera or Udemy is the better choice</SectionTitle>
        <Para>
          Being honest here matters — the wrong platform for your goal is a waste of money either way.
        </Para>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <SubTitle variant="h6" component="h3">Choose Coursera if…</SubTitle>
              <BulletList>
                <li>You need accredited university credit or a recognized professional certificate (e.g. Google, IBM, Meta programs).</li>
                <li>You learn best from lecture-style video and structured cohort pacing.</li>
                <li>Your subject is outside tech — Coursera covers business, arts, health and more.</li>
              </BulletList>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <SubTitle variant="h6" component="h3">Choose Udemy if…</SubTitle>
              <BulletList>
                <li>You want exactly one niche course and can catch it on sale.</li>
                <li>You prefer long-form video walkthroughs over reading + doing.</li>
                <li>Your topic is a hobby or non-technical skill — music, photography, office tools.</li>
              </BulletList>
            </Card>
          </Grid>
        </Grid>

        <SectionTitle variant="h4" component="h2">See for yourself — free</SectionTitle>
        <Para>
          The fastest way to judge is the first two lessons of any masterclass — no signup, no card.
          If the format works for you, Pro unlocks all 33 tracks for €6.99/month.
        </Para>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
          <CTAButton href="/masterclasses">Try 2 free lessons</CTAButton>
          <GhostButton href="/certified-courses">All certified tracks</GhostButton>
        </div>
        <Para sx={{ mt: 3 }}>
          Comparing enterprise options?{' '}
          <Link to="/alternatives/360learning" style={{ color: '#00d4ff' }}>
            See the 360Learning comparison for team training →
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
