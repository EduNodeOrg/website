import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import { GLOSSARY_TERMS, slugify } from './terms';

const ORIGIN = 'https://edunode.org';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

const Card = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '28px',
  marginBottom: '20px',
  color: '#b8c5d6',
  lineHeight: 1.8,
});

const TermLink = styled(Link)({
  color: '#00d4ff',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
});

const isInternal = (href) => href.startsWith('/') || href.startsWith(ORIGIN);
const toPath = (href) => (href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) : href);

export default function GlossaryTerm() {
  const { slug } = useParams();
  const entry = GLOSSARY_TERMS.find((item) => slugify(item.term) === slug);
  if (!entry) return <Navigate to="/glossary" replace />;

  const { term, definition, about, links } = entry;
  const title = `What Is ${term}? | EduNode Glossary`;
  const url = `${ORIGIN}/glossary/${slug}`;
  const related = GLOSSARY_TERMS.filter((item) => item.term !== term).slice(0, 8);

  const termLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: about || definition,
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'EduNode Web3 & Blockchain Glossary',
      url: `${ORIGIN}/glossary`,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Glossary', item: `${ORIGIN}/glossary` },
      { '@type': 'ListItem', position: 2, name: term, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={definition} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={definition} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={definition} />
        <script type="application/ld+json">{JSON.stringify(termLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <NavBar />
      <PageContainer>
        <main>
          <Container maxWidth="md" sx={{ pt: 10, pb: 8 }}>
            <Typography sx={{ mb: 3 }}>
              <TermLink to="/glossary">Glossary</TermLink>
              <Box component="span" sx={{ color: '#5a6b85', mx: 1 }}>/</Box>
              <Box component="span" sx={{ color: '#b8c5d6' }}>{term}</Box>
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {term}
            </Typography>
            <Card>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#ffffff', mb: about ? 2 : 0 }}>
                {definition}
              </Typography>
              {about && (
                <Typography component="p" sx={{ color: '#b8c5d6' }}>
                  {about}
                </Typography>
              )}
            </Card>
            {links && links.length > 0 && (
              <Card>
                <Typography component="h2" sx={{ color: '#00d4ff', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', mb: 2 }}>
                  KEEP LEARNING
                </Typography>
                {links.map((link) => (
                  <Box key={link.href} sx={{ mb: 1 }}>
                    {isInternal(link.href) ? (
                      <TermLink to={toPath(link.href)}>{link.label} →</TermLink>
                    ) : (
                      <Box component="a" href={link.href} sx={{ color: '#00d4ff', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        {link.label} →
                      </Box>
                    )}
                  </Box>
                ))}
              </Card>
            )}
            <Card>
              <Typography component="h2" sx={{ color: '#00d4ff', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', mb: 2 }}>
                MORE TERMS
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {related.map((item) => (
                  <TermLink
                    key={item.term}
                    to={`/glossary/${slugify(item.term)}`}
                    style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.9rem' }}
                  >
                    {item.term}
                  </TermLink>
                ))}
              </Box>
            </Card>
          </Container>
        </main>
      </PageContainer>
    </>
  );
}
