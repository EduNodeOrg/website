import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const VideoSection = lazy(() => import('../sections/VideoSection'));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '500px',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#7b2ff7',
  size: 60,
}));

const LazyVideoSection = () => {
  return (
    <Suspense
      fallback={
        <LoadingContainer>
          <StyledCircularProgress />
        </LoadingContainer>
      }
    >
      <VideoSection />
    </Suspense>
  );
};

export default LazyVideoSection;
