import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarIcon from '@mui/icons-material/Star';
import { allCourses } from './data';
import FavoriteButton from '../FavoriteButton';
import { useFavorites } from '../../hooks/useFavorites';

const Card = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: 'rgba(123, 47, 247, 0.6)',
  },
}));

const difficultyColor = {
  beginner: 'linear-gradient(45deg, #00ff88, #00cc66)',
  intermediate: 'linear-gradient(45deg, #ffaa00, #ff8800)',
  advanced: 'linear-gradient(45deg, #ff4444, #cc0000)',
};

// Static cards for courses 112–117 — these live in the repo (no backend
// course records), so they're rendered directly from the data registry.
export default function ProCourseCards() {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'center',
        }}
      >
        Pro Courses
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {allCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card elevation={0}>
              <FavoriteButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                active={isFavorite(course.id)}
                onToggle={() =>
                  toggleFavorite({
                    id: course.id,
                    title: course.title,
                    route: `/courses/${course.id}`,
                  })
                }
              />
              <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Chip
                  icon={course.proOnly ? <LockIcon sx={{ color: '#fff !important' }} /> : null}
                  label={course.proOnly ? 'PRO' : 'FREE'}
                  size="small"
                  sx={{
                    background: course.proOnly
                      ? 'linear-gradient(45deg, #7b2ff7, #00d4ff)'
                      : 'linear-gradient(45deg, #00cc66, #00ff88)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
                <Chip
                  label={course.difficulty}
                  size="small"
                  sx={{
                    background: difficultyColor[course.difficulty],
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                {course.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 2, flexGrow: 1 }}>
                {course.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#8fa3bf' }}>
                  <ScheduleIcon sx={{ fontSize: '0.9rem', mr: 0.5, color: '#7b2ff7' }} />
                  <Typography variant="caption">{course.duration}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#8fa3bf' }}>
                  <StarIcon sx={{ fontSize: '0.9rem', mr: 0.5, color: '#ffaa00' }} />
                  <Typography variant="caption">{course.rating}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#8fa3bf' }}>
                  {course.modules.length} modules
                </Typography>
              </Box>
              <Button
                component={Link}
                to={`/courses/${course.id}`}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'rgba(0, 212, 255, 0.5)',
                  color: '#00d4ff',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.08)',
                  },
                }}
              >
                View Course
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
