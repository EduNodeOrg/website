import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MultipleSelect from '../drop';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
    animation: 'pulse 4s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.3 },
    '50%': { opacity: 0.6 },
  },
}));

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7, #ff107f)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'gradient 3s ease infinite',
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

const GlowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '50px',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(123, 47, 247, 0.4)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
}));

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const navigate = useNavigate();

  const phrases = [
    'Learn Web3 and Blockchain skills',
    'Master decentralized development',
    'Build the future of finance',
    'Join the blockchain revolution'
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
        setTypingSpeed(50);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  const handleGetStarted = () => {
    navigate('/courses');
  };

  return (
    <HeroContainer>
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
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
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <AnimatedTypography
            component="h1"
            variant="h1"
            align="center"
            gutterBottom
            sx={{ 
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 'bold',
              mb: 3,
              textShadow: '0 0 30px rgba(123, 47, 247, 0.5)'
            }}
          >
            EduNode
          </AnimatedTypography>

          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 4,
              minHeight: '2rem',
              color: '#b8c5d6'
            }}
          >
            {text}
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <MultipleSelect />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <GlowButton onClick={handleGetStarted}>
              Get Started
            </GlowButton>
            <GlowButton 
              variant="outlined"
              onClick={() => navigate('/about')}
              sx={{
                background: 'transparent',
                border: '2px solid',
                borderImage: 'linear-gradient(45deg, #7b2ff7, #00d4ff) 1',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                }
              }}
            >
              Learn More
            </GlowButton>
          </Box>
        </motion.div>
      </Container>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </HeroContainer>
  );
};

export default HeroSection;
