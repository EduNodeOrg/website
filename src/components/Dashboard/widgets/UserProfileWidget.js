import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  LinearProgress,
  Chip,
  Grid,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import { 
  School, 
  EmojiEvents, 
  TrendingUp,
  Code,
  Book,
  Star
} from '@mui/icons-material';

const WidgetCard = styled(Card)(({ theme }) => ({
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

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '80px',
  height: '80px',
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  border: '3px solid rgba(123, 47, 247, 0.5)',
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const StyledProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: '8px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, #7b2ff7 0%, #00d4ff ${value}%, rgba(0, 212, 255, 0.3) 100%)`,
    borderRadius: '10px',
  },
}));

const StatCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(123, 47, 247, 0.1)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(123, 47, 247, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(123, 47, 247, 0.2), rgba(0, 212, 255, 0.2))',
  color: '#b8c5d6',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  margin: theme.spacing(0.5),
  fontSize: '0.75rem',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(123, 47, 247, 0.3), rgba(0, 212, 255, 0.3))',
    transform: 'scale(1.05)',
  },
}));

const UserProfileWidget = ({ auth }) => {
  const { user, isAuthenticated } = auth;
  
  // Handle loading and authentication states
  if (!isAuthenticated || !user) {
    return (
      <WidgetCard>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress sx={{ color: '#7b2ff7' }} />
          </Box>
        </CardContent>
      </WidgetCard>
    );
  }

  // Extract user data from Redux auth state
  const userSkills = user.skills || [];
  const userPreferences = user.preferences || [];
  const userCourses = user.courses || [];
  const userAchievements = user.achievements || [];
  
  const completionPercentage = userSkills ? Math.min((userSkills.length / 10) * 100, 100) : 0;
  
  // Calculate real user statistics based on actual data
  const stats = [
    { 
      icon: <School />, 
      label: 'Courses', 
      value: userCourses.length || 0, 
      color: '#7b2ff7' 
    },
    { 
      icon: <EmojiEvents />, 
      label: 'Achievements', 
      value: userAchievements.length || 0, 
      color: '#00d4ff' 
    },
    { 
      icon: <TrendingUp />, 
      label: 'Streak', 
      value: user.streak || 0, 
      color: '#ff107f' 
    },
    { 
      icon: <Code />, 
      label: 'Projects', 
      value: user.projects || 0, 
      color: '#00ff88' 
    },
  ];

  return (
    <WidgetCard>
      <CardContent>
        <ProfileHeader>
          <ProfileAvatar>
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </ProfileAvatar>
          <ProfileInfo>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              {user.name || (user.email ? user.email.split('@')[0] : 'User')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
              {user.email || 'user@example.com'}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ color: '#7b2ff7' }}>
                Level {Math.floor(completionPercentage / 20) + 1} Learner
              </Typography>
            </Box>
          </ProfileInfo>
        </ProfileHeader>

        {/* Profile Completion */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
              Profile Completion
            </Typography>
            <Typography variant="body2" sx={{ color: '#7b2ff7', fontWeight: 'bold' }}>
              {Math.round(completionPercentage)}%
            </Typography>
          </Box>
          <StyledProgress variant="determinate" value={completionPercentage} />
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={stat.label}>
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{ color: stat.color, mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#b8c5d6' }}>
                  {stat.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Skills Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2, fontWeight: 'bold' }}>
            <Book sx={{ verticalAlign: 'middle', mr: 1, fontSize: '1rem' }} />
            Skills & Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {userSkills.length > 0 ? (
              userSkills.map((skill, index) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  size="small"
                  component={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#b8c5d6', fontStyle: 'italic' }}>
                No skills added yet
              </Typography>
            )}
          </Box>
        </Box>

        {/* Preferences */}
        {userPreferences.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2, fontWeight: 'bold' }}>
              <Star sx={{ verticalAlign: 'middle', mr: 1, fontSize: '1rem' }} />
              Learning Preferences
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {userPreferences.slice(0, 3).map((pref, index) => (
                <SkillChip
                  key={pref}
                  label={pref}
                  size="small"
                  icon={<Star sx={{ fontSize: '0.8rem' }} />}
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </WidgetCard>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(UserProfileWidget);
