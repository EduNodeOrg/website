import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, TextField, Typography, Box, Alert, InputAdornment, IconButton, Divider, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { CircularProgress } from "@mui/material"
import "./style.css";
import { connect } from 'react-redux'
import {
  Link
} from "react-router-dom";
import { isConnected, getPublicKey } from "@stellar/freighter-api";
import NavBar from "../NavBar"
import albedo from '@albedo-link/intent'
import albedologo from "./img/albedo.png"
import flogo from "./img/flogo.png"
//import { ConstructionOutlined } from '@mui/icons-material'
import { clearErrors } from "../../actions/errorActions";
import { register, confirm, webThreeAuth } from "../../actions/authActions";
import { Navigate } from "react-router-dom";

const PageContainer = styled('div')(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: '48px',
}));

const SignupCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '440px',
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(10, 14, 39, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(5, 4),
}));

const WalletButton = styled(Button)(() => ({
  width: '100%',
  justifyContent: 'center',
  gap: '10px',
  padding: '10px 16px',
  borderColor: 'rgba(123, 47, 247, 0.5)',
  color: '#d5deeb',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    borderColor: '#00d4ff',
    background: 'rgba(0, 212, 255, 0.08)',
  },
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
  const errors = {}
  const requiredFields = [
    'email',
    "password",
    "confirmPassword"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  if (values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match'
  }
  return errors
}

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name:'',
      password: "",
      confirmPassword: "",
      isLoading: false,
      errors: {},
      errorMsg: null,
      showPassword: false,
      showConfirmPassword: false
    }
    // this.handleEmailChange = this.handleEmailChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)


  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    register: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired

  }



  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
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
  )

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (values) => {
    this.setState({ errors: {}, isLoading: true })

    const email = values.email
    const password = values.password
    const name = values.name

    // create user object
    const newUser = {
      email,
      password,
      name
    };

    // attempt to register
    try {
      await this.props.register(newUser)
      if (this.props.auth.user) {
        return (
          <Navigate to="/dashboard" />
        );
      }
      // await this.props.confirm(confirmUser)
      // if (this.props.auth) {
      //   console.log(this.props.auth)

      //   // this.props.history.push("/dashboard")
      // } else {
      //   alert("oops something went wrong")
      // }

    } catch (error) {

      this.setState({ errorMsg: error.response.data.msg });
      console.log(error);

    } finally {
      this.setState({ isLoading: false });
    }
    // this.setState({ isLoading: false })
    // console.log(this.props)

  }


  render() {

    const freighterHandler = async () => {
      if (isConnected()) {
        const publicKey = await getPublicKey();
        void publicKey;
      }

      // alert("not conected")

    }

    const albedoHandler = () => {

      albedo.publicKey({

      })
        .then(res => {
          const intent = res.intent
          const pubkey = res.pubkey
          const signature = res.signature
          const signed_message = res.signed_message
          const userName = ""
          const newAlbedoUser = {
            intent,
            pubkey,
            signature,
            signed_message,
            userName,

          }

          this.props.albedoAuth(newAlbedoUser)

        })
    }

    const { pristine, submitting } = this.props
    const { isLoading, isAuthenticated, isVerified } = this.props.auth
    if (isAuthenticated && !isVerified) {

      return (
        <Navigate to="/VerifyEmail" />
      );

    }
    if (isAuthenticated && isVerified) {
      return (
        <Navigate to="/dashboard" />

      );

    }
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
          <SignupCard elevation={0}>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
                Create your account
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#b8c5d6', textAlign: 'center', mb: 4 }}
              >
                Choose your sign up method to get started
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                <WalletButton onClick={albedoHandler} variant="outlined">
                  <img src={albedologo} alt="" style={{ height: 22 }} />
                  Sign up with Albedo
                </WalletButton>
                <WalletButton onClick={freighterHandler} variant="outlined">
                  <img src={flogo} alt="" style={{ height: 22 }} />
                  Sign up with Freighter
                </WalletButton>
              </Box>

              <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.3)', color: '#8fa3bf', mb: 3, fontSize: '0.8rem' }}>
                or with email
              </Divider>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Field
                  name="name"
                  type="text"
                  label="Full Name"
                  component={this.renderTextField}
                  value={this.state.name}
                />
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  component={this.renderTextField}
                  value={this.state.email}
                />
                <Field
                  name="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  component={this.renderTextField}
                  value={this.state.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                          edge="end"
                          size="small"
                          sx={{ color: '#b8c5d6' }}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Field
                  name="confirmPassword"
                  type={this.state.showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  component={this.renderTextField}
                  value={this.state.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })}
                          edge="end"
                          size="small"
                          sx={{ color: '#b8c5d6' }}
                        >
                          {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              <SubmitButton
                variant="contained"
                type="submit"
                disabled={pristine || submitting || isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </SubmitButton>

              {this.state.errorMsg && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {this.state.errorMsg}
                </Alert>
              )}
              {this.props.error.msg.msg && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {this.props.error.msg.msg}
                </Alert>
              )}

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                  Already have an account?{' '}
                  <Link to="/loginn" style={{ color: '#00d4ff' }}>
                    Log in
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Link to="/" style={{ color: '#8fa3bf' }}>
                    Return
                  </Link>
                </Typography>
              </Box>
            </form>
          </SignupCard>
        </Box>
      </PageContainer>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

Register = connect(
  mapStateToProps, { register, confirm, clearErrors, webThreeAuth }
)(Register)

export default reduxForm({
  form: "RegisterReduxForm",
  fields: ['email', 'password', "confirmPassword"],
  register,
  confirm,
  validate,
  clearErrors,
  webThreeAuth
})(Register)


