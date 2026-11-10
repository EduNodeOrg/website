import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { fetchPosts, authorHandle, authorUrl, journalUrl, stripHtml, ORIGIN } from './journalUtils';
import { PageContainer, Content, Eyebrow, PageTitle, Lead, PostCard, PostTitle, PostExcerpt, PostMeta, BackLink } from './journalStyles';

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
    <PageContainer>
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
      <Content>
        <Eyebrow component="p">JOURNAL AUTHOR</Eyebrow>
        <PageTitle component="h1">@{handle}</PageTitle>
        <Lead component="p">{posts ? `${posts.length} post${posts.length === 1 ? '' : 's'} published` : 'Loading…'}</Lead>
        {(posts || []).map((p) => (
          <PostCard key={p._id}>
            <PostTitle component="h2"><Link to={journalUrl(p)}>{p.title}</Link></PostTitle>
            <PostExcerpt component="p">{stripHtml(p.description).slice(0, 160)}</PostExcerpt>
            <PostMeta>{p.date ? new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</PostMeta>
          </PostCard>
        ))}
        {posts && posts.length === 0 && <Lead component="p">No posts by this author yet.</Lead>}
        <p style={{ marginTop: 24 }}><BackLink to="/journal">← All journal posts</BackLink></p>
      </Content>
      <Footer />
    </PageContainer>
  );
}
