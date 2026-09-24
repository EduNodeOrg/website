import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import releases from '../../data/releases';
import './releases.css';

export default function Releases() {
  return (
    <>
      <Helmet>
        <title>Releases &amp; Changelog | EduNode</title>
        <meta
          name="description"
          content="EduNode release notes — new courses, features, and platform updates for the Web3 learning platform."
        />
        <meta property="og:title" content="EduNode Releases" />
        <meta property="og:description" content="Release notes and changelog for the EduNode Web3 learning platform." />
        <meta property="og:url" content="https://edunode.org/releases" />
      </Helmet>
      <NavBar />
      <Container maxWidth="md" className="releases-page">
        <Typography variant="h3" component="h1" gutterBottom>
          Releases
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          What&apos;s new on EduNode — features, courses, and fixes, newest first.
        </Typography>

        <div className="releases-timeline">
          {releases.map((release, i) => (
            <Paper key={release.version} elevation={2} className="release-card">
              <div className="release-header">
                <Chip
                  label={`v${release.version}`}
                  color="primary"
                  variant={i === 0 ? 'filled' : 'outlined'}
                  size="small"
                />
                <Typography variant="h6" component="h2" className="release-title">
                  {release.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" className="release-date">
                  {release.date}
                </Typography>
              </div>
              <ul className="release-highlights">
                {release.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </Paper>
          ))}
        </div>

        <Typography variant="body2" color="text.secondary" className="releases-footer-note">
          Follow development on{' '}
          <a href="https://github.com/EduNodeOrg" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          or see the <Link to="/milestones">project milestones</Link>.
        </Typography>
      </Container>
      <Footer />
    </>
  );
}
