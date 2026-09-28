import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import { Field, reduxForm } from "redux-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import withRouter from '../../withRouter'
import "./style.css";
import NavBar from "../NavBar"
import { Navigate, Link } from "react-router-dom";
import { loadUser } from '../../actions/authActions';
import axios from 'axios';

const PageContainer = styled('div')(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: '48px',
}));

const VerifyCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '440px',
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(10, 14, 39, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(5, 4),
}));

const SubmitButton = styled(Button)(() => ({
  width: '100%',
  padding: '12px 16px',
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  },
  '&.Mui-disabled': {
    background: 'rgba(123, 47, 247, 0.3)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

const darkFieldSx = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': { borderColor: 'rgba(123, 47, 247, 0.4)' },
    '&:hover fieldset': { borderColor: '#7b2ff7' },
    '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
  },
  '& .MuiInputLabel-root': { color: '#b8c5d6' },
  '& .MuiFormHelperText-root': { color: '#ff8888' },
};

const validate = values => {
  const errors = {};
  const requiredFields = ["confirmationCode"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values.confirmationCode && values.confirmationCode.length < 5) {
    errors.confirmationCode = "Confirmation Code must be at least 5 characters";
  }
  return errors;
};


class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCode: "",
      isLoading: false,
      errors: {},
      results: {},
      values: {},
      isVerified: false,
      email: "",
      user: {},
      resendMsg: null,
      verifyError: null,
      verifySuccess: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isVerified: PropTypes.bool,
  };
  componentDidMount() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const email = this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : '';
    this.props.loadUser(email);

    axios.get(`https://edunode.herokuapp.com/api/emaillogin/user/${user.email}`)
    .then(response => {
      this.setState({ user: response.data });
    })
    .catch(error => {
      console.error(error);
    });
  }

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
      sx={darkFieldSx}
      {...input}
      {...custom}
    />
  );

  resendEmail = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    resend(user.email);
    this.setState({ resendMsg: `A confirmation code has been sent to ${this.props.auth.user.email}. Please also check your spam folder.` });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
 
 


  onSubmit = async (values) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (!user || !user.email || !user.confirmationCode) {
      return;
    }
    const email = user.email;
    const vCode = user.confirmationCode;
    const id = user.id;
    const inputcode = values.confirmationCode;
    const verifyUser = {
      email,
      inputcode,
      id
    };

    try {
      await this.props.verifyCode(verifyUser);
      if (inputcode === vCode) {
        this.setState({ verifySuccess: "Verification successful! Redirecting...", verifyError: null });
      } else {
        this.setState({ verifyError: "Verification failed: invalid code", verifySuccess: null });
      }
    } catch (error) {
      this.setState({ verifyError: "Verification failed. Please try again.", verifySuccess: null });
    }
  };

  render() {
    const { pristine, submitting } = this.props;
    const { isLoading, isVerified, isAuthenticated } = this.props.auth
    if (isLoading) {

      return <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}> <CircularProgress
          color="secondary"
        />
      </div>
    }
    if (isVerified) {
      return (
        <Navigate to="/preferences" />
      );
    }
    if (!isAuthenticated && !isVerified) {

      return (
        <Navigate to="/" />
      );
    }
    if (isAuthenticated && !isVerified) {
      return (
        <PageContainer>
          <NavBar />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              px: 2,
              pt: 14,
            }}
          >
            <VerifyCard elevation={0}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  mb: 1,
                  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Verify your email
              </Typography>
              <Typography variant="body2" sx={{ color: '#b8c5d6', textAlign: 'center', mb: 3 }}>
                We sent a verification code to your email. Check your inbox (and spam folder), then enter the code below.
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                Didn’t receive it?{' '}
                <Button
                  size="small"
                  onClick={this.resendEmail}
                  sx={{ textTransform: 'none', fontWeight: 600, p: 0, minWidth: 'auto', verticalAlign: 'baseline' }}
                >
                  Resend code
                </Button>
              </Alert>

              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field
                    component={this.renderTextField}
                    value={this.state.confirmationCode}
                    type="text"
                    label="Confirmation Code"
                    name="confirmationCode"
                    id="code"
                  />
                  <SubmitButton
                    variant="contained"
                    type="submit"
                    disabled={pristine || submitting || isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
                  </SubmitButton>

                  {this.state.resendMsg && (
                    <Alert severity="info">{this.state.resendMsg}</Alert>
                  )}
                  {this.state.verifySuccess && (
                    <Alert severity="success">{this.state.verifySuccess}</Alert>
                  )}
                  {this.state.verifyError && (
                    <Alert severity="error">{this.state.verifyError}</Alert>
                  )}
                  {this.props.error.msg.msg && (
                    <Alert severity="error">{this.props.error.msg.msg}</Alert>
                  )}
                </Box>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  <Link to="/" style={{ color: '#8fa3bf' }}>
                    Return to Home
                  </Link>
                </Typography>
              </Box>
            </VerifyCard>
          </Box>
        </PageContainer>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  error: state.error,
});

VerifyEmail = connect(
  mapStateToProps, { loadUser, verifyCode, clearErrors }
)(VerifyEmail);

export default VerifyEmail = reduxForm({
  form: "VerifyEmailForm",
  fields: ["confirmationCode"],
  validate,
  clearErrors,
  verifyCode,
  loadUser
})(withRouter(VerifyEmail));
