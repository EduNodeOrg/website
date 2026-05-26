import React from "react";
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar";
import { aboutUs } from './config';

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

function AboutUs() {
  return (
    <>
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
        </Container>
      </PageContainer>
    </>
  );
}
export default AboutUs;