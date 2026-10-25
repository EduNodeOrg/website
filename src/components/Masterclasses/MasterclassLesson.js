import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowBack, ArrowForward, CheckCircleOutline, ContentCopy, LockOutlined } from '@mui/icons-material';
import PageMeta from '../PageMeta';
import { MasterclassShell } from './index';
import { catalog, FREE_LESSON_COUNT } from './catalog';
import freeLessons from './freeLessons';
import { requestMasterclass } from './access';
import { lessonPath } from './MasterclassDetail';

export function CodeExample({ code, language = 'text' }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="mc-code">
      <div className="mc-code-toolbar"><span>{language}</span><button type="button" onClick={copy}><ContentCopy fontSize="inherit" />{copied ? 'Copied' : 'Copy'}</button></div>
      <pre tabIndex={0} aria-label={`${language} example`}><code>{code}</code></pre>
      {copyError && <p role="status" className="mc-small">Copy is unavailable. Select the example to copy it manually.</p>}
    </div>
  );
}

function readProgress(key, course) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(saved) ? [...new Set(saved.filter((slug) => course.lessons.some((lesson) => lesson.slug === slug)))] : [];
  } catch {
    return [];
  }
}

function KnowledgeCheck({ quiz, complete, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const correct = checked && Number(answer) === quiz.answer;
  return (
    <section className="mc-quiz">
      <p className="mc-eyebrow">CHECK YOUR UNDERSTANDING</p>
      <fieldset><legend>{quiz.question}</legend>
        {quiz.options.map((option, index) => (
          <label key={option} className={checked && index === quiz.answer ? 'mc-correct-answer' : ''}><input type="radio" name="knowledge-check" value={index} checked={answer === String(index)} onChange={(event) => { setAnswer(event.target.value); setChecked(false); }} /><span>{option}</span></label>
        ))}
      </fieldset>
      <button className="mc-button mc-button-secondary" type="button" disabled={answer === ''} onClick={() => setChecked(true)}>Check answer</button>
      {checked && <p className={`mc-answer-feedback ${correct ? 'correct' : ''}`} role="status"><strong>{correct ? 'That’s right. ' : 'Not quite. '}</strong>{quiz.explanation}</p>}
      {correct && <button className="mc-button mc-button-primary" type="button" onClick={onComplete} disabled={complete}><CheckCircleOutline fontSize="small" />{complete ? 'Lesson completed' : 'Mark lesson complete'}</button>}
    </section>
  );
}

function AccessPanel({ state, retry, returnTo }) {
  const error = state === 'error';
  const expired = state === 'expired';
  const guest = state === 'guest' || expired;
  return (
    <section className="mc-lock-panel" aria-live="polite">
      <LockOutlined className="mc-lock-icon" />
      <p className="mc-eyebrow">{error ? 'PLEASE TRY AGAIN' : 'CONTINUE WITH PRO'}</p>
      <h2>{error ? 'We couldn’t verify access right now.' : expired ? 'Sign in again to continue.' : 'Your next step is included with Pro.'}</h2>
      <p>{error ? 'Your lesson is still here. Please retry in a moment; your two free lessons remain available.' : expired ? 'Your session may have expired. Sign in to check your current membership.' : 'The first 2 lessons are free. Pro unlocks lessons 3–10, including practical exercises, worked solutions, and the final project.'}</p>
      <div className="mc-actions">
        {error ? <button type="button" className="mc-button mc-button-primary" onClick={retry}>Try again</button> : <Link className="mc-button mc-button-primary" to={guest ? `/login?returnTo=${encodeURIComponent(returnTo)}` : '/pricing'}>{guest ? 'Sign in to continue' : 'Unlock with Pro'} <ArrowForward fontSize="small" /></Link>}
        {guest && <Link className="mc-button mc-button-secondary" to="/pricing">Explore Pro membership</Link>}
        {!guest && !error && <button type="button" className="mc-button mc-button-secondary" onClick={retry}>Recheck membership</button>}
      </div>
    </section>
  );
}

function LessonReader({ course, lessonIndex }) {
  const metadata = course.lessons[lessonIndex];
  const isFree = lessonIndex < FREE_LESSON_COUNT;
  const auth = useSelector((state) => state.auth);
  const token = auth.isAuthenticated && typeof auth.token === 'string' ? auth.token : null;
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const account = auth.isAuthenticated ? auth.user?.id || auth.user?._id || auth.user?.email || 'member' : 'guest';
  const progressKey = `edunode:masterclasses:${account}:${course.slug}`;
  const [progress, setProgress] = useState(() => ({ key: progressKey, items: readProgress(progressKey, course) }));
  const completed = progress.key === progressKey ? progress.items : [];
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    setProgress({ key: progressKey, items: readProgress(progressKey, course) });
    setStorageError(false);
  }, [progressKey, course]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFree || !token) return undefined;
    const controller = new AbortController();
    setResult({ token, state: 'loading' });
    requestMasterclass({ course: course.slug, lesson: metadata.slug }, token, controller.signal)
      .then((data) => {
        if (!data.lesson?.sections || !data.lesson?.quiz) throw new Error('Invalid lesson response');
        setResult({ token, state: 'ready', lesson: data.lesson });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setResult({ token, state: error.status === 403 ? 'locked' : error.status === 401 ? 'expired' : 'error' });
      });
    return () => controller.abort();
  }, [course.slug, metadata.slug, isFree, token, attempt]);

  const currentResult = token && result?.token === token ? result : null;
  const state = isFree ? 'ready' : !token ? 'guest' : currentResult?.state || 'loading';
  const lesson = isFree ? freeLessons[course.slug][lessonIndex] : state === 'ready' ? currentResult.lesson : null;
  function markComplete() {
    const next = [...new Set([...completed, metadata.slug])];
    setProgress({ key: progressKey, items: next });
    try {
      localStorage.setItem(progressKey, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  const path = lessonPath(course, metadata);
  const lessonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: metadata.title,
    description: metadata.summary,
    url: `https://edunode.org${path}`,
    isAccessibleForFree: true,
    learningResourceType: 'Lesson',
    isPartOf: { '@type': 'Course', name: course.title, url: `https://edunode.org/masterclasses/${course.slug}` },
  };
  return (
    <MasterclassShell>
      <PageMeta title={`${metadata.title} | ${course.shortTitle} | EduNode`} description={metadata.summary} path={path} />
      <Helmet>
        {isFree ? <script type="application/ld+json">{JSON.stringify(lessonLd)}</script> : <meta name="robots" content="noindex,follow" />}
      </Helmet>
      <main className="mc-container mc-lesson-page" style={{ '--mc-accent': course.color }}>
        <nav className="mc-breadcrumbs" aria-label="Breadcrumb"><Link to="/masterclasses">Masterclasses</Link><span>/</span><Link to={`/masterclasses/${course.slug}`}>{course.shortTitle}</Link><span>/</span><span>Lesson {lessonIndex + 1}</span></nav>
        <div className="mc-reader-layout">
          <aside className="mc-lesson-sidebar">
            <Link className="mc-sidebar-title" to={`/masterclasses/${course.slug}`}>{course.shortTitle}</Link>
            <p className="mc-small">{completed.length} of 10 lessons completed</p>
            <progress max="10" value={completed.length} aria-label="Masterclass completion" />
            <nav aria-label="Masterclass lessons">
              {course.lessons.map((item, index) => (
                <Link key={item.slug} to={lessonPath(course, item)} aria-current={index === lessonIndex ? 'page' : undefined} className={index === lessonIndex ? 'active' : ''}><span>{completed.includes(item.slug) ? <CheckCircleOutline fontSize="inherit" /> : String(index + 1).padStart(2, '0')}</span><span>{item.title}<small>{index < FREE_LESSON_COUNT ? 'Free' : 'Pro'}</small></span></Link>
              ))}
            </nav>
            <p className="mc-small">Progress is saved in this browser.</p>
          </aside>
          <article className="mc-lesson-content">
            <header><p className="mc-eyebrow">LESSON {lessonIndex + 1} OF 10 <span className={`mc-badge ${isFree ? '' : 'mc-pro-badge'}`}>{isFree ? 'FREE' : 'PRO'}</span></p><h1>{metadata.title}</h1><p className="mc-lead">{metadata.summary}</p></header>
            {state === 'loading' && <div className="mc-loading" role="status"><span className="mc-spinner" />Verifying membership and loading your lesson…</div>}
            {!['ready', 'loading'].includes(state) && <AccessPanel state={state} retry={() => setAttempt((value) => value + 1)} returnTo={path} />}
            {lesson && (
              <>
                <section className="mc-objectives"><h2>By the end of this lesson</h2><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section>
                {lesson.sections.map((section) => (
                  <section className="mc-lesson-section" key={section.title}><h2>{section.title}</h2><p>{section.text}</p>{section.code && <CodeExample code={section.code} language={section.language} />}</section>
                ))}
                <section className="mc-exercise"><p className="mc-eyebrow">PUT IT INTO PRACTICE</p><h2>{lesson.exercise.title}</h2><ol>{lesson.exercise.instructions.map((step) => <li key={step}>{step}</li>)}</ol><details><summary>Compare with the suggested solution</summary><p>{lesson.exercise.solution}</p></details></section>
                <KnowledgeCheck quiz={lesson.quiz} complete={completed.includes(metadata.slug)} onComplete={markComplete} />
                {storageError && <p className="mc-notice" role="status">Your progress is updated for this visit, but browser storage is unavailable. It may not persist after you leave.</p>}
                {completed.length === course.lessons.length && <section className="mc-completion" role="status"><CheckCircleOutline /><h2>You’ve completed this masterclass.</h2><p>Review your final project against its acceptance criteria, then choose your next learning path.</p><Link to="/masterclasses" className="mc-button mc-button-primary">Explore more masterclasses</Link></section>}
              </>
            )}
            <nav className="mc-lesson-navigation" aria-label="Previous and next lesson">
              {lessonIndex > 0 ? <Link to={lessonPath(course, course.lessons[lessonIndex - 1])}><ArrowBack fontSize="small" /><span><small>Previous lesson</small>{course.lessons[lessonIndex - 1].title}</span></Link> : <Link to={`/masterclasses/${course.slug}`}><ArrowBack fontSize="small" />Course overview</Link>}
              {lessonIndex < course.lessons.length - 1 ? <Link to={lessonPath(course, course.lessons[lessonIndex + 1])}><span><small>{lessonIndex + 1 >= FREE_LESSON_COUNT ? 'Next · Pro lesson' : 'Next · Free lesson'}</small>{course.lessons[lessonIndex + 1].title}</span><ArrowForward fontSize="small" /></Link> : <Link to="/masterclasses">Explore masterclasses <ArrowForward fontSize="small" /></Link>}
            </nav>
          </article>
        </div>
      </main>
    </MasterclassShell>
  );
}

export default function MasterclassLesson() {
  const { slug, lessonSlug } = useParams();
  const course = catalog.find((item) => item.slug === slug);
  const lessonIndex = course ? course.lessons.findIndex((item) => item.slug === lessonSlug) : -1;
  if (!course || lessonIndex < 0) return <Navigate to="/404" replace />;
  return <LessonReader key={`${slug}/${lessonSlug}`} course={course} lessonIndex={lessonIndex} />;
}
