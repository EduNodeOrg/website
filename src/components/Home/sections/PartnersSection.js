import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logos from '../logos.png';

const PartnersContainer = styled(Box)(({ theme }) => ({
  padding: '100px 0',
  background: 'linear-gradient(180deg, #2d1b69 0%, #0a0e27 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '3rem',
  fontWeight: 'bold',
}));

const PartnersWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  maxWidth: '900px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(123, 47, 247, 0.2), transparent)',
    animation: 'shimmer 3s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: -100 },
    '100%': { left: '100%' },
  },
}));

const PartnerImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  maxHeight: '200px',
  objectFit: 'contain',
  filter: 'grayscale(100%)',
  opacity: 0.7,
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'grayscale(0%)',
    opacity: 1,
    transform: 'scale(1.05)',
  },
}));

const FloatingLogo = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: '60px',
  height: '60px',
  background: 'rgba(123, 47, 247, 0.1)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: '#7b2ff7',
  backdropFilter: 'blur(10px)',
}));

const PartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatingLogos = [
    { icon: '⚡', top: '10%', left: '5%', delay: 0 },
    { icon: '🔗', top: '20%', right: '10%', delay: 0.5 },
    { icon: '🚀', bottom: '15%', left: '8%', delay: 1 },
    { icon: '💎', bottom: '25%', right: '5%', delay: 1.5 },
  ];

  return (
    <PartnersContainer ref={ref}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <SectionTitle variant="h2" component="h2">
            Our Trusted Partners
          </SectionTitle>

          <PartnersWrapper>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <PartnerImage 
                src={Logos} 
                alt="Partners"
                loading="lazy"
              />
            </motion.div>
          </PartnersWrapper>

          {/* Floating decorative elements */}
          {floatingLogos.map((logo, index) => (
            <FloatingLogo
              key={index}
              style={{
                top: logo.top,
                left: logo.left,
                right: logo.right,
                bottom: logo.bottom,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? {
                opacity: [0, 1, 0.7],
                scale: [0, 1, 0.9],
                y: [0, -20, 0],
              } : {}}
              transition={{
                duration: 3,
                delay: logo.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              {logo.icon}
            </FloatingLogo>
          ))}
        </motion.div>
      </Container>
    </PartnersContainer>
  );
};

export default PartnersSection;
