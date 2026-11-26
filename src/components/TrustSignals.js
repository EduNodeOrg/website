import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const TrustBar = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
  margin: '32px 0',
}));

const TrustItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '16px 18px',
  borderRadius: '14px',
  background: 'rgba(26, 31, 58, 0.75)',
  border: '1px solid rgba(123, 47, 247, 0.25)',
}));

// Compact, reusable E-E-A-T proof bar for commercial pages. Only verifiable
// facts — no invented metrics or credentials.
const ITEMS = [
  {
    icon: <BusinessOutlinedIcon sx={{ color: '#00d4ff', fontSize: 28 }} />,
    title: 'Built in the EU',
    text: 'EduNode is built by Olvis E. Gil Rios, Einzelunternehmen IT-Services — a registered sole proprietorship in Vienna, Austria (WKO).',
    link: { to: '/about', label: 'About the team' },
  },
  {
    icon: <VerifiedUserOutlinedIcon sx={{ color: '#7b2ff7', fontSize: 28 }} />,
    title: 'Practitioner-authored',
    text: 'Curriculum written and reviewed by the founder of OG Technologies EU, a Vienna blockchain, payments and cybersecurity consultancy.',
    link: { to: '/about', label: 'Editorial policy' },
  },
  {
    icon: <PlayCircleOutlineIcon sx={{ color: '#00ff88', fontSize: 28 }} />,
    title: 'Try before you pay',
    text: 'The first two lessons (20%) of every masterclass are free — no account, no credit card. See the material before you decide.',
    link: { to: '/masterclasses', label: 'Start a free lesson' },
  },
  {
    icon: <WorkspacePremiumOutlinedIcon sx={{ color: '#ffaa00', fontSize: 28 }} />,
    title: 'Verifiable certificates',
    text: 'Every completed course issues a PDF certificate with a unique number that anyone can verify online or on-chain.',
    link: { to: '/about-certificates', label: 'How certificates work' },
  },
];

export default function TrustSignals() {
  return (
    <TrustBar>
      {ITEMS.map((item) => (
        <TrustItem key={item.title}>
          {item.icon}
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 'bold', mb: 0.5 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b8c5d6', fontSize: '0.83rem', lineHeight: 1.55 }}>
              {item.text}{' '}
              <Link to={item.link.to} style={{ color: '#00d4ff', textDecoration: 'none' }}>
                {item.link.label} →
              </Link>
            </Typography>
          </Box>
        </TrustItem>
      ))}
    </TrustBar>
  );
}
