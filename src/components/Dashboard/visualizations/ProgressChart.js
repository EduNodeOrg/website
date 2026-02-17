import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Avatar,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  School,
  Code,
  EmojiEvents,
  Timeline,
  Star
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

const ProgressChart = ({ userProgress, achievements, weeklyStats }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const overallProgress = userProgress ? Math.round((userProgress.completed / userProgress.total) * 100) : 0;
  
  const stats = [
    {
      icon: <TrendingUp />,
      label: 'Learning Streak',
      value: `${weeklyStats?.streak || 15} days`,
      color: '#00d4ff',
      progress: 75
    },
    {
      icon: <School />,
      label: 'Courses Completed',
      value: `${userProgress?.completed || 8}/${userProgress?.total || 12}`,
      color: '#7b2ff7',
      progress: overallProgress
    },
    {
      icon: <Code />,
      label: 'Projects Built',
      value: `${weeklyStats?.projects || 6}`,
      color: '#ff107f',
      progress: 60
    },
    {
      icon: <EmojiEvents />,
      label: 'Achievements',
      value: `${achievements?.length || 12}`,
      color: '#00ff88',
      progress: 40
    },
  ];

  const recentCourses = [
    { name: 'Web3 Fundamentals', progress: 100, color: '#00ff88' },
    { name: 'Smart Contracts', progress: 75, color: '#7b2ff7' },
    { name: 'DeFi Protocols', progress: 45, color: '#ffaa00' },
    { name: 'NFT Development', progress: 20, color: '#ff4444' },
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
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
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
          <Grid item xs={12} md={8}>
            <ChartCard>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
                  <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Course Progress
                </Typography>

                {recentCourses.map((course, index) => (
                  <Box key={course.name} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: course.color }}>
                        {course.progress}%
                      </Typography>
                    </Box>
                    <StyledProgress variant="determinate" value={course.progress} />
                  </Box>
                ))}

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

          <Grid item xs={12} md={4}>
            <ChartCard>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
                  <Star sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Recent Achievements
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {achievements?.slice(0, 4).map((achievement, index) => (
                    <motion.div
                      key={achievement._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          borderRadius: '8px',
                          background: 'rgba(123, 47, 247, 0.1)',
                          border: '1px solid rgba(123, 47, 247, 0.3)',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                            fontSize: '0.9rem',
                          }}
                        >
                          {achievement.icon || '🏆'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '0.9rem' }}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#b8c5d6' }}>
                            {achievement.date}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Chip
                    label="View All Achievements"
                    sx={{
                      background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
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
