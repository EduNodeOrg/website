import React, { Component } from 'react'
import  withRouter from '../../withRouter';
import AlignItemsList from "./Posts.js"
import Comments from "./Comments"
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import Box from '@mui/material/Box';
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../Footer';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography,
  Fab
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
//import { Redirect, BrowserRouter } from "react-router-dom";
//import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import "./style.css"
import { updateAccount, saveUsernameAlbedo, pkeyGoogleUser } from "../../actions/authActions";
import Posts from "./Posts"
import Card from "./Card"
import Tweets from './tweets';
import PostList from "./PostList";
import Navbar1 from '../Dashboard/Navbar1';
import  { useState } from 'react';
import UserContext from '../Posts/UserContext';

const FeedContainer = styled(Box)(({ theme }) => ({
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

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
      userName: "",
      pkey: "",
      pubkey: "",
      isLoading: false,
      errors: {},
      items: Array.from({ length: 20 }),
      hasMore: true,
      showScrollTop: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentDidMount() {
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

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
        // this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
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
    )

    fetchMoreData = () => {
      if (this.state.items.length >= 50) {
        this.setState({ hasMore: false });
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
      setTimeout(() => {
        this.setState({
          items: this.state.items.concat(Array.from({ length: 20 }))
        });
      }, 500);
    };


    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
 
    };
    onSubmit = async values => {
  
      const email = this.props.auth.user.email
      const userName = values.userName
      const pkey = values.pkey
      
  
      // create user object
      const updateAccount = {
        email,
        userName,
        pkey
      };

      try {

       await this.props.updateAccount(updateAccount)
       
        if (this.props.auth.user) {
   
          this.props.history.push("/dashboard")
        }
  
  
      } catch (error) {
        console.log(error)
      }

    }

    onSubmitAlbedo = async values => {
  
      
      const userName = values.userName
      const pubkey = this.props.auth.user.pubkey
  
      // create user object
      const updateAccount = {
        userName,
        pubkey
        
      };
 

      try {

        await this.props.saveUsernameAlbedo(updateAccount)
    

        if (this.props.auth.user.pubkey) {
   
          // this.props.history.push("/dashboard")
          alert("Username is updated and will take effect of your next login")
        }
  
  
      } catch (error) {
        console.log(error)
      }

    }

    onSubmitGoogle = async values => {
  
      
      const email = this.props.auth.user.email
      const pkey = values.pkey
  
      // create user object
      const updateAccount = {
       email,
        pkey
        
      };
 

      try {

        await this.props.pkeyGoogleUser(updateAccount)


        if (this.props.auth.user.googleProfilePic) {
   
          // this.props.history.push("/dashboard")
          alert("Your public key has been updated and will take effect of your next login")
        }
  
  
      } catch (error) {
        console.log(error)
      }

    }
  
  render() {

    const email= this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "";
    const { showScrollTop } = this.state;

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    const { pristine, submitting } = this.props

    const {
      isLoading,
      isAuthenticated,
      isVerified,
      hasUsername,
      googleProfilePic,
      isGranted,
      isFirstCourseSelected,
    courseOneDone,
    } = this.props.auth;

    if (isAuthenticated && !isAuthenticated) {
     

      return ( 
  
        <>
 
 <UserContext.Provider value={this.state.email}>
      <div>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* <Grid xs={5} sm={3.5} md={2}>
          <Item><Sidebar props={email}/></Item>
        </Grid> */}
     
        <Grid xs={7} sm={8.5} md={20}>
          <Navbar1 />
          <br></br>
          <br></br>
          <br></br>
          <div>
          <Tweets />
     
   
          <div>
    
       
        <hr />
       
      </div>
         
</div>

          
        </Grid>
        
      </Grid>
      
    </Box>
        </div>
        
       
        </UserContext.Provider>
      </>
    )
  }
  // if (!this.props.auth.isAuthenticated) {
  //   return <Redirect to="/" />
  // }
  return ( 
  
    <>

<FeedContainer>
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
                Community Feed
              </Typography>
              <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                Stay connected with the EduNode community and discover the latest updates
              </Typography>
            </Box>
          </motion.div>

          <UserContext.Provider value={this.state.email}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Navbar1 />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Box sx={{ mt: 4 }}>
                      <Tweets />
                      <Box sx={{ mt: 4 }}>
                        <hr sx={{ borderColor: 'rgba(123, 47, 247, 0.3)' }} />
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Box sx={{ mt: 4 }}>
                      <PostList />
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </UserContext.Provider>
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
      </FeedContainer>
    </>
)

} 

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Feed = connect(
  mapStateToProps, { updateAccount, saveUsernameAlbedo, pkeyGoogleUser, verifyCode, clearErrors }
)(Feed);

export default Feed = reduxForm({
  form: "ReduxForm",
  fields: ["name", "pkey"],
  clearErrors,
  updateAccount,
  saveUsernameAlbedo,
  pkeyGoogleUser
  
})(withRouter(Feed));

