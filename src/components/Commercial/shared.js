import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Shared visual language for the commercial/comparison landing pages —
// same dark gradient and cyan→purple accent as Pricing and ProCourseLanding.

export const Page = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
}));

export const Wrap = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  zIndex: 1,
}));

export const Eyebrow = styled(Typography)(() => ({
  color: '#00d4ff',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  marginBottom: '12px',
}));

export const HeroTitle = styled(Typography)(() => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

export const Lead = styled(Typography)(() => ({
  color: '#b8c5d6',
  fontSize: '1.15rem',
  lineHeight: 1.7,
  maxWidth: '780px',
  marginTop: '16px',
}));

export const SectionTitle = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 'bold',
  marginTop: '56px',
  marginBottom: '16px',
}));

export const SubTitle = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 'bold',
  marginBottom: '8px',
}));

export const Para = styled(Typography)(() => ({
  color: '#b8c5d6',
  lineHeight: 1.75,
  marginBottom: '16px',
}));

export const Card = styled(Box)(() => ({
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  padding: '24px',
  height: '100%',
}));

export const CTAButton = styled(Button)(() => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: '12px 28px',
  textTransform: 'none',
  borderRadius: '12px',
  '&:hover': { background: 'linear-gradient(45deg, #00b8e6, #6b2fd6)' },
}));

export const GhostButton = styled(Button)(() => ({
  border: '1px solid rgba(123, 47, 247, 0.5)',
  color: '#00d4ff',
  padding: '12px 28px',
  textTransform: 'none',
  borderRadius: '12px',
  '&:hover': { background: 'rgba(123, 47, 247, 0.1)' },
}));

export const BulletList = styled('ul')(() => ({
  color: '#b8c5d6',
  lineHeight: 1.8,
  paddingLeft: '22px',
  margin: '0 0 16px',
}));

export const CompareTable = styled('table')(() => ({
  width: '100%',
  borderCollapse: 'collapse',
  margin: '24px 0 32px',
  '& th, & td': {
    padding: '14px 16px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(143, 163, 191, 0.2)',
    verticalAlign: 'top',
    fontSize: '0.95rem',
    lineHeight: 1.55,
  },
  '& thead th': {
    color: '#00d4ff',
    fontWeight: 700,
    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
  },
  '& td': { color: '#b8c5d6' },
  '& td:first-of-type': { color: '#ffffff', fontWeight: 700 },
  '& td.hl, & th.hl': { background: 'rgba(0, 212, 255, 0.06)' },
}));

export const Faq = styled('details')(() => ({
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(123, 47, 247, 0.25)',
  borderRadius: '12px',
  padding: '16px 20px',
  marginBottom: '12px',
  '& summary': {
    cursor: 'pointer',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '1rem',
  },
  '& p': {
    color: '#b8c5d6',
    lineHeight: 1.7,
    margin: '12px 0 0',
  },
}));
