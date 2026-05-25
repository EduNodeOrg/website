import React, { Component } from 'react';
import { connect } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { checkUnsubscribeStatus, unsubscribeUser } from '../../actions/emailActions';
import { Box, Container, Typography, Button, Card, CardContent, Select, MenuItem, TextField, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const UnsubscribeContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const UnsubscribeCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(4),
  maxWidth: 600,
  width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
  },
  '&:disabled': {
    background: 'rgba(123, 47, 247, 0.3)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'rgba(26, 31, 58, 0.8)',
  color: '#ffffff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(123, 47, 247, 0.3)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(123, 47, 247, 0.5)',
  },
  '& .MuiSelect-icon': {
    color: '#b8c5d6',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': {
      borderColor: 'rgba(123, 47, 247, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(123, 47, 247, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7b2ff7',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#b8c5d6',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
}));

class EmailUnsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      campaignId: '',
      reason: 'user_request',
      customReason: '',
      showCustomReason: false,
      unsubscribed: false,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get('email');
    const campaignId = searchParams.get('campaign');

    if (email) {
      this.setState({ email, campaignId: campaignId || '' });
      this.props.checkUnsubscribeStatus(email);
    }
  }

  handleReasonChange = (event) => {
    const reason = event.target.value;
    this.setState({ 
      reason, 
      showCustomReason: reason === 'other' 
    });
  };

  handleCustomReasonChange = (event) => {
    this.setState({ customReason: event.target.value });
  };

  handleUnsubscribe = () => {
    const { email, campaignId, reason, customReason } = this.state;
    
    this.setState({ loading: true, error: null });
    
    this.props.unsubscribeUser(email, campaignId, reason, customReason)
      .then(() => {
        this.setState({ unsubscribed: true, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false, error: 'Failed to unsubscribe. Please try again.' });
      });
  };

  render() {
    const { email, reason, customReason, showCustomReason, unsubscribed, loading, error } = this.state;
    const { email: emailState } = this.props;

    if (!email) {
      return (
        <UnsubscribeContainer>
          <UnsubscribeCard>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#ffffff', mb: 2, textAlign: 'center' }}>
                Invalid Link
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', textAlign: 'center' }}>
                This unsubscribe link is missing the email parameter. Please use the link from your email.
              </Typography>
            </CardContent>
          </UnsubscribeCard>
        </UnsubscribeContainer>
      );
    }

    if (unsubscribed || emailState.isUnsubscribed) {
      return (
        <UnsubscribeContainer>
          <UnsubscribeCard>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#ffffff', mb: 2, textAlign: 'center' }}>
                Successfully Unsubscribed
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                You have been successfully unsubscribed from our emails.
              </Alert>
              <Typography variant="body1" sx={{ color: '#b8c5d6', mb: 3, textAlign: 'center' }}>
                We're sorry to see you go. You can always manage your email preferences or re-subscribe in the future.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <StyledButton 
                  variant="contained" 
                  onClick={() => window.location.href = '/account'}
                >
                  Manage Email Preferences
                </StyledButton>
                <Button 
                  variant="text" 
                  sx={{ color: '#b8c5d6' }}
                  onClick={() => window.location.href = '/'}
                >
                  Return to Home
                </Button>
              </Box>
            </CardContent>
          </UnsubscribeCard>
        </UnsubscribeContainer>
      );
    }

    return (
      <UnsubscribeContainer>
        <UnsubscribeCard>
          <CardContent>
            <Typography variant="h4" sx={{ color: '#ffffff', mb: 2, textAlign: 'center' }}>
              Unsubscribe from Emails
            </Typography>
            <Typography variant="body1" sx={{ color: '#b8c5d6', mb: 3, textAlign: 'center' }}>
              We're sorry to see you go. Please let us know why you're unsubscribing.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 1 }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {email}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 1 }}>
                Reason for unsubscribing:
              </Typography>
              <StyledSelect
                fullWidth
                value={reason}
                onChange={this.handleReasonChange}
                displayEmpty
              >
                <MenuItem value="user_request">No longer interested</MenuItem>
                <MenuItem value="spam">Too many emails</MenuItem>
                <MenuItem value="irrelevant">Content not relevant</MenuItem>
                <MenuItem value="too_frequent">Too frequent</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </StyledSelect>
            </Box>

            {showCustomReason && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 1 }}>
                  Please specify:
                </Typography>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={3}
                  value={customReason}
                  onChange={this.handleCustomReasonChange}
                  placeholder="Tell us more..."
                />
              </Box>
            )}

            <StyledButton
              variant="contained"
              fullWidth
              onClick={this.handleUnsubscribe}
              disabled={loading || (reason === 'other' && !customReason.trim())}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Unsubscribe'}
            </StyledButton>

            <Button
              variant="text"
              fullWidth
              sx={{ color: '#b8c5d6' }}
              onClick={() => window.location.href = '/account'}
            >
              Manage Email Preferences Instead
            </Button>
          </CardContent>
        </UnsubscribeCard>
      </UnsubscribeContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
  error: state.error
});

export default connect(mapStateToProps, { checkUnsubscribeStatus, unsubscribeUser })(EmailUnsubscribe);
