import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  School,
  Code,
  Timeline,
  OpenInNew
} from '@mui/icons-material';

const ChartCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(2),
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(123, 47, 247, 0.3)',
    border: '1px solid rgba(123, 47, 247, 0.5)',
  },
}));

const ProgressRing = styled('svg')(({ theme, progress }) => ({
  transform: 'rotate(-90deg)',
  '& .progress-circle': {
    stroke: '#7b2ff7',
    strokeWidth: 4,
    fill: 'none',
    strokeLinecap: 'round',
    strokeDasharray: `${progress * 2.51}, 251`,
    transition: 'stroke-dasharray 1s ease-in-out',
  },
  '& .progress-bg': {
    stroke: 'rgba(123, 47, 247, 0.2)',
    strokeWidth: 4,
    fill: 'none',
  },
}));

const StyledProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: '10px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, #7b2ff7 0%, #00d4ff ${value}%, rgba(0, 212, 255, 0.3) 100%)`,
    borderRadius: '10px',
  },
}));

const StatItem = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: 'rgba(123, 47, 247, 0.1)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(123, 47, 247, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const ProgressChart = ({ user, courses = [], completedCount = 0, totalCourses = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const overallProgress = totalCourses > 0
    ? Math.round((completedCount / totalCourses) * 100)
    : 0;
  const streak = user?.streak || 0;
  const projects = user?.projects || 0;

  const stats = [
    {
      icon: <TrendingUp />,
      label: 'Learning Streak',
      value: `${streak} days`,
      color: '#00d4ff',
      progress: Math.min(Math.round((streak / 30) * 100), 100)
    },
    {
      icon: <School />,
      label: 'Courses Completed',
      value: `${completedCount}/${totalCourses}`,
      color: '#7b2ff7',
      progress: overallProgress
    },
    {
      icon: <Code />,
      label: 'Projects Built',
      value: `${projects}`,
      color: '#ff107f',
      progress: Math.min(projects * 10, 100)
    },
  ];

  return (
    <Box ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Main Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={stat.label}>
              <StatItem
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{ color: stat.color, mb: 1, fontSize: '2rem' }}>
                  {stat.icon}
                </Box>
                
                {/* Circular Progress */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
                  <ProgressRing width="60" height="60" progress={stat.progress}>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      className="progress-bg"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      className="progress-circle"
                    />
                  </ProgressRing>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {stat.progress}%
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#b8c5d6' }}>
                  {stat.label}
                </Typography>
              </StatItem>
            </Grid>
          ))}
        </Grid>

        {/* Course Progress Section */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChartCard>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
                  <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Your Favorite Courses
                </Typography>

                {courses.length > 0 ? (
                  courses.map((course) => (
                    <Box
                      key={course._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1.5,
                        p: 1,
                        borderRadius: '8px',
                        background: 'rgba(123, 47, 247, 0.1)',
                        border: '1px solid rgba(123, 47, 247, 0.3)',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {course.title}
                      </Typography>
                      {(course.route || course.link) && (
                        <IconButton
                          size="small"
                          {...(course.route
                            ? { component: RouterLink, to: course.route }
                            : { href: course.link, target: '_blank', rel: 'noopener noreferrer' })}
                          sx={{ color: '#00d4ff' }}
                        >
                          <OpenInNew fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#b8c5d6', fontStyle: 'italic' }}>
                    No favorites yet — use the bookmark icon on a course below.
                  </Typography>
                )}

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                    Overall Progress: {overallProgress}% Complete
                  </Typography>
                  <StyledProgress 
                    variant="determinate" 
                    value={overallProgress} 
                    sx={{ mt: 1 }}
                  />
                </Box>
              </CardContent>
            </ChartCard>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default ProgressChart;
