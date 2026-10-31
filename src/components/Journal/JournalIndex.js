import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchPosts, authorHandle, authorUrl, journalUrl, parseTags, stripHtml, ORIGIN } from './journalUtils';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

export default function JournalIndex() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    window.prerenderReady = false;
    fetchPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => { window.prerenderReady = true; });
  }, []);

  const title = 'EduNode Journal — Web3, Stellar & Developer Articles by Builders';
  const desc = 'Community-written journals on Stellar, Soroban, Web3 development, and software — connected to courses, masterclasses, and the glossary.';
  const url = `${ORIGIN}/journal`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: desc,
    url,
  };

  return (
    <>
      <NavBar />
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://edunode.org/en.png" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px', color: '#1a1a2e' }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '2px', color: '#7b2ff7', fontWeight: 700 }}>EDUNODE JOURNAL</p>
        <h1>Articles by builders, for builders</h1>
        <p style={{ color: '#555' }}>Community journals on Web3, Stellar, and software — every post links into our courses, masterclasses, and glossary.</p>
        {(posts || []).map((p) => (
          <article key={p._id} style={{ borderBottom: '1px solid #eee', padding: '18px 0' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
              <Link to={journalUrl(p)} style={{ color: '#1a1a2e' }}>{p.title}</Link>
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{stripHtml(p.description).slice(0, 160)}</p>
            <small style={{ color: '#999' }}>
              by <Link to={authorUrl(p.email)}>@{authorHandle(p.email)}</Link>
              {parseTags(p.tags).map((t) => (
                <span key={t}> · <Link to={`/t/${t.toLowerCase()}`}>#{t}</Link></span>
              ))}
            </small>
          </article>
        ))}
        {posts && posts.length === 0 && <p>No posts yet — be the first to publish.</p>}
      </main>
          <Footer />
    </>
  );
}
