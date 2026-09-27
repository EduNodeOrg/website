import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Chip, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import releases from '../../data/releases';
import './releases.css';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const ReleaseCard = styled(Paper)({
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  color: '#b8c5d6',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(123, 47, 247, 0.2)',
  },
});

export default function Releases() {
  return (
    <>
      <Helmet>
        <title>Releases &amp; Changelog | EduNode</title>
        <link rel="canonical" href="https://edunode.org/releases" />
        <meta
          name="description"
          content="EduNode release notes — new courses, features, and platform updates for the Web3 learning platform."
        />
        <meta property="og:title" content="EduNode Releases" />
        <meta property="og:description" content="Release notes and changelog for the EduNode Web3 learning platform." />
        <meta property="og:url" content="https://edunode.org/releases" />
      </Helmet>
      <NavBar />
      <PageContainer>
        <main>
          <Box sx={{ pt: 8, pb: 4, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <SectionTitle variant="h3" component="h1">
                Releases
              </SectionTitle>
              <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                What&apos;s new on EduNode — features, courses, and fixes, newest first.
              </Typography>
            </Container>
          </Box>

          <Container maxWidth="md" sx={{ pb: 10 }}>
            <div className="releases-timeline">
              {releases.map((release, i) => (
                <ReleaseCard key={`${release.version}-${release.date}`} elevation={0}>
                  <div className="release-header">
                    <Chip
                      label={`v${release.version}`}
                      size="small"
                      sx={i === 0
                        ? {
                            background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                            color: '#ffffff',
                            fontWeight: 'bold',
                          }
                        : {
                            color: '#00d4ff',
                            borderColor: 'rgba(0, 212, 255, 0.4)',
                            background: 'rgba(0, 212, 255, 0.08)',
                          }
                      }
                      variant={i === 0 ? 'filled' : 'outlined'}
                    />
                    <Typography variant="h6" component="h2" className="release-title">
                      {release.title}
                    </Typography>
                    <Typography variant="caption" className="release-date">
                      {release.date}
                    </Typography>
                  </div>
                  <ul className="release-highlights">
                    {release.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </ReleaseCard>
              ))}
            </div>

            <Typography variant="body2" className="releases-footer-note">
              Follow development on{' '}
              <a href="https://github.com/EduNodeOrg" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{' '}
              or see the <Link to="/milestones">project milestones</Link>.
            </Typography>
          </Container>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
}
