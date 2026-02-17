import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  FilterList,
  Bookmark,
  BookmarkBorder,
  PlayArrow,
  Schedule,
  Star
} from '@mui/icons-material';

const CourseCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  overflow: 'hidden',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(123, 47, 247, 0.4)',
    border: '1px solid rgba(123, 47, 247, 0.6)',
  },
}));

const CourseImage = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 39, 0.8) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const PlayOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(123, 47, 247, 0.9)',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'all 0.3s ease',
}));

const DifficultyChip = styled(Chip)(({ theme, difficulty }) => ({
  background: 
    difficulty === 'beginner' ? 'linear-gradient(45deg, #00ff88, #00cc66)' :
    difficulty === 'intermediate' ? 'linear-gradient(45deg, #ffaa00, #ff8800)' :
    'linear-gradient(45deg, #ff4444, #cc0000)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.75rem',
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const CourseGrid = ({ courses, loading, onCourseClick, onBookmark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set());

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredAndSortedCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || course.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.enrolled || 0) - (a.enrolled || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const handleBookmark = (courseId, event) => {
    event.stopPropagation();
    const newBookmarks = new Set(bookmarkedCourses);
    if (newBookmarks.has(courseId)) {
      newBookmarks.delete(courseId);
    } else {
      newBookmarks.add(courseId);
    }
    setBookmarkedCourses(newBookmarks);
    onBookmark && onBookmark(courseId, newBookmarks.has(courseId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '16px 16px 0 0' }} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      {/* Filters */}
      <FilterContainer>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#7b2ff7' }} />
                  </InputAdornment>
                ),
                sx: {
                  color: '#b8c5d6',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(123, 47, 247, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(123, 47, 247, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7b2ff7',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#b8c5d6' }}>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  color: '#b8c5d6',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(123, 47, 247, 0.3)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7b2ff7',
                  },
                }}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#b8c5d6' }}>Difficulty</InputLabel>
              <Select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                sx={{
                  color: '#b8c5d6',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(123, 47, 247, 0.3)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7b2ff7',
                  },
                }}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderColor: 'rgba(123, 47, 247, 0.5)',
                color: '#7b2ff7',
                height: '56px',
                '&:hover': {
                  borderColor: '#7b2ff7',
                  background: 'rgba(123, 47, 247, 0.1)',
                },
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </FilterContainer>

      {/* Course Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <Grid container spacing={3}>
          {filteredAndSortedCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <CourseCard
                variants={itemVariants}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCourseClick && onCourseClick(course)}
              >
                <StyledCard>
                  <Box sx={{ position: 'relative' }}>
                    <CourseImage
                      image={course.image || '/api/placeholder/300x200'}
                      title={course.title}
                    />
                    <PlayOverlay>
                      <PlayArrow sx={{ color: 'white', fontSize: '2rem' }} />
                    </PlayOverlay>
                    
                    {/* Bookmark Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(10, 14, 39, 0.8)',
                        color: bookmarkedCourses.has(course._id) ? '#7b2ff7' : '#b8c5d6',
                        '&:hover': {
                          background: 'rgba(123, 47, 247, 0.9)',
                          color: 'white',
                        },
                      }}
                      onClick={(e) => handleBookmark(course._id, e)}
                    >
                      {bookmarkedCourses.has(course._id) ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        mb: 1,
                        height: '3rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {course.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#b8c5d6', 
                        mb: 2,
                        height: '2.5rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {course.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <DifficultyChip 
                        label={course.difficulty || 'beginner'}
                        difficulty={course.difficulty || 'beginner'}
                        size="small"
                      />
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: '#ffaa00', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                          {course.rating || '4.5'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Schedule sx={{ color: '#7b2ff7', fontSize: '0.9rem', mr: 0.5 }} />
                        <Typography variant="caption" sx={{ color: '#b8c5d6' }}>
                          {course.duration || '8 weeks'}
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ color: '#00d4ff', fontWeight: 'bold' }}>
                        {course.price === 0 ? 'Free' : `$${course.price || 49}`}
                      </Typography>
                    </Box>
                  </CardContent>
                </StyledCard>
              </CourseCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default CourseGrid;
