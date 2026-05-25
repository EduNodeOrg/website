import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
//import { Redirect, BrowserRouter } from "react-router-dom";

const API_URL = 'https://edunode.herokuapp.com/api';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      'Up to 1 User',
      'Access to FREE educational content and courses',
      'Email support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
    buttonLink: "/"
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '6.99',
    description: [
      'All of Free tier features',
      'NFT certification for course completion',
      'Priority email support',
      'Exclusive Discord Role',
      'Advanced course materials',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'contained',
    buttonLink: "/membership/checkout"
  },
  {
    title: 'Enterprise',
    subheader: 'Custom solution',
    price: 'Custom',
    description: [
      'Tailored courses for employees',
      'Custom NFT certification',
      'Help center access',
      'Phone & email priority support',
      'Dedicated account manager',
      'Custom integrations',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outlined',
    buttonLink: 'mailto:hi@ogtechnologies.co?subject=Enterprise Membership Inquiry'
  },
];

// const footers = [
//   {
//     title: 'Company',
//     description: ['Team', 'History', 'Contact us', 'Locations'],
//   },
//   {
//     title: 'Features',
//     description: [
//       'Cool stuff',
//       'Random feature',
//       'Team feature',
//       'Developer stuff',
//       'Another one',
//     ],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   {
//     title: 'Legal',
//     description: ['Privacy policy', 'Terms of use'],
//   },
// ];

const CheckoutButton = () => {
  // Legacy - replaced by handleStripeCheckout in PricingContent
}

const PricingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(123, 47, 247, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const PricingCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(123, 47, 247, 0.3)',
    borderColor: 'rgba(123, 47, 247, 0.4)',
  },
}));

function PricingContent() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleStripeCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

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
        const text = await response.text();
        console.error('Backend error response:', text);
        console.error('Response status:', response.status);
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
        throw new Error(data.message || data.msg || data.error || `Failed to create checkout session (${response.status})`);
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('Stripe checkout error:', err);
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <PricingContainer>
        <ContentContainer maxWidth="md" component="main">
          <SectionTitle
            component="h1"
            variant="h3"
            gutterBottom
          >
            Memberships
          </SectionTitle>
          <Typography variant="h6" align="center" color="rgba(255, 255, 255, 0.8)" component="p" sx={{ mb: 6 }}>
            Choose the perfect plan for your learning journey. Start free, upgrade when you're ready.
          </Typography>
          
          <Grid container spacing={4} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <PricingCard>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ 
                      align: 'center',
                      fontWeight: tier.title === 'Pro' ? 'bold' : 'normal',
                      color: 'white',
                    }}
                    action={tier.title === 'Pro' ? <StarIcon sx={{ color: '#00d4ff' }} /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                      color: tier.title === 'Pro' ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)',
                    }}
                    sx={{
                      backgroundColor: tier.title === 'Pro'
                        ? 'rgba(123, 47, 247, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                      borderBottom: '1px solid rgba(123, 47, 247, 0.2)',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, color: 'white' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 3,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="white" fontWeight="bold">
                        {tier.price === 'Custom' ? 'Custom' : `€${tier.price}`}
                      </Typography>
                      {tier.price !== 'Custom' && (
                        <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" sx={{ ml: 1 }}>
                          /mo
                        </Typography>
                      )}
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                          sx={{ 
                            mb: 1.5,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '0.95rem',
                          }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions sx={{ p: 3 }}>
                    <Button
                      {...(tier.title === 'Pro'
                        ? { onClick: handleStripeCheckout }
                        : { href: tier.buttonLink }
                      )}
                      fullWidth
                      variant={tier.buttonVariant}
                      size="large"
                      sx={{
                        py: 2,
                        fontWeight: tier.title === 'Pro' ? 'bold' : 'normal',
                        background: tier.title === 'Pro' 
                          ? 'linear-gradient(45deg, #00d4ff, #7b2ff7)'
                          : 'transparent',
                        border: tier.title === 'Pro' 
                          ? 'none'
                          : '1px solid rgba(123, 47, 247, 0.5)',
                        color: tier.title === 'Pro' ? 'white' : '#00d4ff',
                        '&:hover': {
                          background: tier.title === 'Pro'
                            ? 'linear-gradient(45deg, #00b8e6, #6b2fd6)'
                            : 'rgba(123, 47, 247, 0.1)',
                          transform: 'scale(1.02)',
                        },
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </PricingCard>
              </Grid>
            ))}
          </Grid>
        </ContentContainer>
      </PricingContainer>
      <Footer />
    </>
  );
}

export default function Pricing() {
  return <PricingContent />;
}