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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { updateAccount, saveUsernameAlbedo, pkeyGoogleUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import ModernNavbar from '../Dashboard/layout/ModernNavbar';

// Modern styled components matching dashboard theme
const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(123, 47, 247, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const CertificateCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(123, 47, 247, 0.3)',
    border: '1px solid rgba(123, 47, 247, 0.5)',
  },
}));

const CertificateTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const CertificateText = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  marginBottom: theme.spacing(0.5),
}));

const ViewCertificateButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  marginTop: 'auto',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
    textDecoration: 'none',
  },
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
  pointerEvents: 'none',
  zIndex: 0,
}));

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
      <DashboardContainer>
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <ModernNavbar />

        <ContentContainer maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle variant="h2" component="h1">
              My Certificates
            </SectionTitle>

            {certificates.length > 0 ? (
              <Grid container spacing={4}>
                {certificates.map((cert, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <CertificateCard>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <CertificateTitle variant="h5" component="h3">
                            {cert.course || 'Course Certificate'}
                          </CertificateTitle>
                          <CertificateText variant="body1">
                            Certificate #: {cert.certificateNumber}
                          </CertificateText>
                          {cert.createdAt && (
                            <CertificateText variant="body2">
                              Issued on: {new Date(cert.createdAt).toLocaleDateString()}
                            </CertificateText>
                          )}
                        </CardContent>
                        {cert.cid && (
                          <CardActions>
                            <ViewCertificateButton
                              component={Link}
                              to={`/certificates/${cert.certificateNumber}`}
                              fullWidth
                            >
                              View Certificate
                            </ViewCertificateButton>
                          </CardActions>
                        )}
                      </CertificateCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <CertificateText variant="h6" sx={{ fontSize: '1.2rem', mb: 2 }}>
                  No certificates found. Complete a course to earn your first certificate!
                </CertificateText>
              </motion.div>
            )}
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
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
