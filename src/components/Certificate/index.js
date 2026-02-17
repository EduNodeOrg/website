import withRouter from '../../withRouter';
import { clearErrors } from "../../actions/errorActions";
import { resend, verifyCode } from "../../actions/authActions";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import { reduxForm } from "redux-form";
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import "./style.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { updateAccount, saveUsernameAlbedo, pkeyGoogleUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import Navbar1 from '../Dashboard/Navbar1';

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth?.user?.email || "",
      userName: "",
      pkey: this.props.auth?.user?.pkey || "",
      pubkey: "",
      isLoading: false,
      errors: {},
      certificateCount: 0,
      certificates: [],
      issuerPublicKey: '',
      distributorPublicKey: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : ""
    const pkey = this.props.auth && this.props.auth.user && this.props.auth.user.pkey ? this.props.auth.user.pkey : "anonymous"
    if (email) {
      axios.get(`https://edunode.herokuapp.com/api/certificates/valid`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const userCertificates = res.data.filter(cert => cert.email === email);
            this.setState({ certificateCount: userCertificates.length });
          }
        })
        .catch(err => {
          console.error('Error fetching certificate count:', err);
        });
    } else if (pkey && pkey !== 'anonymous') {
      axios.get(`https://edunode.herokuapp.com/api/certificates/pkey/${pkey}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.setState({ certificateCount: res.data.length });
          }
        })
        .catch(err => {
          console.error('Error fetching certificate count by pkey:', err);
        });
    }

    if (email) {
      axios.get(`https://edunode.herokuapp.com/api/certificates/${email}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const certificates = res.data.map(cert => ({
              certificateNumber: cert.certificateNumber,
              cid: cert.cid,
              distributorPublicKey: cert.distributorPublicKey,
              issuerPublicKey: cert.issuerPublicKey,
              course: cert.courseType,
              createdAt: cert.createdAt
            }));
            this.setState({ certificates });
          }
        })
        .catch(err => {
          console.error('Error fetching certificates:', err);
        });
    } else if (pkey && pkey !== 'anonymous') {
      axios.get(`https://edunode.herokuapp.com/api/certificates/pkey/${pkey}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const certificates = res.data.map(cert => ({
              certificateNumber: cert.certificateNumber,
              cid: cert.cid,
              distributorPublicKey: cert.distributorPublicKey,
              issuerPublicKey: cert.issuerPublicKey,
              course: cert.courseType,
              createdAt: cert.createdAt
            }));
            this.setState({ certificates });
          }
        })
        .catch(err => {
          console.error('Error fetching certificates by pkey:', err);
        });
    }

  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
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
  onSubmit = async values => {

    const email = this.props.auth.user.email
    const userName = values.userName
    const pkey = values.pkey


    // create user object
    const updateAccount = {
      email,
      userName,
      pkey
    };

    try {

      await this.props.updateAccount(updateAccount)

      if (this.props.auth.user) {

        this.props.history.push("/dashboard")
      }


    } catch (error) {
      console.log(error)
    }

  }

  onSubmitAlbedo = async values => {


    const userName = values.userName
    const pubkey = this.props.auth.user.pubkey

    // create user object
    const updateAccount = {
      userName,
      pubkey

    };


    try {

      await this.props.saveUsernameAlbedo(updateAccount)


      if (this.props.auth.user.pubkey) {

        // this.props.history.push("/dashboard")
        alert("Username is updated and will take effect of your next login")
      }


    } catch (error) {
      console.log(error)
    }

  }

  onSubmitGoogle = async values => {


    const email = this.props.auth.user.email
    const pkey = values.pkey

    // create user object
    const updateAccount = {
      email,
      pkey

    };


    try {

      await this.props.pkeyGoogleUser(updateAccount)


      if (this.props.auth.user.googleProfilePic) {

        this.props.history.push("/dashboard")
        alert("Your public key has been updated and will take effect of your next login")
      }


    } catch (error) {
      console.log(error)
    }

  }

  render() {
    const { certificates } = this.state;
    
    return (
      <div className="certificate-container">
        <Navbar1 />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <h1>My Certificates</h1>
          {certificates.length > 0 ? (
            <Grid container spacing={3}>
              {certificates.map((cert, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                    <h3>{cert.course || 'Course Certificate'}</h3>
                    <p>Certificate #: {cert.certificateNumber}</p>
                    {cert.createdAt && (
                      <p>Issued on: {new Date(cert.createdAt).toLocaleDateString()}</p>
                    )}
                    {cert.cid && (
                      <Link 
                        to={`/certificates/${cert.certificateNumber}`}
                        className="certificate-button"
                      >
                        View Certificate
                      </Link>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No certificates found. Complete a course to earn your first certificate!</p>
          )}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Certificate = connect(
  mapStateToProps, { updateAccount, saveUsernameAlbedo, pkeyGoogleUser, verifyCode, clearErrors }
)(Certificate);

export default Certificate = reduxForm({
  form: "ReduxForm",
  fields: ["name", "pkey"],
  clearErrors,
  //   generateCertificate,

})(withRouter(Certificate));
