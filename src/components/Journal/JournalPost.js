import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import ArticleLayout, { articleStyles as s } from '../Blog/Articles/ArticleLayout';
import { fetchPost, journalAbs, authorHandle, authorUrl, parseTags, parseComments, stripHtml, ORIGIN } from './journalUtils';
import { linkGlossary } from './glossaryLink';

export default function JournalPost() {
  const { author, postSlug: slugParam } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const idMatch = (slugParam || '').match(/([a-f0-9]{24})$/);
  const id = idMatch && idMatch[1];

  useEffect(() => {
    window.prerenderReady = false;
    if (!id) {
      setError(true);
      window.prerenderReady = true;
      return;
    }
    fetchPost(id)
      .then((d) => setPost(d || {}))
      .catch(() => setError(true))
      .finally(() => { window.prerenderReady = true; });
  }, [id]);

  const accent = 'linear-gradient(135deg,#0a0e27 0%,#1a1f3a 55%,#7b2ff7 100%)';
  const color = '#7b2ff7';
  const title = post && post.title ? `${post.title} | EduNode Journal` : 'Journal | EduNode';
  const url = post ? journalAbs(post) : `${ORIGIN}/journal`;
  const desc = post && post.description ? stripHtml(post.description).slice(0, 160) : 'Community-written articles on Web3, Stellar, and developer topics.';
  const tags = post ? parseTags(post.tags) : [];
  const comments = post ? parseComments(post.comments) : [];
  const handle = post ? authorHandle(post.email) : (author || '').replace(/^@/, '');

  const articleLd = post && post.title ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: desc,
    url,
    datePublished: post.date,
    author: { '@type': 'Person', name: handle === 'anonymous' ? 'EduNode Community' : handle, url: `${ORIGIN}${authorUrl(post.email)}` },
    publisher: { '@type': 'Organization', name: 'EduNode', url: ORIGIN },
    mainEntityOfPage: url,
    keywords: tags.join(', '),
  } : null;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={desc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={(post && post.image) || 'https://edunode.org/en.png'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        {articleLd && <script type="application/ld+json">{JSON.stringify(articleLd)}</script>}
      </Helmet>
      <ArticleLayout
        accent={accent}
        color={color}
        heroText="EduNode Journal — articles by builders, for builders"
        tag={tags.join(' · ') || 'Journal'}
        title={post ? post.title : (error ? 'Post not found' : 'Loading…')}
        date={post && post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
        readTime="Community post"
        shareUrl={url}
        shareTitle={post ? post.title : 'EduNode Journal'}
      >
        {post && post.image ? <img src={post.image} alt={post.title} style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: 20 }} /> : null}
        {post ? (
          <div dangerouslySetInnerHTML={{ __html: linkGlossary(post.description) }} />
        ) : (
          <p>{error ? 'This journal post could not be found.' : 'Loading the article…'}</p>
        )}
        {post && post.link ? (
          <p><a href={post.link} target="_blank" rel="noopener noreferrer">Original source / reference →</a></p>
        ) : null}
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>About the author</h4>
        <p>
          Posted by <Link to={authorUrl(post ? post.email : '')} style={{ color }}>@{handle}</Link>
          {tags.map((t) => (
            <span key={t}> · <Link to={`/t/${t.toLowerCase()}`} style={{ color }}>#{t}</Link></span>
          ))}
        </p>
        {comments.length > 0 && (
          <>
            <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Discussion ({comments.length})</h4>
            {comments.slice(0, 10).map((c, i) => (
              <p key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                <strong>@{authorHandle(c.email)}</strong>: {c.text}
              </p>
            ))}
          </>
        )}
        <h4 style={{ ...s.h4, borderBottom: `3px solid ${color}` }}>Keep learning</h4>
        <p>
          <Link to="/journal" style={{ color }}>All journal posts</Link> ·{' '}
          <Link to="/glossary" style={{ color }}>Glossary</Link> ·{' '}
          <Link to="/masterclasses" style={{ color }}>Masterclasses</Link> ·{' '}
          <Link to="/stellar" style={{ color }}>Stellar hub</Link>
        </p>
      </ArticleLayout>
    </>
  );
}
