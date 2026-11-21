import React, { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
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

// Mount (and therefore the lazy chunk fetch) only when the section approaches
// the viewport — keeps react-player + the video facade off the critical path.
const LazyVideoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px',
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense
          fallback={
            <LoadingContainer>
              <StyledCircularProgress />
            </LoadingContainer>
          }
        >
          <VideoSection />
        </Suspense>
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default LazyVideoSection;
