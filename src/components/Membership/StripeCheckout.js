import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

const API_URL = 'https://edunode.herokuapp.com/api';

const CheckoutContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  color: 'white',
  padding: '2rem',
});

export default function StripeCheckout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const createCheckoutSession = async () => {
      try {
        const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({
            successUrl: `${window.location.origin}/membership/success`,
            cancelUrl: `${window.location.origin}/pricing`,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to create checkout session');
        }

        const { url } = await response.json();
        window.location.href = url;
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, [isAuthenticated, token, navigate]);

  if (error) {
    return (
      <>
        <NavBar />
        <CheckoutContainer>
          <Typography variant="h5" gutterBottom>
            Checkout Error
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/pricing')}
            sx={{
              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
              '&:hover': { background: 'linear-gradient(45deg, #00b8e6, #6b2fd6)' },
            }}
          >
            Back to Pricing
          </Button>
        </CheckoutContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <CheckoutContainer>
        <CircularProgress sx={{ color: '#00d4ff', mb: 3 }} />
        <Typography variant="h6">
          Redirecting to checkout...
        </Typography>
      </CheckoutContainer>
      <Footer />
    </>
  );
}
