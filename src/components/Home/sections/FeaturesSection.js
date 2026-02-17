import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, Typography, Box, Grid, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import image1 from '../stellarbg.JPG';
import image2 from '../coding-924920_640.jpg';
import image3 from '../people-2.jpg';

const FeaturesContainer = styled(Box)(({ theme }) => ({
  padding: '100px 0',
  background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  height: '300px',
  borderRadius: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(123, 47, 247, 0.3)',
    border: '1px solid rgba(123, 47, 247, 0.5)',
  },
}));

const FeatureImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform 0.5s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 39, 0.8) 100%)',
  },
}));

const FeatureContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  zIndex: 2,
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: theme.spacing(1),
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  fontSize: '1rem',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.3s ease',
}));

const AnimatedButton = styled(ButtonBase)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '&:hover .feature-description': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '&:hover .feature-image': {
    transform: 'scale(1.1)',
  },
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

const features = [
  {
    title: 'Online Courses',
    description: 'Comprehensive blockchain and Web3 development courses from beginner to advanced levels.',
    image: image2,
    href: '/courses',
    delay: 0.1,
  },
  {
    title: 'Check out our Blog',
    description: 'Stay updated with the latest trends, tutorials, and insights in the blockchain world.',
    image: image1,
    href: '/blog',
    delay: 0.2,
  },
  {
    title: 'Join the Community',
    description: 'Connect with developers, share knowledge, and grow together in the #Stellarfamily.',
    image: image3,
    href: '/community',
    delay: 0.3,
  },
];

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <FeaturesContainer ref={ref}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <SectionTitle variant="h2" component="h2">
            Explore Our Platform
          </SectionTitle>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <FeatureCard
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatedButton href={feature.href}>
                    <FeatureImage
                      className="feature-image"
                      sx={{
                        backgroundImage: `url(${feature.image})`,
                      }}
                    />
                    <FeatureContent>
                      <FeatureTitle variant="h3">
                        {feature.title}
                      </FeatureTitle>
                      <FeatureDescription className="feature-description">
                        {feature.description}
                      </FeatureDescription>
                    </FeatureContent>
                  </AnimatedButton>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection;
