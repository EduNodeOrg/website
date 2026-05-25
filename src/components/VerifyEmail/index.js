import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import { Field, reduxForm } from "redux-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@mui/material/CircularProgress"
import withRouter from '../../withRouter'
import "./style.css";
import NavBar from "../NavBar"
import Grid from '@mui/material/Grid';
import { Navigate } from "react-router-dom";
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
          <div>

              <Grid container spacing={2}>
                <Grid item={true} xs={7} sm={8.5} md={20}>
                  <NavBar />
                  <div>
                    <div className="centered">

                    </div>
                    <div className="centered">

                    </div>
                    <div className="centered">
                      <Container>
                        <Row>
                          <Alert className="text-center" severity="warning">

                            We have sent a verification a code to your email
                            , please check your inbox (or
                            in spam folder) and enter the code below to verify your account or
                            click{" "}
                            <Button onClick={this.resendEmail} type="submit">
                              <b>here</b>
                            </Button>{" "}
                            if you would like us to resend the email.{" "}
                          </Alert>
                          <br></br>
                          <br></br>

                          <form id="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div>
                              <Field
                                component={this.renderTextField}
                                value={this.state.confirmationCode}
                                type="text"
                                label="Confirmation Code"
                                name="confirmationCode"
                                id="code"
                                style={{ width: '350px' }}
                              />
                            </div>
                            <div>
                              <Button
                                variant="contained"
                                id="button"
                                type="submit"
                                disabled={pristine || submitting}
                                style={{ width: '350px' }}
                              >
                                Verify
                              </Button>
                            </div>
                            {this.state.resendMsg && (
                              <Alert severity="info" style={{ marginTop: '16px' }}>
                                {this.state.resendMsg}
                              </Alert>
                            )}
                            {this.state.verifySuccess && (
                              <Alert severity="success" style={{ marginTop: '16px' }}>
                                {this.state.verifySuccess}
                              </Alert>
                            )}
                            {this.state.verifyError && (
                              <Alert severity="error" style={{ marginTop: '16px' }}>
                                {this.state.verifyError}
                              </Alert>
                            )}
                            {this.props.error.msg.msg && (
                              <Alert severity="error" style={{ marginTop: '16px' }}>
                                {this.props.error.msg.msg}
                              </Alert>
                            )}
                          </form>
                        </Row>


                      </Container>
                    </div>
                  </div>

                </Grid>







              </Grid>
              < br />
              < br />
              < br />
              < br />
              < br />
              < br />
              < br />< br />
              < br />
              < br />
              < br />
              < br />
              
            
          </div>
          < br />

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
