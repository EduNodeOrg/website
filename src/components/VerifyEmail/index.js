import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import { Field, reduxForm } from "redux-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import withRouter from '../../withRouter'
import "./style.css";
import NavBar from "../NavBar"
import { Navigate, Link } from "react-router-dom";
import { loadUser } from '../../actions/authActions';
import axios from 'axios';

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
      const data = response.data;
      console.log('dataaaaa',data) 
      this.setState({ user: response.data }, () => {
        console.log('useerrr', this.state.user);
      });
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
      console.log("Invalid user object:", user);
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
    console.log("Verify user:", verifyUser);

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
        <div>
          <NavBar />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
            px={2}
          >
            <Paper elevation={3} sx={{ maxWidth: 480, width: '100%', p: 4, borderRadius: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Verify your email
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
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
                <Box display="flex" flexDirection="column" gap={2}>
                  <Field
                    component={this.renderTextField}
                    value={this.state.confirmationCode}
                    type="text"
                    label="Confirmation Code"
                    name="confirmationCode"
                    id="code"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={pristine || submitting || isLoading}
                    fullWidth
                    size="large"
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
                  </Button>

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

              <Box textAlign="center" mt={3}>
                <Typography variant="body2">
                  <Link to="/" style={{ color: 'inherit' }}>
                    Return to Home
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </div>
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
