import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography,
  Fab
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

// Components
import Navbar1 from '../Dashboard/Navbar1';
import Navbar2 from '../Dashboard/Navbar2';
import CourseList from './CourseList';
import learn from './learn.png';

// Styles
import './style.css';
import './styles.css';

// Constants
const API_BASE_URL = 'https://edunode.herokuapp.com/api';

const CoursesContainer = styled(Box)(({ theme }) => ({
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

const COURSE_IDS = {
  1: '644bcdd1e1fec0f4f55a7447',
  2: '644bcdeee1fec0f4f55a7449',
  3: '644bce0be1fec0f4f55a744b',
  4: '644bce24e1fec0f4f55a744d',
  5: '644bce41e1fec0f4f55a744f',
  6: '6464e2968aca412ed2d81bef',
  7: '6464e2b48aca412ed2d81bf1',
  8: '6464e2d58aca412ed2d81bf3',
  9: '646b83386cea9a0294e65253',
  10: '647603a1c8c864e8a6195e00',
  11: '6841abca38a24bd982c9d70a'
};

// Custom hook for API calls
const useUserData = (email) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users/user?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  return { user, loading, error };
};

// Custom hook for course data
const useCourseData = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch('./data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  return { courseData, loading, error };
};

// Navbar component selector
const NavbarSelector = ({ userRole }) => {
  switch (userRole) {
    case 'Learner':
      return <Navbar2 />;
    case 'Teacher':
    case 'University':
      return <Navbar1 />;
    default:
      return <Navbar1 />;
  }
};

// Main Courses component
const Courses = ({ auth, error: authError }) => {
  const email = auth?.user?.email || '';
  const { user, loading: userLoading } = useUserData(email);
  const { courseData, loading: courseLoading } = useCourseData();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Memoized values
  const isAuthenticated = useMemo(() => Boolean(auth?.isVerified), [auth?.isVerified]);
  const courseOneDone = useMemo(() => Boolean(auth?.courseOneDone), [auth?.courseOneDone]);
  const isUpdated = useMemo(() => Boolean(auth?.isupdated), [auth?.isupdated]);

  // Loading state
  if (userLoading || courseLoading) {
    return (
      <CoursesContainer>
        <ContentContainer maxWidth="xl">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
              Loading courses...
            </Typography>
          </Box>
        </ContentContainer>
      </CoursesContainer>
    );
  }

  // Render courses based on authentication and progress state
  const renderCourses = () => {
    const commonLayout = (children, showNavbar = true) => (
      <CoursesContainer>
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
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
                Course Catalog
              </Typography>
              <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                Explore our comprehensive Web3 and blockchain courses
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {showNavbar && <NavbarSelector userRole={user.role} />}
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="learn" style={{ padding: '10px' }}>
                    <br />
                    {children}
                  </div>
                </motion.div>
              </Grid>
            </Grid>
          </Box>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <ScrollToTopFab
              onClick={scrollToTop}
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
        </ContentContainer>
      </CoursesContainer>
    );

    // Case 1: Course completed and updated
    if (courseOneDone && isUpdated) {
      return commonLayout(<CourseList interactive={true} />);
    }

    // Case 2: Course completed but not updated
    if (courseOneDone) {
      return commonLayout(<CourseList interactive={true} />);
    }

    // Case 3: Verified but course not done
    if (isAuthenticated && !courseOneDone) {
      return commonLayout(<CourseList interactive={true} />);
    }

    // Case 4: Not verified - show clickable course links
    return commonLayout(
      <CourseList 
        interactive={false} 
        courseIds={COURSE_IDS}
        linkPattern="/courseDetails"
      />
    );
  };

  return renderCourses();
};

// Alert Dialog component
export const AlertDialog = ({ onConfirm, title = "Basic Concepts Course", description = "Are you sure that you want to take this course?" }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) {
      onConfirm();
    } else {
      window.location.href = '/courses/101/';
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select Course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="blue" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Redux connection
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(Courses);


