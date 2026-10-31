import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { fetchPosts, authorHandle, authorUrl, journalUrl, parseTags, stripHtml, tagSlug, ORIGIN } from './journalUtils';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

export default function TagPage() {
  const { tag } = useParams();
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    window.prerenderReady = false;
    fetchPosts()
      .then((all) => setPosts(all.filter((p) => parseTags(p.tags).some((t) => tagSlug(t) === tag))))
      .catch(() => setPosts([]))
      .finally(() => { window.prerenderReady = true; });
  }, [tag]);

  const title = `#${tag} | EduNode Journal`;
  const canonUrl = `${ORIGIN}/t/${tag}`;
  const desc = `Articles tagged #${tag} on EduNode Journal — community Web3 and developer content.`;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonUrl };

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
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px', color: '#1a1a2e' }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '2px', color: '#7b2ff7', fontWeight: 700 }}>TAG</p>
        <h1>#{tag}</h1>
        {(posts || []).map((p) => (
          <article key={p._id} style={{ borderBottom: '1px solid #eee', padding: '18px 0' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
              <Link to={journalUrl(p)} style={{ color: '#1a1a2e' }}>{p.title}</Link>
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{stripHtml(p.description).slice(0, 160)}</p>
            <small style={{ color: '#999' }}>by <Link to={authorUrl(p.email)}>@{authorHandle(p.email)}</Link></small>
          </article>
        ))}
        {posts && posts.length === 0 && <p>No posts tagged #{tag} yet.</p>}
        <p style={{ marginTop: 24 }}><Link to="/journal">← All journal posts</Link></p>
      </main>
          <Footer />
    </>
  );
}
