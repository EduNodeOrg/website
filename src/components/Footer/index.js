import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled('footer')(({ theme }) => ({
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)',
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  padding: theme.spacing(6, 0, 4),
  color: '#b8c5d6',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#b8c5d6',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#00d4ff',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const FooterSectionTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.95rem',
  marginBottom: theme.spacing(1),
}));

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          <FooterSection>
            <FooterSectionTitle>EduNode</FooterSectionTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/milestones">Milestones</FooterLink>
            <FooterLink href="/contactus">Contact Us</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Learn</FooterSectionTitle>
            <FooterLink href="/courses">Courses</FooterLink>
            <FooterLink href="/resources">Resources</FooterLink>
            <FooterLink href="/challenges">Challenges</FooterLink>
            <FooterLink href="/glossary">Glossary</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Community</FooterSectionTitle>
            <FooterLink href="/community">Community</FooterLink>
            <FooterLink href="/feed">Feed</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="https://discord.gg/p9cRmdz8jr" target="_blank" rel="noopener">Discord</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Legal</FooterSectionTitle>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/membership">Membership</FooterLink>
          </FooterSection>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 3 }} />

        <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          Copyright © {new Date().getFullYear()} OG Technologies EU. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
}

export default Footer;