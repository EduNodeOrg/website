import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ModernNavbar from '../Dashboard/layout/ModernNavbar';

// Modern styled components matching dashboard theme
const DashboardContainer = styled(Box)(({ theme }) => ({
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
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const ContentCard = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const ContentText = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  lineHeight: 1.8,
  marginBottom: theme.spacing(2),
  fontSize: '1.1rem',
}));

const SubsectionTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontSize: '1.5rem',
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
  pointerEvents: 'none',
  zIndex: 0,
}));

class CertificatePage extends React.Component {
    render() {
    return (
      <DashboardContainer>
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <ModernNavbar />

        <ContentContainer maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle variant="h2" component="h1">
              EduNode Certificates: Proving Competence in a Digital World
            </SectionTitle>

            <ContentCard>
              <ContentText>
                At EduNode, we understand that education is about more than just knowledge acquisition. It's about being able to demonstrate what you've learned and how it makes you more competent. That's why we offer EduNode Certificates, a unique feature of our learning platform.
              </ContentText>
            </ContentCard>

            <ContentCard>
              <SubsectionTitle variant="h4" component="h2">
                What are EduNode Certificates?
              </SubsectionTitle>
              <ContentText>
                EduNode Certificates are digital proof of course completion. When you complete a course on EduNode, you receive a certificate that validates your newly acquired skills. Whether you're a freelancer seeking to showcase your expertise or an employee aiming to add value to your organization, these certificates help you demonstrate your learning achievements.
              </ContentText>
            </ContentCard>

            <ContentCard>
              <SubsectionTitle variant="h4" component="h2">
                Why are EduNode Certificates special?
              </SubsectionTitle>
              <ContentText>
                Our certificates are not just digital files; they are immutable proofs of your accomplishment. Thanks to innovative use of blockchain technology, every EduNode Certificate is stored on a public ledger, making it easy to audit and impossible to forge. This ensures that your achievement is secure, transparent, and verifiable at any time and from anywhere.
              </ContentText>
            </ContentCard>

            <ContentCard>
              <SubsectionTitle variant="h4" component="h2">
                How can EduNode Certificates benefit you?
              </SubsectionTitle>
              <ContentText>
                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                  <Box component="li" sx={{ mb: 2 }}>
                    <strong>Credibility:</strong> Our certificates lend credibility to your professional profile. They serve as an assurance to employers and clients about your expertise and dedication to continuous learning.
                  </Box>
                  <Box component="li" sx={{ mb: 2 }}>
                    <strong>Career Advancement:</strong> Showcasing your EduNode Certificates can make you a more desirable candidate for promotions or new job opportunities.
                  </Box>
                  <Box component="li" sx={{ mb: 2 }}>
                    <strong>Lifelong Learning:</strong> They serve as a tangible record of your commitment to lifelong learning and skill development.
                  </Box>
                  <Box component="li" sx={{ mb: 2 }}>
                    <strong>Easy Verification:</strong> The immutable nature of our certificates on blockchain allows for quick and easy verification of your accomplishments, eliminating any doubts about legitimacy of your credentials.
                  </Box>
                </Box>
              </ContentText>
            </ContentCard>

            <ContentCard>
              <ContentText sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                EduNode Certificates are more than just a digital representation of your course completion; they are a testament to your dedication to continuous learning and professional development. They're your passport to success in digital world. Enroll in an EduNode course today and start your journey towards achieving your career goals!
              </ContentText>
            </ContentCard>
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
    );
  }
}

export default CertificatePage;
