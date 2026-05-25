import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

const SuccessContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  color: 'white',
  padding: '2rem',
  textAlign: 'center',
});

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <SuccessContainer>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#00d4ff', mb: 3 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Payment Successful!
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: 'rgba(255,255,255,0.7)', maxWidth: 500 }}
        >
          Welcome to EduNode Pro! Your subscription is now active. You have access to all Pro features including NFT certifications and advanced course materials.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{
            background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
            px: 4,
            py: 1.5,
            '&:hover': { background: 'linear-gradient(45deg, #00b8e6, #6b2fd6)' },
          }}
        >
          Go to Dashboard
        </Button>
      </SuccessContainer>
      <Footer />
    </>
  );
}
