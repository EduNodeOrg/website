import React from "react";
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar";

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

const TermsAndConditions = () => {
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
            Terms and Conditions
          </Typography>

          <ContentCard elevation={0}>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              Welcome to the terms and conditions of EduNode.org, an e-learning platform focused on Web3 Development (the "Platform"). The Platform is operated by OG Technologies EU, a company registered in Vienna, Austria ("we", "us" or "our"). Represented by Olvis E. Gil Ríos.
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              By accessing or using the Platform, you agree to be bound by these terms and conditions ("Terms"). If you do not agree to these Terms, you must not use the Platform.
            </Typography>

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              2. Changes to Terms
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              We reserve the right to make changes to these Terms at any time. Your continued use of the Platform following any changes indicates your acceptance of the new Terms.
            </Typography>

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              3. Intellectual Property
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              All content on the Platform, including but not limited to text, graphics, logos, images, and software, is our property or the property of our licensors and is protected by copyright and other intellectual property laws.
            </Typography>

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              4. Disclaimer of Liability
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              To the maximum extent permitted by law, we will not be liable for any damages whatsoever, including but not limited to direct, indirect, special, punitive, or consequential damages, arising out of or in connection with your use of the Platform.
            </Typography>

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              5. Governing Law
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              These Terms and your use of the Platform will be governed by and construed in accordance with the laws of Austria, without giving effect to any principles of conflicts of law.
            </Typography>

            <Typography component="h2" variant="h5" sx={{ color: '#00d4ff', fontWeight: 600, mb: 1.5, mt: 3 }}>
              6. Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', lineHeight: 1.7, mb: 2 }}>
              If you have any questions about these Terms or the Platform, please contact us at <a href="mailto:hi@edunode.org">hi@edunode.org</a>.
            </Typography>
          </ContentCard>
        </Container>
      </PageContainer>
    </div>
  );
};

export default TermsAndConditions;