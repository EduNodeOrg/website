import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LockIcon from '@mui/icons-material/Lock';
import QuizIcon from '@mui/icons-material/Quiz';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { getCourse } from './data';
import { hasProAccess } from './membership';

const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
}));

const GradientText = styled(Typography)(() => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const MetaCard = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
  marginTop: '16px',
}));

const StyledAccordion = styled(Accordion)(() => ({
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '12px !important',
  marginBottom: '12px',
  '&:before': { display: 'none' },
}));

const difficultyColor = {
  beginner: 'linear-gradient(45deg, #00ff88, #00cc66)',
  intermediate: 'linear-gradient(45deg, #ffaa00, #ff8800)',
  advanced: 'linear-gradient(45deg, #ff4444, #cc0000)',
};

function ProCourseLanding({ courseId, auth }) {
  const navigate = useNavigate();
  const course = getCourse(courseId);

  if (!course) {
    return <Typography sx={{ color: '#fff', p: 4 }}>Course not found.</Typography>;
  }

  const isAuthenticated = Boolean(auth && auth.isAuthenticated);
  const isPro = hasProAccess(auth && auth.user);
  const locked = course.proOnly && !isPro;

  const handleStart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (locked) {
      navigate('/pricing');
      return;
    }
    navigate(`/courses/${course.id}/1`);
  };

  const canonical = `https://edunode.org/courses/${course.id}`;

  return (
    <PageContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{course.title} | EduNode</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.title} | EduNode`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${course.title} | EduNode`} />
        <meta name="twitter:description" content={course.description} />
      </Helmet>
      <NavBar />
      <ContentContainer maxWidth="md">
        <Chip
          icon={course.proOnly ? <LockIcon sx={{ color: '#fff !important' }} /> : null}
          label={course.proOnly ? 'PRO COURSE' : 'FREE COURSE'}
          sx={{
            background: course.proOnly
              ? 'linear-gradient(45deg, #7b2ff7, #00d4ff)'
              : 'linear-gradient(45deg, #00cc66, #00ff88)',
            color: '#fff',
            fontWeight: 'bold',
            mb: 2,
          }}
        />
        <GradientText variant="h3" component="h1" gutterBottom>
          {course.title}
        </GradientText>
        <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2 }}>
          {course.description}
        </Typography>

        <MetaCard>
          <Chip
            label={course.difficulty}
            size="small"
            sx={{
              background: difficultyColor[course.difficulty] || difficultyColor.beginner,
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#b8c5d6' }}>
            <ScheduleIcon sx={{ fontSize: '1rem', mr: 0.5, color: '#7b2ff7' }} />
            <Typography variant="body2">{course.duration}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#b8c5d6' }}>
            <StarIcon sx={{ fontSize: '1rem', mr: 0.5, color: '#ffaa00' }} />
            <Typography variant="body2">{course.rating}</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
            {course.modules.length} modules
          </Typography>
        </MetaCard>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            sx={{
              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
              color: '#fff',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': { background: 'linear-gradient(45deg, #00b8e6, #6b2fd6)' },
            }}
          >
            {!isAuthenticated
              ? 'Log in to start'
              : locked
              ? 'Upgrade to Pro to unlock'
              : 'Start course'}
          </Button>
          {locked && isAuthenticated && (
            <Typography variant="body2" sx={{ color: '#b8c5d6', mt: 1.5 }}>
              This course is included with EduNode Pro (€6.99/mo).
            </Typography>
          )}
        </Box>

        <GradientText variant="h5" component="h2" sx={{ mb: 2 }}>
          Syllabus
        </GradientText>

        {course.modules.map((mod, i) => (
          <StyledAccordion key={i} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00d4ff' }} />}>
              <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                {i + 1}. {mod.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 1 }}>
                {mod.summary}
              </Typography>
              <List dense>
                {mod.quiz.length > 0 && (
                  <ListItem sx={{ py: 0.2, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <QuizIcon sx={{ color: '#7b2ff7', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${mod.quiz.length} quiz questions`}
                      primaryTypographyProps={{ variant: 'body2', sx: { color: '#8fa3bf' } }}
                    />
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const Connected = connect(mapStateToProps)(ProCourseLanding);

// Small wrapper so App.js can pass a courseId prop cleanly per route.
export default function ProCourseLandingRoute(props) {
  return <Connected {...props} />;
}
