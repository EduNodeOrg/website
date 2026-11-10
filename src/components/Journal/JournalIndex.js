import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { fetchPosts, authorHandle, authorUrl, journalUrl, parseTags, stripHtml, ORIGIN } from './journalUtils';
import { PageContainer, Content, Eyebrow, PageTitle, Lead, PostCard, PostTitle, PostExcerpt, PostMeta } from './journalStyles';

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
    <PageContainer>
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
      <Content>
        <Eyebrow component="p">EDUNODE JOURNAL</Eyebrow>
        <PageTitle component="h1">Articles by builders, for builders</PageTitle>
        <Lead component="p">Community journals on Web3, Stellar, and software — every post links into our courses, masterclasses, and glossary.</Lead>
        {(posts || []).map((p) => (
          <PostCard key={p._id}>
            <PostTitle component="h2"><Link to={journalUrl(p)}>{p.title}</Link></PostTitle>
            <PostExcerpt component="p">{stripHtml(p.description).slice(0, 160)}</PostExcerpt>
            <PostMeta>
              by <Link to={authorUrl(p.email)}>@{authorHandle(p.email)}</Link>
              {p.date ? ` · ${new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}` : ''}
              {parseTags(p.tags).map((t) => (
                <span key={t}> · <Link to={`/t/${t.toLowerCase()}`}>#{t}</Link></span>
              ))}
            </PostMeta>
          </PostCard>
        ))}
        {posts && posts.length === 0 && <Lead component="p">No posts yet — be the first to publish.</Lead>}
      </Content>
      <Footer />
    </PageContainer>
  );
}
