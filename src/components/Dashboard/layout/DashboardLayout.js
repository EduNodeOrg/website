import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { 
  Grid, 
  Box, 
  Container, 
  Typography,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowUp } from '@mui/icons-material';
import ModernNavbar from './ModernNavbar';
import UserProfileWidget from '../widgets/UserProfileWidget';
import ProgressChart from '../visualizations/ProgressChart';
import CourseGrid from '../content/CourseGrid';
import withRouter from '../../../withRouter';
import { connect } from 'react-redux';
import axios from 'axios';
import { allCourses } from '../../ProCourses/data';
import COURSE_IDS from '../../Courses/courseIds';
import { loadFavorites, toggleFavoriteCourse } from '../../../hooks/useFavorites';
import cryptoImg from '../../Courses/crypto.jpg';
import ethereumImg from '../../Courses/Ethereum.png';
import oraclesImg from '../../Courses/oracles.jpg';
import nftImg from '../../Courses/NFT/growth.png';
import securityImg from '../../Courses/basic.PNG';
import stellarImg from '../../Courses/stellar.png';

const API_BASE_URL = 'https://edunode.herokuapp.com/api';

const COURSE_IMAGES = {
  112: cryptoImg,
  113: ethereumImg,
  114: oraclesImg,
  115: nftImg,
  116: securityImg,
  117: stellarImg,
};

const TOTAL_COURSES = Object.keys(COURSE_IDS).length + allCourses.length;

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(123, 47, 247, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
}));

const ScrollToTopFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  zIndex: 1000,
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.1)',
  },
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
  pointerEvents: 'none',
  zIndex: 0,
}));

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScrollTop: false,
      courses: [],
      favorites: [],
      completedCount: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({ showScrollTop: scrollTop > 300 });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  fetchUserData = async () => {
    // Recommended courses come from the real course registry (courses 112-117).
    const courses = allCourses.map((course) => ({
      _id: course.id,
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      rating: course.rating,
      duration: course.duration,
      proOnly: course.proOnly,
      price: course.proOnly ? null : 0,
      route: `/courses/${course.id}`,
      image: COURSE_IMAGES[course.id],
    }));

    // A completed course is recorded as a certificate — count unique types.
    const email = this.props.auth.user?.email;
    let completedCount = 0;
    if (email) {
      try {
        const res = await axios.get(`${API_BASE_URL}/certificates/${email}`);
        if (Array.isArray(res.data)) {
          completedCount = new Set(res.data.map((c) => c.courseType)).size;
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    }

    this.setState({
      courses,
      favorites: loadFavorites(email),
      completedCount,
      loading: false,
    });
  };

  handleBookmark = (courseId) => {
    const course = this.state.courses.find((c) => c._id === courseId);
    if (!course) return;
    const email = this.props.auth.user?.email;
    this.setState((prev) => ({
      favorites: toggleFavoriteCourse(
        email,
        { id: course._id, title: course.title, route: course.route },
        prev.favorites
      ),
    }));
  };

  handleCourseClick = (course) => {
    if (course.route) {
      this.props.router.navigate(course.route);
      return;
    }
    this.setState({
      showComingSoonDialog: true,
      selectedCourse: course,
    });
  };

  render() {
    const { showScrollTop, courses, favorites, completedCount, loading } = this.state;
    const favoriteCourses = favorites.map((f) => ({
      _id: f.id,
      title: f.title,
      route: f.route,
    }));

    return (
      <DashboardContainer>
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <ModernNavbar />

        <ContentContainer maxWidth="xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" sx={{ 
                color: '#ffffff', 
                fontWeight: 'bold', 
                mb: 2,
                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Welcome back, {this.props.auth.user?.email ? this.props.auth.user.email.split('@')[0] : 'Learner'}!
              </Typography>
              <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                Continue your Web3 learning journey and unlock new achievements
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {/* User Profile Widget */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <UserProfileWidget />
              </motion.div>
            </Grid>

            {/* Progress Chart */}
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <ProgressChart 
                  user={this.props.auth.user}
                  courses={favoriteCourses}
                  completedCount={completedCount}
                  totalCourses={TOTAL_COURSES}
                />
              </motion.div>
            </Grid>
          </Grid>

          {/* Courses Section */}
          <Box sx={{ mt: 6 }}>
            <SectionTitle variant="h4" component="h2">
              Recommended Courses
            </SectionTitle>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CourseGrid
                courses={courses}
                loading={loading}
                onCourseClick={this.handleCourseClick}
                onBookmark={this.handleBookmark}
                bookmarkedIds={favorites.map((f) => f.id)}
              />
            </motion.div>
          </Box>
        </ContentContainer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <ScrollToTopFab
            onClick={this.scrollToTop}
            aria-label="Scroll to top"
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <KeyboardArrowUp />
          </ScrollToTopFab>
        )}

      </DashboardContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

DashboardLayout = connect(mapStateToProps)(DashboardLayout);

export default withRouter(DashboardLayout);
