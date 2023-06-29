import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
//import ProgressBar from 'react-bootstrap/ProgressBar';
import Box from '@mui/material/Box';
import NavBar from '../../NavBar';
import Navbar from '../../Dashboard/Navbar1';
import { connect } from 'react-redux';
import { clearErrors } from '../../../actions/errorActions';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import Precourse from "../Precourse.js"






const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    'Introduction:',
    'What is Soroban?:',
    'Key Features of Soroban:',
    'Benefits of Soroban:',
    'Conclusion:',
    
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Soroban is a smart contracts platform designed to be sensible, built-to-scale, batteries-included, and developer-friendly.It is designed to provide developers with an easy-to-use platform for creating and deploying smart contracts that can be used in a wide range of applications.\
      In this course post, we will take a closer look at the Soroban smart contract platform and explore some of its key features and benefits.`;
    case 1:
      return 'Soroban is a smart contract platform that is built on top of the Stellar blockchain.  It is designed to provide developers with an easy-to-use platform for creating and deploying smart contracts that can be used in a wide range of applications.\
      Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code. The code and the agreements contained therein exist on a blockchain network, and the smart contract will automatically execute when certain conditions are met.\
      Soroban is designed to be a flexible and scalable smart contract platform that can be used in a wide range of applications, like financial services.';
    case 2:
      return '1-Easy to use: Soroban is designed to be easy to use, even for developers who are not familiar with blockchain technology. The platform comes with a user-friendly interface that makes it easy to create and deploy smart contracts.\
      2-Scalability: Soroban is built on top of the Stellar blockchain, which is known for its scalability. This means that Soroban can handle a large number of transactions without slowing down or becoming congested.\
      3-Security: Soroban uses advanced security measures to ensure that smart contracts are secure and cannot be tampered with. The platform also has a built-in auditing system that can be used to track and monitor transactions.\
      4-Interoperability: Soroban is designed to be interoperable with other blockchain networks and traditional financial systems. This means that it can be used in a wide range of applications and can integrate with existing systems and processes.';
    case 3:
      return 'Cost-effective: Soroban is a cost-effective way to create and deploy smart contracts. It eliminates the need for intermediaries and reduces transaction costs, making it an ideal platform for businesses looking to save money on transactions.\
      Faster transactions: Soroban is built on top of the Stellar blockchain, which is known for its fast transaction times. This means that smart contracts can be executed quickly and efficiently, reducing delays and improving overall efficiency.\
      Enhanced transparency: Soroban provides enhanced transparency and accountability by enabling users to track and monitor transactions in real-time. This can help to prevent fraud and improve overall trust in the system.\
      Improved efficiency: Soroban can help to improve efficiency by automating many of the processes involved in creating and executing smart contracts. This can save time and reduce errors, improving overall efficiency and productivity.';
    case 4:
      return `Soroban is a powerful smart contract platform that is designed to be easy to use, scalable, and secure. It can be used in a wide range of applications, from financial services to supply chain management, and provides a cost-effective and efficient way to create and deploy smart contracts. If you are a developer looking to create smart contracts for your business, Soroban is definitely worth considering.`;
    default:
      return 'Unknown step';
  }
}


export function VerticalLinearStepper(props) {
  const classes = useStyles();
  
  const steps = getSteps();
  const { activeStep, handleNext, handleBack } = props;

 

  return (
    <>
      <Precourse />
      <div className={classes.root} >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      type="button"
                      label="back"
                      id="back"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? 'Finish'
                        : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            className={classes.resetContainer}
          >
            <Typography>
              Course completed - Now get ready for the
              Quiz.
            </Typography>
            <Link to="/courses/106/1" className={classes.button}>
              Continue
            </Link>
          </Paper>
        )}
      </div>
    </>
  );

}





class Intro extends Component {
  navigateTo = () => {
    const navigate = useNavigate();
    navigate('/courses/106');
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      activeStep: 0,
      activeProgress: 0,
      stepone: 10,
      isLoading: false,
      errors: {},
    };
    this.onChangeOne = this.onChange.bind(this);
  }


  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
      activeProgress: prevState.activeProgress + 20,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
      activeProgress: prevState.activeProgress - 20,
    }));
  };

  onChange = (e) => {
    // e.preventDefault();
    console.log('Please select a value');
  };

  render(props, state) {
    const { activeStep, activeProgress } = this.state;
    const progress = this.state.progress
    return (
      <div>
        <Navbar></Navbar>
        <LinearProgressWithLabel value={activeProgress} />
        <VerticalLinearStepper
          activeStep={activeStep}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Intro = connect(mapStateToProps, { clearErrors })(Intro);

export default Intro = reduxForm({
  form: '',
  fields: [''],
  clearErrors,

})(Intro);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
// });

function LinearWithValueLabel(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(props.props);

  React.useEffect(() => {
    //  setProgress(prev => prev + 10)
  }, []);
  // const now = 60;

  return (
    <div className={classes.root}>


      {/* <ProgressBar now={now} label={`${now}%`} /> */}

    </div>
  );
}