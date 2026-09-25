/*global google*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, TextField, Typography, Box, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom"
import { clearErrors } from "../../actions/errorActions";
import "./style.css";
import { connect } from 'react-redux';
import { albedoAuth, metamaskAuth, login, googleLogin, verifyGoogleUser, verifyTwitterUser, webThreeAuth, freighterAuth, mozartAuth } from "../../actions/authActions";
import NavBar from "../NavBar";
import { isConnected, getPublicKey } from "@stellar/freighter-api";
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import Alert from '@mui/material/Alert';
import { Navigate } from "react-router-dom";
import albedo from '@albedo-link/intent';
import metamaskLogo from './metamask.png';
import freighterLogo from './flogo.png';
import albedoLogo from './albedo.png';

const PageContainer = styled('div')(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: '48px',
}));

const LoginCard = styled(Paper)(({ theme }) => ({
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
    "password"
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
  return errors
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      user: {},
      errors: {},
      token: '',
      showError: false 
    }
    this.handleCallBackResponse = this.handleCallBackResponse.bind(this);

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  async handleCallBackResponse(token) {
    const userObject = jwt_decode(token);

    const email = userObject.email;
    const name = userObject.name;
    const image =userObject.picture;



    const { user } = this.state;

    try {
      const newUser = {
        email,
        name,
        image
      }
      await this.props.googleLogin(newUser);
      console.log('googlelogin executed');
      if (this.props.user) {
        this.props.navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      console.log('googlelogin failed');
    }


    if (this.props.user && typeof google !== 'undefined') {
      this.props.navigate('/dashboard');
    }


  }

  handleLoginSuccess = (tokenResponse) => {
    // perform any other actions on successful login
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }



  /*componentDidMount() {



    google.accounts.id.initialize({
      client_id:
        '249576166536-ctede4ekn8eipj22eucggedpbpirg6dc.apps.googleusercontent.com',
      callback: this.handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }
*/


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


  onSubmit = (values) => {
    const email = values.email;
    const password = values.password;
    const newUser = {
      email,
      password
    };
  
    this.props.login(newUser)
      .then(() => {
        if (this.props.auth.user) {
          return <Navigate to="/dashboard" />;
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showError: true });
      });
  };
  



  render() {




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

    const handleMetamask = async (e) => {
      e.preventDefault()
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
      }

      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //  window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts !== undefined) {
          await this.props.metamaskAuth(accounts)

          return (
            <Navigate to="/dashboard" />
          );
        }

      } else {
        alert("Please install metamask")

      }



    }




    const freighterHandler = async () => {

      if (isConnected()) {

        const pkey = await getPublicKey();

        await this.props.freighterAuth(pkey)

        return (
          <Navigate to="/dashboard" />
        );

      }

      // alert("not conected")

    }


    const { showError } = this.state;
    const { pristine, submitting, token} = this.props
    const { isLoading, isAuthenticated, isVerified } = this.props.auth

    if (isLoading) {
      return <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>

        <CircularProgress
          color="secondary"
        />

      </div>

    }
    if (isAuthenticated && !isVerified) {
      return (
        <Navigate to="/VerifyEmail" />
      );
    }
    if (isAuthenticated && isVerified) {
      //  <p class="loading">Lding...</p> <CircularProgress color="secondary" />

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
          <LoginCard elevation={0}>
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
                Welcome back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#b8c5d6', textAlign: 'center', mb: 4 }}
              >
                Choose your login method to continue
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <GoogleLogin
                  type="standard"
                  theme="filled_black"
                  onSuccess={credentialResponse => {
                    // axios post request to backend to store the token
                    const token=credentialResponse.credential
                    this.props.handleSubmit(this.handleCallBackResponse(token))
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </Box>

              <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.3)', color: '#8fa3bf', mb: 3, fontSize: '0.8rem' }}>
                or connect a wallet
              </Divider>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                <WalletButton onClick={handleMetamask} variant="outlined">
                  <img src={metamaskLogo} alt="" style={{ height: 22 }} />
                  Login with MetaMask
                </WalletButton>
                <WalletButton onClick={freighterHandler} variant="outlined">
                  <img src={freighterLogo} alt="" style={{ height: 22 }} />
                  Login with Freighter
                </WalletButton>
                <WalletButton onClick={albedoHandler} variant="outlined">
                  <img src={albedoLogo} alt="" style={{ height: 22 }} />
                  Login with Albedo
                </WalletButton>
              </Box>

              <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.3)', color: '#8fa3bf', mb: 3, fontSize: '0.8rem' }}>
                or with email
              </Divider>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Field
                  name="email"
                  type="text"
                  label="Email"
                  component={this.renderTextField}
                  value={this.state.email}
                />
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  component={this.renderTextField}
                  value={this.state.password}
                />
              </Box>

              <SubmitButton
                variant="contained"
                type="submit"
                disabled={pristine || submitting}
              >
                Login
              </SubmitButton>

              {showError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Login failed. Please check your credentials and try again!
                </Alert>
              )}

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ color: '#00d4ff' }}>
                    Sign up
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Link to="/forgot_password" style={{ color: '#00d4ff' }}>
                    Forgot your password?
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Link to="/" style={{ color: '#8fa3bf' }}>
                    Return
                  </Link>
                </Typography>
              </Box>
            </form>
          </LoginCard>
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

Login = connect(
  mapStateToProps, { login, googleLogin, verifyGoogleUser, verifyTwitterUser, clearErrors, albedoAuth, webThreeAuth, freighterAuth, mozartAuth, metamaskAuth }
)(Login)

export default reduxForm({
  form: "LoginReduxForm",
  fields: ['email', 'password'],
  login,
  googleLogin,
  validate,
  clearErrors,
  verifyGoogleUser,
  albedoAuth,
  verifyTwitterUser,
  webThreeAuth,
  freighterAuth,
  mozartAuth,
  metamaskAuth
})(Login)

