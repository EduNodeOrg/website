import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { getCourse } from './data';
import { hasProAccess } from './membership';

const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  display: 'flex',
  flexDirection: 'column',
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
}));

function ProCourseDone({ courseId, auth }) {
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const [status, setStatus] = useState('loading'); // loading | done
  const user = (auth && auth.user) || {};

  useEffect(() => {
    let cancelled = false;
    let timer;

    const issueCertificate = async () => {
      // The backend exposes /api/certificates/diploma<N> per course. New
      // diploma endpoints may not exist yet — any failure falls back to
      // the completion screen below instead of an error.
      try {
        const response = await fetch(
          `https://edunode.herokuapp.com/api/certificates/${course.diplomaEndpoint}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              pkey: user.pkey || user.pubkey || '',
            }),
          }
        );
        const data = await response.json().catch(() => ({}));
        if (
          !cancelled &&
          response.ok &&
          data.success &&
          data.certificate &&
          data.certificate.certificateNumber
        ) {
          timer = setTimeout(() => {
            navigate(`/certificates/${data.certificate.certificateNumber}`);
          }, 3000);
          return; // keep the loading state; redirect is pending
        }
      } catch (err) {
        console.error('Certificate generation failed, showing completion screen:', err);
      }
      if (!cancelled) setStatus('done');
    };

    if (course && auth && auth.isAuthenticated) {
      issueCertificate();
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  if (!course) {
    return <Typography sx={{ color: '#fff', p: 4 }}>Course not found.</Typography>;
  }

  if (!auth || !auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (course.proOnly && !hasProAccess(auth.user)) {
    return <Navigate to={`/courses/${course.id}`} replace />;
  }

  return (
    <PageContainer>
      <Helmet>
        <title>{`Course completed | ${course.title} | EduNode`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <NavBar />
      <ContentContainer maxWidth="sm">
        {status === 'loading' ? (
          <>
            <CircularProgress sx={{ color: '#00d4ff', mb: 3 }} />
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Generating your certificate…
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', mt: 1 }}>
              You will be redirected shortly.
            </Typography>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#00d4ff', mb: 3 }} />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
              Congratulations!
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', mb: 4, maxWidth: 480 }}>
              You have completed <strong>{course.title}</strong>. Your certificate will be
              issued once certification is enabled for this course.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/dashboard')}
                sx={{
                  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/courses')}
                sx={{ borderColor: 'rgba(123, 47, 247, 0.6)', color: '#00d4ff' }}
              >
                Browse Courses
              </Button>
            </Box>
          </>
        )}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProCourseDone);
