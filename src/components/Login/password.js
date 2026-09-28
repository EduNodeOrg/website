import React, { Component } from 'react';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const PageContainer = styled('div')(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: '48px',
}));

const ResetCard = styled(Paper)(({ theme }) => ({
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

class PasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Trigger API request to initiate password reset process
    fetch('https://edunode.herokuapp.com/api/password/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('A reset link is sent to your Email!');// Handle success or error response from the server
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
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
          <ResetCard elevation={0}>
            <form onSubmit={this.handleSubmit}>
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
                Forgot your password?
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#b8c5d6', textAlign: 'center', mb: 4 }}
              >
                Enter your email and we'll send you a reset link
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  type="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                  sx={darkFieldSx}
                />
              </Box>

              <SubmitButton
                variant="contained"
                type="submit"
              >
                Send reset link
              </SubmitButton>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                  Remembered it?{' '}
                  <Link to="/login" style={{ color: '#00d4ff' }}>
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
          </ResetCard>
        </Box>
      </PageContainer>
    );
  }
}

export default PasswordPage;
