import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, TextField, Typography, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { CircularProgress } from "@mui/material"
import "./style.css";
import { connect } from 'react-redux'
import {
  Link
} from "react-router-dom";
import { isConnected, getPublicKey } from "@stellar/freighter-api";
import NavBar from "../NavBar"
import albedo from '@albedo-link/intent'
import { Image } from 'react-bootstrap';
import albedologo from "./img/albedo.png"
import flogo from "./img/flogo.png"
//import { ConstructionOutlined } from '@mui/icons-material'
import { clearErrors } from "../../actions/errorActions";
import { register, confirm, webThreeAuth } from "../../actions/authActions";
import { Navigate } from "react-router-dom";







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
        console.log(publicKey)
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
      <div>
        <NavBar />

        <form id="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>

            <Button
              variant="outlined"
              onClick={albedoHandler}
              style={{ width: '300px', marginBottom: '16px' }}
            >
              Sign up with <Image style={{ width: '45px', marginLeft: '8px' }} src={albedologo} />
            </Button>
            <Button
              variant="outlined"
              onClick={freighterHandler}
              style={{ width: '300px', marginBottom: '16px' }}
            >
              Sign up with <Image style={{ width: '75px', marginLeft: '8px' }} src={flogo} />
            </Button>
            <br></br>
            <div>
              <Field
                name="name"
                type="text"
                label="Full Name"
                component={props => this.renderTextField(props)}
                id="name"
                value={this.state.name}
                style={{ width: '300px', marginBottom: '16px' }}
              />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                label="Email"
                component={props => this.renderTextField(props)}
                id="email"
                value={this.state.email}
                style={{ width: '300px', marginBottom: '16px' }}
              />
            </div>
            <div>
              <Field
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                component={props => this.renderTextField(props)}
                id="password"
                value={this.state.password}
                style={{ width: '300px', marginBottom: '16px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                        edge="end"
                        size="small"
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="confirmPassword"
                type={this.state.showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                component={this.renderTextField}
                id="confirmPassword"
                value={this.state.confirmPassword}
                style={{ width: '300px', marginBottom: '16px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })}
                        edge="end"
                        size="small"
                      >
                        {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
            <Button
              variant="contained"
              color="primary"
              id="button"
              type="submit"
              disabled={pristine || submitting || isLoading}
              style={{ width: '300px', marginBottom: '16px' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
            </div>

            {this.state.errorMsg && (
              <Alert severity="error" style={{ width: '300px', marginBottom: '16px' }}>
                {this.state.errorMsg}
              </Alert>
            )}
            {this.props.error.msg.msg && (
              <Alert severity="error" style={{ width: '300px', marginBottom: '16px' }}>
                {this.props.error.msg.msg}
              </Alert>
            )}

            <div style={{ marginTop: '8px' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/loginn">
                  Log in
                </Link>
              </Typography>
            </div>
            <div style={{ marginTop: '8px' }}>
              <Link to="/">
                Return
              </Link>
            </div>
          </Box>
        </form>
      </div>
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


