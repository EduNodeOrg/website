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
    'Distributed Ledger Technology (DLT):',
    'Consensus Mechanisms:',
    'Smart Contracts:',
    'Privacy:',
    'Identity Management:',
    'Modularity:',
    'Conclusion:',
    
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Hyperledger is an open-source blockchain platform that was created by the Linux Foundation in 2015. It is designed to support enterprise blockchain applications with a focus on scalability, privacy, and security. Hyperledger is not a cryptocurrency, but rather a distributed ledger technology (DLT) that is used to build decentralized applications for businesses. In this post, we will cover the most important features and definitions of Hyperledger.`;
    case 1:
      return 'Hyperledger is a distributed ledger technology (DLT) that allows for the creation of a shared and decentralized database that can be accessed by all participants in a network. The ledger is distributed across all the nodes in the network, and each node has a copy of the ledger. This means that there is no need for a central authority to verify transactions or maintain the ledger.';
    case 2:
      return 'Hyperledger uses different consensus mechanisms to verify transactions and maintain the integrity of the ledger. One of the most popular consensus mechanisms used by Hyperledger is the Practical Byzantine Fault Tolerance (PBFT) algorithm. PBFT is a fault-tolerant consensus algorithm that allows for fast transaction confirmation and is designed to be resistant to malicious attacks.';
    case 3:
      return 'Hyperledger allows for the creation of smart contracts, which are self-executing contracts that can automate the negotiation and execution of agreements between parties. Smart contracts are written in programming languages such as Go or Java and are executed on the Hyperledger blockchain.';
    case 4:
      return `Hyperledger provides different levels of privacy for transactions, depending on the needs of the application. This is achieved through the use of different technologies such as channels, which allow for private communication between specific parties, and Fabric Private Data Collections, which allow for the storage of private data within a channel.`;
    case 5:
      return `Hyperledger provides robust identity management capabilities, which enable participants to authenticate themselves on the network and control access to resources. This is achieved through the use of digital certificates and access control lists (ACLs).`;
    case 6:
      return `Hyperledger is a modular platform, which means that different components can be swapped out and replaced with other components as needed. This enables developers to customize the platform to meet the specific needs of their application.`;
    case 7:
      return `Hyperledger is a powerful blockchain platform that provides enterprise-grade features and capabilities. It is designed to support the creation of decentralized applications for businesses and provides different levels of privacy, identity management, and modularity. Hyperledger is a rapidly evolving technology, and developers who are interested in building applications on the platform should stay up-to-date with the latest developments and best practices.`;
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
            <Link to="/courses/105/1" className={classes.button}>
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
    navigate('/courses/105');
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
      activeProgress: prevState.activeProgress + 10,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
      activeProgress: prevState.activeProgress - 10,
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