import React, { Component } from 'react';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../NavBar';
import CookieSettingsButton from '../CookieConsent/CookieSettingsButton';

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
  '& h2': {
    color: '#00d4ff',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1.5),
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  '& p': {
    color: '#b8c5d6',
    lineHeight: 1.7,
    marginBottom: theme.spacing(2),
  },
  '& a': {
    color: '#00d4ff',
    textDecoration: 'underline',
  },
}));

export default class Privacy extends Component {
  render() {
    return (
      <div>
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
              Privacy Policy
            </Typography>

            <ContentCard elevation={0}>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                At edunode.org, we are committed to protecting your privacy. We use the information we collect about you to provide a better, more personalized service. This policy explains what information we collect and how we use it.
              </Typography>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

              <Typography component="h2" variant="h5">
                Information We Collect
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone number, or credit card information. You may, however, visit our site anonymously.
              </Typography>

              <Typography component="h2" variant="h5">
                How We Use Your Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                We use the information we collect from you to process orders, provide a better shopping experience, and communicate with you about products, services, and promotions. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
              </Typography>

              <Typography component="h2" variant="h5">
                How We Protect Your Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.
              </Typography>

              <Typography component="h2" variant="h5">
                Cookies
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits.
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                <strong style={{ color: '#e2e8f0' }}>Necessary cookies</strong> — Always active. Required for the site to function, including session management, authentication, and security.
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                <strong style={{ color: '#e2e8f0' }}>Analytics cookies</strong> — Help us understand how visitors interact with our site. Only enabled with your explicit consent.
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                <strong style={{ color: '#e2e8f0' }}>Marketing cookies</strong> — Used to deliver personalized ads and content. Only enabled with your explicit consent.
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                You can change or withdraw your consent at any time by clicking <CookieSettingsButton style={{ color: '#00d4ff' }} />. Your preferences are stored for up to 6 months.
              </Typography>

              <Typography component="h2" variant="h5">
                Changes to Our Privacy Policy
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                If we decide to change our privacy policy, we will post those changes on this page.
              </Typography>

              <Typography component="h2" variant="h5">
                Contacting Us
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
                If you have any questions about this privacy policy, you can contact us at <a href="mailto:hi@edunode.org">hi@edunode.org</a>.
              </Typography>
            </ContentCard>
          </Container>
        </PageContainer>
      </div>
    );
  }
}
