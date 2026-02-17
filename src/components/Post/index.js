import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import { Field, reduxForm } from "redux-form";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { KeyboardArrowUp } from '@mui/icons-material';
import "./style.css";
import withRouter from '../../withRouter';
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import SideBar from "../SideBar";
import { Navigate } from "react-router-dom";

const PostContainer = styled(Box)(({ theme }) => ({
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

const validate = values => {
  const errors = {};
  const requiredFields = ["firstName", "secondName"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values.confirmationCode && values.confirmationCode.length < 4) {
    errors.confirmationCode = "Confirmation Code must be at least 5 characters";
  }
  return errors;
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCode: "",
      isLoading: false,
      errors: {},
      results: {},
      values: {},
      isVerified: false,
      showScrollTop: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
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
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isVerified: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "VERIFICATION_FAIL") {
        this.setState({ msg: error.msg.msg });
        console.log(error.msg.msg)
      } else {
        this.setState({ msg: null });
      }
    }

  }

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

  resendEmail = () => {
    // alert("clicked")
    // e.preventDefault();
    let email = this.props.auth.user.email;

    resend(email);

    alert(
      `A confirmation code has be sent to ${email}, please also check your spam folder`
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  

onSubmit = async (values, dispatch) => {

const email = this.props.auth.user.email;
const inputcode = values.confirmationCode;
// const { isLoading, isVerified } = this.props.auth;

const verifyUser = {
  email,
  inputcode
}

this.props.verifyCode(verifyUser)

// this.props.clearErrors()

  };

forwardUser = () => {
  
}
  
  render() {
    const { pristine, submitting } = this.props;
    const { isLoading, isVerified, isAuthenticated, showScrollTop } = this.props.auth;

    if (isLoading) {
      return (
        <PostContainer>
          <ContentContainer maxWidth="xl">
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress color="secondary" />
              <Typography variant="h6" sx={{ color: '#b8c5d6', mt: 2 }}>
                Loading...
              </Typography>
            </Box>
          </ContentContainer>
        </PostContainer>
      );
    }
    
    if (isAuthenticated && isVerified) {
      return (
        <PostContainer>
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
                  Create Post
                </Typography>
                <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                  Share your knowledge with the EduNode community
                </Typography>
              </Box>
            </motion.div>

            <Row>
              <Col xs={2} id="sidebar-wrapper">      
                <SideBar />
              </Col>
              <Col xs={10} id="page-content-wrapper">
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(123, 47, 247, 0.2)',
                  color: '#ffffff'
                }}>
                  <Typography variant="h5" sx={{ color: '#00d4ff', mb: 2 }}>
                    Post Content
                  </Typography>
                  {/* Add your post form here */}
                </Box>
              </Col> 
            </Row>

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
          </ContentContainer>
        </PostContainer>
      );
    }
    return (
      <Navigate to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Profile = connect(
  mapStateToProps, { verifyCode, clearErrors }
  )(Profile);

export default Profile = reduxForm({
  form: "profileForm",
  fields: ["firstName", "secondName"],
  validate,
  clearErrors,
  verifyCode
})(withRouter(Post));
