import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { fetchPosts, authorHandle, authorUrl, journalUrl, stripHtml, ORIGIN } from './journalUtils';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

export default function JournalAuthor() {
  const { author } = useParams();
  const handle = (author || '').replace(/^@/, '');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    window.prerenderReady = false;
    fetchPosts()
      .then((all) => setPosts(all.filter((p) => authorHandle(p.email) === handle)))
      .catch(() => setPosts([]))
      .finally(() => { window.prerenderReady = true; });
  }, [handle]);

  const title = `@${handle} | EduNode Journal`;
  const url = `${ORIGIN}${authorUrl('')}${handle === 'anonymous' ? '' : ''}`.replace('anonymous', handle);
  const canonUrl = `${ORIGIN}/journal/@${handle}`;
  const desc = `Articles by @${handle} on EduNode Journal — Web3, Stellar, and developer topics.`;
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: handle === 'anonymous' ? 'EduNode Community' : `@${handle}`,
    url: canonUrl,
    description: desc,
  };

  return (
    <>
      <NavBar />
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonUrl} />
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonUrl} />
        <meta property="og:image" content="https://edunode.org/en.png" />
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      </Helmet>
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px', color: '#1a1a2e' }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '2px', color: '#7b2ff7', fontWeight: 700 }}>JOURNAL AUTHOR</p>
        <h1>@{handle}</h1>
        <p style={{ color: '#555' }}>{posts ? `${posts.length} post${posts.length === 1 ? '' : 's'} published` : 'Loading…'}</p>
        {(posts || []).map((p) => (
          <article key={p._id} style={{ borderBottom: '1px solid #eee', padding: '18px 0' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
              <Link to={journalUrl(p)} style={{ color: '#1a1a2e' }}>{p.title}</Link>
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{stripHtml(p.description).slice(0, 160)}</p>
            <small style={{ color: '#999' }}>{p.date ? new Date(p.date).toLocaleDateString() : ''}</small>
          </article>
        ))}
        {posts && posts.length === 0 && <p>No posts by this author yet.</p>}
        <p style={{ marginTop: 24 }}><Link to="/journal">← All journal posts</Link></p>
      </main>
          <Footer />
    </>
  );
}
