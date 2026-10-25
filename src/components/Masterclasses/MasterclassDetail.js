import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowForward, CheckCircleOutline, LockOutlined } from '@mui/icons-material';
import PageMeta from '../PageMeta';
import { MasterclassShell } from './index';
import { catalog, FREE_LESSON_COUNT } from './catalog';
import { useMembership } from './access';

export const lessonPath = (course, lesson) => `/masterclasses/${course.slug}/lessons/${lesson.slug}`;

export function MembershipNotice({ membership }) {
  if (membership.status === 'pro') return <p className="mc-member-notice"><CheckCircleOutline fontSize="small" /> Your Pro membership unlocks all 10 lessons.</p>;
  if (membership.status === 'loading') return <p className="mc-small" role="status">Checking your membership…</p>;
  if (membership.status === 'error') return <div className="mc-notice" role="status">Membership verification is temporarily unavailable. Free lessons are still open. <button type="button" className="mc-text-button" onClick={membership.retry}>Try again</button></div>;
  if (membership.status === 'expired') return <p className="mc-notice">Your session has expired. <Link to="/login">Sign in again</Link> to verify Pro access.</p>;
  return <p className="mc-small">Lessons 1–2 are free. An active Pro membership unlocks lessons 3–10.</p>;
}

export default function MasterclassDetail() {
  const { slug } = useParams();
  const course = catalog.find((item) => item.slug === slug);
  const membership = useMembership();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!course) return <Navigate to="/404" replace />;
  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    url: `https://edunode.org/masterclasses/${course.slug}`,
    provider: { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
    coursePrerequisites: course.prerequisites,
    educationalLevel: course.slug === 'docker-cloud-deployment' ? 'Beginner with programming experience' : 'Beginner',
    isAccessibleForFree: false,
    hasPart: course.lessons.map((lesson, index) => ({
      '@type': 'LearningResource',
      name: lesson.title,
      url: `https://edunode.org${lessonPath(course, lesson)}`,
      isAccessibleForFree: index < FREE_LESSON_COUNT,
    })),
  };
  return (
    <MasterclassShell>
      <PageMeta title={`${course.title} | EduNode`} description={course.description} path={`/masterclasses/${course.slug}`} />
      <Helmet><script type="application/ld+json">{JSON.stringify(courseLd)}</script></Helmet>
      <main className="mc-container mc-detail" style={{ '--mc-accent': course.color }}>
        <nav className="mc-breadcrumbs" aria-label="Breadcrumb"><Link to="/masterclasses">Masterclasses</Link><span>/</span><span>{course.shortTitle}</span></nav>
        <section className="mc-detail-hero">
          <div><p className="mc-eyebrow">{course.category.toUpperCase()}</p><h1>{course.title}</h1><p className="mc-lead">{course.description}</p><div className="mc-card-meta"><span>10 lessons</span><span>6–8 hours with practice</span><span>Self-paced</span></div><div className="mc-actions"><Link className="mc-button mc-button-primary" to={lessonPath(course, course.lessons[0])}>Start learning free <ArrowForward fontSize="small" /></Link><a className="mc-button mc-button-secondary" href="#curriculum">Explore the curriculum</a></div><MembershipNotice membership={membership} /></div>
          <aside className="mc-project-panel"><span className="mc-symbol" aria-hidden="true">{course.symbol}</span><p className="mc-eyebrow">BUILD SOMETHING USEFUL</p><h2>Your final project</h2><p>{course.project}</p><ul>{course.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><span className="mc-badge mc-pro-badge">INCLUDED WITH PRO</span></aside>
        </section>
        <section className="mc-overview-grid mc-section">
          <div><h2>What you’ll be able to do</h2><ul className="mc-outcomes">{course.outcomes.map((outcome) => <li key={outcome}><CheckCircleOutline fontSize="small" /><span>{outcome}</span></li>)}</ul></div>
          <div className="mc-prerequisites"><h3>Who this is for</h3><p>{course.audience}</p><h3>Before you start</h3><p>{course.prerequisites}</p><h3>Your toolkit</h3><p>{course.tools}</p></div>
        </section>
        <section className="mc-section" id="curriculum">
          <div className="mc-section-heading"><div><p className="mc-eyebrow">STEP BY STEP</p><h2>Your curriculum</h2></div><p>2 free lessons · 8 Pro lessons · 1 final project</p></div>
          <div className="mc-curriculum">
            {course.lessons.map((lesson, index) => {
              const isFree = index < FREE_LESSON_COUNT;
              return (
                <Link className="mc-curriculum-row" key={lesson.slug} to={lessonPath(course, lesson)}>
                  <span className="mc-lesson-number">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{lesson.title}</h3><p>{lesson.summary}</p></div>
                  <span className={`mc-badge ${isFree ? '' : 'mc-pro-badge'}`}>{!isFree && membership.status !== 'pro' && <LockOutlined fontSize="inherit" />}{isFree ? 'FREE' : 'PRO'}</span>
                  <ArrowForward className="mc-row-arrow" fontSize="small" />
                </Link>
              );
            })}
          </div>
          <p className="mc-small mc-curriculum-note">The first 2 of 10 lessons are completely free (20%). The remaining 8 lessons (80%) require Pro. Each includes an exercise and a knowledge check.</p>
        </section>
        <section className="mc-section mc-resources"><h2>Keep learning with trusted references</h2><p>Use these references alongside the lessons when you need more detail or current tool documentation.</p><div>{course.resources.map((resource) => resource.url.startsWith('/') ? <Link key={resource.url} to={resource.url}>{resource.title} <ArrowForward fontSize="small" /></Link> : <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.title} <ArrowForward fontSize="small" /></a>)}</div></section>
      </main>
    </MasterclassShell>
  );
}
