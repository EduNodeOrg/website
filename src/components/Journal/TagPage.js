import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { fetchPosts, authorHandle, authorUrl, journalUrl, parseTags, stripHtml, tagSlug, ORIGIN } from './journalUtils';
import { PageContainer, Content, Eyebrow, PageTitle, Lead, PostCard, PostTitle, PostExcerpt, PostMeta, BackLink } from './journalStyles';

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
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <Content>
        <Eyebrow component="p">TAG</Eyebrow>
        <PageTitle component="h1">#{tag}</PageTitle>
        {(posts || []).map((p) => (
          <PostCard key={p._id}>
            <PostTitle component="h2"><Link to={journalUrl(p)}>{p.title}</Link></PostTitle>
            <PostExcerpt component="p">{stripHtml(p.description).slice(0, 160)}</PostExcerpt>
            <PostMeta>by <Link to={authorUrl(p.email)}>@{authorHandle(p.email)}</Link></PostMeta>
          </PostCard>
        ))}
        {posts && posts.length === 0 && <Lead component="p">No posts tagged #{tag} yet.</Lead>}
        <p style={{ marginTop: 24 }}><BackLink to="/journal">← All journal posts</BackLink></p>
      </Content>
      <Footer />
    </PageContainer>
  );
}
