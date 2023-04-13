import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {setQuestionOneValid} from "../../../actions/authActions"
import { Redirect, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFail: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);
   const history = useHistory();

  const timer = React.useRef();


  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFail]: fail,

  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
         
    setLoading(true);

    
    if (!loading) {


        if (
          props.state.checknone === true
        ) {
          setLoading(false);
          alert('please select an option');
        }
          if (props.state.checkone === true) {
            timer.current = window.setTimeout(() => {
              const useremail = props.props.email
        
              setSuccess(true);

              setLoading(false);
          
      
          
               
             
            
              alert(
                'Correct answer! Congrats, You have succesfully finished the first course!',
              );
        
            
              history.push('/courses/101/done');
              
            }, 2000);
          }
        if (props.state.checktwo === true) {
          timer.current = window.setTimeout(() => {
               setFail(true);
            setLoading(false);
            alert('Wrong answer, please try again!');
            
          

          }, 2000);
   
        }
        if (props.state.checkthree === true) {
          timer.current = window.setTimeout(() => {
                          setFail(true);
                          setLoading(false);
                          alert('Wrong answer, please try again!');
             
            
            
          }, 2000);
      }
      if (props.state.checkfour === true) {
        timer.current = window.setTimeout(() => {
          setFail(true);
          setLoading(false);
          alert('Wrong answer, please try again!');
        }, 2000);
      }
      }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            className={classes.fabProgress}
          />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Check
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
          />
        )}
      </div>
    </div>
  );
}