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
import ComingSoonDialog from '../dialogs/ComingSoonDialog';
import withRouter from '../../../withRouter';
import { connect } from 'react-redux';

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
      achievements: [],
      userProgress: {},
      weeklyStats: {},
      loading: true,
      showComingSoonDialog: false,
      selectedCourse: null,
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
    try {
      // Only fetch non-user specific data (courses, etc.)
      // User data now comes from Redux auth state in UserProfileWidget
      const mockCourses = [
        {
          _id: '1',
          title: 'Web3 Fundamentals Masterclass',
          description: 'Learn the basics of Web3 development, blockchain technology, and decentralized applications.',
          image: '/api/placeholder/course1.jpg',
          difficulty: 'beginner',
          rating: 4.8,
          duration: '6 weeks',
          price: 0,
          enrolled: 1250,
          createdAt: '2024-01-15',
        },
        {
          _id: '2',
          title: 'Advanced Smart Contract Development',
          description: 'Master smart contract programming with Solidity and build real-world DeFi applications.',
          image: '/api/placeholder/course2.jpg',
          difficulty: 'advanced',
          rating: 4.9,
          duration: '8 weeks',
          price: 99,
          enrolled: 890,
          createdAt: '2024-02-01',
        },
        {
          _id: '3',
          title: 'DeFi Protocol Engineering',
          description: 'Build and deploy decentralized finance protocols on Ethereum and other blockchains.',
          image: '/api/placeholder/course3.jpg',
          difficulty: 'intermediate',
          rating: 4.7,
          duration: '10 weeks',
          price: 149,
          enrolled: 567,
          createdAt: '2024-01-20',
        },
        {
          _id: '4',
          title: 'NFT Marketplace Development',
          description: 'Create complete NFT marketplaces with minting, trading, and royalty features.',
          image: '/api/placeholder/course4.jpg',
          difficulty: 'intermediate',
          rating: 4.6,
          duration: '8 weeks',
          price: 79,
          enrolled: 445,
          createdAt: '2024-02-10',
        },
        {
          _id: '5',
          title: 'Blockchain Security Auditing',
          description: 'Learn security best practices and how to audit smart contracts for vulnerabilities.',
          image: '/api/placeholder/course5.jpg',
          difficulty: 'advanced',
          rating: 4.9,
          duration: '12 weeks',
          price: 199,
          enrolled: 234,
          createdAt: '2024-01-25',
        },
        {
          _id: '6',
          title: 'Cross-Chain Development',
          description: 'Build applications that work across multiple blockchain networks.',
          image: '/api/placeholder/course6.jpg',
          difficulty: 'advanced',
          rating: 4.5,
          duration: '10 weeks',
          price: 179,
          enrolled: 189,
          createdAt: '2024-02-05',
        },
      ];

      const mockAchievements = [
        { _id: '1', title: 'First Steps', date: '2024-01-10', icon: '👟' },
        { _id: '2', title: 'Smart Contract Pro', date: '2024-01-25', icon: '📝' },
        { _id: '3', title: 'DeFi Explorer', date: '2024-02-05', icon: '💰' },
        { _id: '4', title: 'NFT Creator', date: '2024-02-15', icon: '🎨' },
      ];

      const mockUserProgress = {
        completed: 8,
        total: 12,
        currentCourse: 'DeFi Protocol Engineering',
      };

      const mockWeeklyStats = {
        streak: 15,
        projects: 6,
        studyHours: 24,
        completedLessons: 12,
      };

      // Simulate loading delay
      setTimeout(() => {
        this.setState({
          courses: mockCourses,
          achievements: mockAchievements,
          userProgress: mockUserProgress,
          weeklyStats: mockWeeklyStats,
          loading: false,
        });
      }, 1000);
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.setState({ loading: false });
    }
  };

  handleCourseClick = (course) => {
    // Show coming soon dialog instead of navigating
    this.setState({
      showComingSoonDialog: true,
      selectedCourse: course,
    });
  };

  handleBookmark = (courseId, isBookmarked) => {
    console.log(`Course ${courseId} ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
  };

  handleCloseComingSoonDialog = () => {
    this.setState({
      showComingSoonDialog: false,
      selectedCourse: null,
    });
  };

  render() {
    const { showScrollTop, courses, achievements, userProgress, weeklyStats, loading, showComingSoonDialog, selectedCourse } = this.state;

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
                  userProgress={userProgress}
                  achievements={achievements}
                  weeklyStats={weeklyStats}
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

        {/* Coming Soon Dialog */}
        <ComingSoonDialog
          open={showComingSoonDialog}
          onClose={this.handleCloseComingSoonDialog}
          course={selectedCourse}
        />
      </DashboardContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

DashboardLayout = connect(mapStateToProps)(DashboardLayout);

export default withRouter(DashboardLayout);
