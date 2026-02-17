import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import basic from "./basic.PNG"
import {
  Button,
} from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import { Redirect, BrowserRouter, Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setCourseOne } from "../../actions/authActions"
import Chip from "./Chip.js"
import albedologo from "./albedo.png"
import albedo from '@albedo-link/intent'
import axios from 'axios';
import { Image } from 'react-bootstrap';

const isLastCourse = (courseId) => {
  // List of all course IDs in order
  const courseIds = [
    '644bcdd1e1fec0f4f55a7447', // Course 1
    '644bcdeee1fec0f4f55a7449', // Course 2
    '644bce0be1fec0f4f55a744b', // Course 3
    '644bce24e1fec0f4f55a744d', // Course 4
    '644bce41e1fec0f4f55a744f', // Course 5
    '6464e2968aca412ed2d81bef', // Course 6
    '6464e2b48aca412ed2d81bf1', // Course 7
    '6464e2d58aca412ed2d81bf3', // Course 8
    '646b83386cea9a0294e65253', // Course 9
    '647603a1c8c864e8a6195e00', // Course 10
    '6841abca38a24bd982c9d70a'  // Course 11 (last course)
  ];
  
  // Check if the current course is the last one in the array
  return courseIds.indexOf(courseId) === courseIds.length - 1;
};

const CelebrationModal = ({ open, onClose, certificateData }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle style={{ textAlign: 'center', fontSize: '2rem', color: '#4CAF50' }}>
        🎉 Congratulations! 🎉
      </DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          You've successfully completed all courses!
        </Typography>
        {certificateData && (
          <>
            <Typography variant="body1" paragraph>
              Your certificate has been generated and sent to your email.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '20px 0' }}
              onClick={() => window.open(certificateData.ipfsUrl, '_blank')}
            >
              View Certificate
            </Button>
            <Typography variant="body2" color="textSecondary">
              Certificate ID: {certificateData.certificateNumber}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClose();
            window.location.href = '/dashboard'; // Redirect to dashboard or certificate gallery
          }}
        >
          Back to Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TrophyNotification = ({ open, onClose, trophyType }) => {
  const trophyMessages = {
    course: 'Course Completion Badge',
    challenge: 'Challenge Master',
    final: 'All Courses Completed!'
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>🏆 Achievement Unlocked!</DialogTitle>
      <DialogContent>
        <Typography>You've earned a new trophy:</Typography>
        <Typography variant="h6" style={{ margin: '10px 0' }}>
          {trophyMessages[trophyType] || 'Great Job!'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {trophyType === 'final' 
            ? 'You have successfully completed all available courses! Your dedication is impressive!'
            : 'Keep learning to unlock more achievements!'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [isLastCourseCompleted, setIsLastCourseCompleted] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [trophyType, setTrophyType] = useState('course');
  const [error, setError] = useState(null);

  const showTrophyNotification = (type = 'course') => {
    setTrophyType(type);
    setShowTrophy(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (e) => {
    setOpen(false);
    const currentCourseId = '644bcdd1e1fec0f4f55a7447';
    
    try {
      // Mark course as completed in the backend and get certificate data
      const response = await axios({
        method: 'post',
        url: 'https://edunode.herokuapp.com/api/certificates/diploma',
        data: {
          name: props.user?.name || 'Student',
          email: props.user?.email,
          pkey: props.user?.publicKey,
          courseId: currentCourseId
        },
        timeout: 30000 // 30 second timeout
      });

      console.log('Certificate API Response:', response.data);
      
      if (!response.data || !response.data.certificateNumber) {
        throw new Error('Invalid certificate data received');
      }
      
      // Show trophy notification
      showTrophyNotification('course');
      
      // Check if this was the last course
      if (isLastCourse(currentCourseId)) {
        setIsLastCourseCompleted(true);
        setCertificateData(response.data);
        setIsCelebrating(true);
        
        try {
          await axios.put('https://edunode.herokuapp.com/api/certificates/increment-trophy', {
            email: props.user?.email
          });
          showTrophyNotification('final');
        } catch (trophyError) {
          console.error('Error updating trophy:', trophyError);
          // Continue with redirection even if trophy update fails
        }
      }
      
      // Redirect to certificate page
      const redirectUrl = `/certificates/${response.data.certificateNumber}`;
      console.log('Redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error('Error completing course:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Show error to user
      setError({
        title: 'Error Completing Course',
        message: error.response?.data?.message || 'Failed to generate certificate. Please try again later.'
      });
      
      // Fallback to course page after showing error
      setTimeout(() => {
        window.location.href = '/courses/101/';
      }, 5000);
    }
  };

  return (
    <div>

      <Button
   style={{ width: '207px', height: "40px" }}
            variant="contained"
        color="default"

            onClick={() => {

              albedo.publicKey({

              })
                .then(res => {
                  // console.log(res)
                  // const granted = res.granted
                  const intent = res.intent
                  // const network = res.network
                  const pubkey = res.pubkey
                  const signature = res.signature
                  const signed_message = res.signed_message

                  const userName = ""
                  

                  // const session = res.session
                  // const valid_until = res.valid_until

                  const newAlbedoUser = {

                    intent,
                    pubkey,
                    signature,
                    signed_message,
                    userName,
                  
                  }

                  this.props.albedoAuth(newAlbedoUser)

                })
            }}> Login with<Image style={{ width: '55px' }} src={albedologo} />
          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to take this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <CelebrationModal
        open={isCelebrating}
        onClose={() => setIsCelebrating(false)}
        certificateData={certificateData}
      />
      <TrophyNotification
        open={showTrophy}
        onClose={() => setShowTrophy(false)}
        trophyType={trophyType}
      />
      {error && (
        <Dialog
          open={true}
          onClose={() => setError(null)}
        >
          <DialogTitle>{error.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{error.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setError(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    background: 'white',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  drawerPaper: { background: 'blue' },
}));



function Course1(props) {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        // className={classes.drawerPaper}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={basic}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  In this course, you will learn the basic concepts of
                  the Stellar Network.!
                </Typography>
                <Typography variant="body2" gutterBottom></Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                ></Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                >
                  {/* <Button onClick={() => {
                    
                }}>Go</Button> */}
                  <AlertDialog />
                  {/* <Link to="/courses/101/"> Select </Link> */}
                  <Chip />
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Course1;