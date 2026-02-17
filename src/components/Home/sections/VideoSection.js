import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const VideoContainer = styled(Box)(({ theme }) => ({
  padding: '100px 0',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const VideoWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '900px',
  margin: '0 auto',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 25px 50px rgba(123, 47, 247, 0.3)',
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(123, 47, 247, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 0,
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  width: '80px',
  height: '80px',
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  },
  transition: 'all 0.3s ease',
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

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2,
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    background: 'rgba(123, 47, 247, 0.5)',
  },
}));

const KeyPoints = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
}));

const KeyPoint = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  padding: theme.spacing(2),
  minWidth: '200px',
  textAlign: 'center',
}));

const KeyPointText = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  fontSize: '0.9rem',
  fontWeight: '500',
}));

const VideoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const keyPoints = [
    'Learn at your own pace',
    'Expert-led instruction',
    'Hands-on projects',
    'Community support',
  ];

  return (
    <VideoContainer ref={ref}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <SectionTitle variant="h2" component="h2">
            Discover EduNode
          </SectionTitle>

          <VideoWrapper>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=cHnlzwi7DuY"
              width="100%"
              height="500px"
              playing={isPlaying}
              muted={isMuted}
              controls={true}
              light={false}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                  },
                },
              }}
            />
            
            {!isPlaying && (
              <VideoOverlay onClick={handlePlay}>
                <PlayButton>
                  <PlayArrowIcon sx={{ fontSize: '40px' }} />
                </PlayButton>
              </VideoOverlay>
            )}

            <VideoControls>
              <ControlButton onClick={handleMuteToggle}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </ControlButton>
            </VideoControls>
          </VideoWrapper>

          <KeyPoints>
            {keyPoints.map((point, index) => (
              <KeyPoint
                key={point}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: 'easeOut' 
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(123, 47, 247, 0.1)',
                  borderColor: 'rgba(123, 47, 247, 0.3)',
                }}
              >
                <KeyPointText>{point}</KeyPointText>
              </KeyPoint>
            ))}
          </KeyPoints>
        </motion.div>
      </Container>
    </VideoContainer>
  );
};

export default VideoSection;
