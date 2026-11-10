// Shared dark-theme styling for Journal pages — matches the glossary/topic hubs.
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: '48px',
});

export const Content = styled('main')({
  maxWidth: 860,
  margin: '0 auto',
  padding: '56px 20px 24px',
});

export const Eyebrow = styled(Typography)({
  fontSize: '0.85rem',
  letterSpacing: '3px',
  color: '#00d4ff',
  fontWeight: 700,
  marginBottom: '8px',
});

export const PageTitle = styled(Typography)({
  fontSize: '2.2rem',
  fontWeight: 800,
  marginBottom: '12px',
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const Lead = styled(Typography)({
  color: '#b8c5d6',
  fontSize: '1.05rem',
  marginBottom: '28px',
});

export const PostCard = styled('article')({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '14px',
  padding: '22px 24px',
  marginBottom: '16px',
  transition: 'border-color 0.2s ease, transform 0.2s ease',
  '&:hover': { borderColor: 'rgba(0, 212, 255, 0.4)', transform: 'translateY(-2px)' },
});

export const PostTitle = styled(Typography)({
  fontSize: '1.3rem',
  fontWeight: 700,
  marginBottom: '8px',
  '& a': { color: '#ffffff', textDecoration: 'none' },
  '& a:hover': { color: '#00d4ff' },
});

export const PostExcerpt = styled(Typography)({
  color: '#b8c5d6',
  fontSize: '0.95rem',
  lineHeight: 1.6,
  marginBottom: '10px',
});

export const PostMeta = styled('small')({
  color: '#8a97ab',
  fontSize: '0.85rem',
  '& a': { color: '#00d4ff', textDecoration: 'none' },
  '& a:hover': { textDecoration: 'underline' },
});

export const BackLink = styled(Link)({
  color: '#00d4ff',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
});
