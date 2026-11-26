import React from "react";
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar";
import Footer from '../Footer/Footer';
import PageMeta from "../PageMeta";
import JsonLd from '../JsonLd';
import { aboutUs } from './config';
import profilePicImg from '../Blog/mepic.png';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

const ContentCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(5),
  color: '#ffffff',
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  '&:last-child': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(0.5),
  },
}));

const SectionHeading = styled(Typography)(() => ({
  color: '#00d4ff',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  marginBottom: '14px',
}));

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'EduNode',
  url: 'https://edunode.org',
  email: 'hi@edunode.org',
  founder: { '@id': 'https://edunode.org/about#founder' },
  parentOrganization: {
    '@type': 'Organization',
    name: 'OG Technologies EU',
    url: 'https://www.ogtechnologies.co/',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Widerhofergasse 6',
    addressLocality: 'Vienna',
    postalCode: '1090',
    addressCountry: 'AT',
  },
};

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://edunode.org/about#founder',
  name: 'Olvis E. Gil Rios',
  jobTitle: 'Founder & Lead Curriculum Architect',
  worksFor: [
    { '@type': 'Organization', name: 'EduNode', url: 'https://edunode.org' },
    { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
  ],
  knowsAbout: [
    'Blockchain development', 'Stellar', 'Soroban', 'Ethereum', 'Tokenization',
    'Digital payments', 'ISO 20022', 'Cybersecurity', 'AI assistants',
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Vienna', addressCountry: 'AT' },
};

function AboutUs() {
  return (
    <>
      <PageMeta
        title="About EduNode — Who Writes and Reviews the Courses"
        description="EduNode is built in Vienna by Olvis E. Gil Rios — founder of OG Technologies EU — who writes and reviews every course. Read our editorial policy and credentials."
        path="/about"
      />
      <JsonLd data={orgLd} />
      <JsonLd data={personLd} />
      <NavBar />
      <PageContainer>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 4,
              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold',
            }}
          >
            About Us
          </Typography>

          <ContentCard elevation={0} id="founder" sx={{ mb: 4 }}>
            <SectionHeading component="h2">Founder &amp; Lead Curriculum Architect</SectionHeading>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Box
                component="img"
                src={profilePicImg}
                alt="Olvis E. Gil Rios, founder of EduNode"
                sx={{ width: 96, height: 96, borderRadius: '50%', border: '3px solid rgba(0,212,255,0.5)', objectFit: 'cover' }}
              />
              <Box sx={{ flex: 1, minWidth: 260 }}>
                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Olvis E. Gil Rios
                </Typography>
                <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.75, mt: 1 }}>
                  Founder of EduNode and of{' '}
                  <a href="https://www.ogtechnologies.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>
                    OG Technologies EU
                  </a>
                  , a Vienna-based consultancy for blockchain payments, tokenization,
                  digital identity, cybersecurity, and ISO 20022; also founder of{' '}
                  <a href="https://www.mozartpay.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>
                    MozartPay
                  </a>
                  . Olvis writes and reviews every EduNode course, masterclass, and guide —
                  from Stellar, Soroban and Ethereum development to Rust, Python, AI
                  assistants, and smart contract auditing.
                </Typography>
              </Box>
            </Box>
          </ContentCard>

          <ContentCard elevation={0} sx={{ mb: 4 }}>
            <SectionHeading component="h2">Editorial &amp; Curriculum Review Policy</SectionHeading>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.75, mb: 2 }}>
              EduNode content is practitioner-authored: every lesson, exercise and guide is
              written and reviewed by the founder against live networks, official documentation
              and current tooling — then updated when protocols ship breaking changes.
            </Typography>
            <Box component="ul" sx={{ color: '#b8c5d6', lineHeight: 1.9, pl: 3, m: 0 }}>
              <li>Tutorials are tested against real testnets, SDKs and toolchains before publication.</li>
              <li>Articles are dated and revised when the underlying technology changes.</li>
              <li>No paid placements or token promotions — comparisons state where competitors genuinely win.</li>
              <li>Certificates attest course completion only; they are verifiable but not accredited degrees.</li>
            </Box>
          </ContentCard>

          <ContentCard elevation={0}>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 3, textAlign: 'center' }}>
              {aboutUs.description}
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

            <InfoRow>
              <Typography variant="subtitle1" sx={{ color: '#00d4ff', fontWeight: 600 }}>
                Represented by
              </Typography>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>
                {aboutUs.representedBy}
              </Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="subtitle1" sx={{ color: '#00d4ff', fontWeight: 600 }}>
                Website
              </Typography>
              <Typography
                component="a"
                href={aboutUs.website}
                variant="body1"
                sx={{ color: '#00d4ff', textDecoration: 'underline' }}
              >
                {aboutUs.website}
              </Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="subtitle1" sx={{ color: '#00d4ff', fontWeight: 600 }}>
                Address
              </Typography>
              <Typography variant="body1" sx={{ color: '#ffffff', textAlign: 'right' }}>
                {aboutUs.address}
              </Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="subtitle1" sx={{ color: '#00d4ff', fontWeight: 600 }}>
                Email
              </Typography>
              <Typography
                component="a"
                href={`mailto:${aboutUs.email}`}
                variant="body1"
                sx={{ color: '#00d4ff', textDecoration: 'underline' }}
              >
                {aboutUs.email}
              </Typography>
            </InfoRow>

            <InfoRow>
              <Typography variant="subtitle1" sx={{ color: '#00d4ff', fontWeight: 600 }}>
                Business Type
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', textAlign: 'right', maxWidth: '60%' }}>
                {aboutUs.businessType}
              </Typography>
            </InfoRow>
          </ContentCard>

          <Typography variant="body2" sx={{ color: '#8fa3bf', textAlign: 'center', mt: 4 }}>
            See also: <Link to="/about-certificates" style={{ color: '#00d4ff' }}>how certificates work</Link>
            {' · '}<Link to="/alternatives" style={{ color: '#00d4ff' }}>how EduNode compares</Link>
            {' · '}<Link to="/pricing" style={{ color: '#00d4ff' }}>membership plans</Link>
          </Typography>
        </Container>
      </PageContainer>
      <Footer />
    </>
  );
}
export default AboutUs;