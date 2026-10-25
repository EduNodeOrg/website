import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowForward, CheckCircleOutline, Code, LockOutlined, SchoolOutlined } from '@mui/icons-material';
import PageMeta from '../PageMeta';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { catalog } from './catalog';
import './styles.css';

const categories = ['All topics', ...new Set(catalog.map((course) => course.category))];
const totalLessons = catalog.reduce((sum, course) => sum + course.lessons.length, 0);
const catalogLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: catalog.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: course.title,
    url: `https://edunode.org/masterclasses/${course.slug}`,
  })),
};

export function MasterclassShell({ children }) {
  return (
    <div className="masterclasses-page">
      <Helmet><meta name="viewport" content="width=device-width, initial-scale=1" /></Helmet>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default function Masterclasses() {
  const [category, setCategory] = useState('All topics');
  const courses = catalog.filter((course) => category === 'All topics' || course.category === category);
  return (
    <MasterclassShell>
      <PageMeta
        title="Masterclasses: Coding, Data, AI, Security, Cloud & Web3 | EduNode"
        description="Build practical skills with twenty-four detailed masterclasses. Explore Python, JavaScript, SQL, Git, AI, cybersecurity, Docker, IT support, stablecoins, Ethereum, Stellar, zero-knowledge proofs, crypto, Bitcoin, and AI assistants. The first 20% of every class is free."
        path="/masterclasses"
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(catalogLd)}</script></Helmet>
      <main className="mc-container">
        <section className="mc-hero">
          <div className="mc-hero-copy">
            <p className="mc-eyebrow"><span /> LEARN BY BUILDING</p>
            <h1>Masterclasses<span>Practical skills.<br /><em>Real possibilities.</em></span></h1>
            <p className="mc-lead">Go from understanding a concept to using it. Learn Python, JavaScript, data, AI, security, cloud, IT fundamentals, and Web3 — stablecoins, Ethereum, Stellar, zero-knowledge proofs, and crypto — through guided lessons and projects you can make your own.</p>
            <div className="mc-actions">
              <a className="mc-button mc-button-primary" href="#masterclass-catalog">Explore masterclasses <ArrowForward fontSize="small" /></a>
              <Link className="mc-button mc-button-secondary" to="/pricing">Explore Pro</Link>
            </div>
            <p className="mc-small"><CheckCircleOutline fontSize="small" /> Start the first two lessons of any class. No account or card required.</p>
          </div>
          <div className="mc-hero-panel" aria-label="Learning paths">
            <div className="mc-panel-heading"><Code /> YOUR NEXT CHAPTER</div>
            {catalog.map((course, index) => (
              <Link to={`/masterclasses/${course.slug}`} className="mc-path" key={course.slug} style={{ '--mc-accent': course.color }}>
                <span className="mc-path-number">0{index + 1}</span>
                <span>{course.shortTitle}</span><ArrowForward fontSize="small" />
              </Link>
            ))}
            <div className="mc-panel-footer"><span className="mc-status-dot" /> A project at the end of every path</div>
          </div>
        </section>

        <section className="mc-stats" aria-label="Masterclass format">
          <div><strong>{catalog.length}</strong><span>focused learning paths</span></div>
          <div><strong>{totalLessons}</strong><span>lessons with practice</span></div>
          <div><strong>20%</strong><span>of each class free</span></div>
          <div><strong>{catalog.length}</strong><span>portfolio projects</span></div>
        </section>

        <section id="masterclass-catalog" className="mc-section">
          <div className="mc-section-heading">
            <div><p className="mc-eyebrow">CHOOSE YOUR PATH</p><h2>What will you build next?</h2></div>
            <p>Start with the foundations. Finish with something that works.</p>
          </div>
          <div className="mc-filters" role="group" aria-label="Filter masterclasses by topic">
            {categories.map((item) => (
              <button type="button" key={item} aria-pressed={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="mc-grid" aria-live="polite">
            {courses.map((course) => (
              <article className="mc-card" key={course.slug} style={{ '--mc-accent': course.color }}>
                <div className="mc-card-top"><span className="mc-symbol" aria-hidden="true">{course.symbol}</span><span className="mc-badge">2 FREE LESSONS</span></div>
                <p className="mc-category">{course.category}</p>
                <h3><Link to={`/masterclasses/${course.slug}`}>{course.title}</Link></h3>
                <p className="mc-card-description">{course.description}</p>
                <div className="mc-card-meta"><span>10 lessons</span><span>6–8 hours with practice</span></div>
                <div className="mc-card-project"><Code fontSize="small" /><p><strong>Your final project</strong>{course.project}</p></div>
                <Link className="mc-card-link" to={`/masterclasses/${course.slug}`}>View masterclass <ArrowForward fontSize="small" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mc-access-banner mc-section">
          <div className="mc-access-copy"><p className="mc-eyebrow">A CLEAR PATH FORWARD</p><h2>Start free.<br />Go further with Pro.</h2><p>Every masterclass has 10 lessons. Lessons 1–2 are free for everyone. Lessons 3–10, including the final project, are included with an active Pro membership.</p><Link className="mc-button mc-button-primary" to="/pricing">See Pro membership <ArrowForward fontSize="small" /></Link></div>
          <div className="mc-access-details">
            <div><SchoolOutlined /><div><h3>Your free 20%</h3><p>Two complete lessons per class, with worked examples, exercises, and knowledge checks. Read and practice without signing in.</p></div></div>
            <div><LockOutlined /><div><h3>The remaining 80% with Pro</h3><p>Eight further lessons per class, deeper practical work, and a final project with acceptance criteria and a review checklist.</p></div></div>
            <div className="mc-access-meter" aria-label="20 percent free, 80 percent Pro"><span>20% free</span><span>80% Pro</span></div>
            <p className="mc-small">Access percentages are based on lesson count. Learning time includes the suggested exercises.</p>
          </div>
        </section>

        <section className="mc-section mc-faq">
          <p className="mc-eyebrow">BEFORE YOU START</p><h2>A few useful answers</h2>
          <details><summary>Do I need programming experience?</summary><p>Python, SQL, AI automation, and cybersecurity start with the fundamentals. Docker and cloud deployment assumes basic Python and Git familiarity. Every class lists its prerequisites and tools.</p></details>
          <details><summary>What is included in a lesson?</summary><p>Each lesson includes learning objectives, written explanations, a worked example or scenario, an exercise with a suggested solution, and a knowledge check. These are self-paced reading and practice courses.</p></details>
          <details><summary>Do I need to pay for software?</summary><p>Most local exercises use free tools. n8n hosting, model APIs, and cloud deployment may require separate accounts or incur usage charges. These costs are not included in EduNode Pro; relevant lessons explain setup and cleanup.</p></details>
          <details><summary>How is my progress saved?</summary><p>Lesson completion is saved in this browser after you pass its knowledge check. It is personal study progress, not a graded credential, and does not sync between devices.</p></details>
          <details><summary>Do I need a crypto wallet?</summary><p>No for the IT classes. The Web3 & Blockchain classes (stablecoins, Ethereum, Stellar, zero-knowledge, crypto fundamentals) teach concepts and practice on free testnets — no wallet or funds are required to learn.</p></details>
        </section>
      </main>
    </MasterclassShell>
  );
}
