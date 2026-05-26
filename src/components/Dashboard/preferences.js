import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ModernNavbar from './layout/ModernNavbar';
import withRouter from '../../withRouter';

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

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(4),
  color: '#ffffff',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(123, 47, 247, 0.2)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
}));

const TagChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '20px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  backgroundColor: selected ? 'rgba(123, 47, 247, 0.8)' : 'rgba(255, 255, 255, 0.08)',
  color: selected ? '#ffffff' : '#b8c5d6',
  border: selected ? '1px solid rgba(123, 47, 247, 0.8)' : '1px solid rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: selected ? 'rgba(123, 47, 247, 1)' : 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.05)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  borderRadius: '12px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
  },
  '&:disabled': {
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.3)',
  },
}));

const TAGS = [
  'Web3', 'Ethereum', 'Bitcoin', 'JavaScript', 'Rust', 'AI',
  'Stellar', 'Programming', 'NFT', 'Blockchain', 'Crypto',
  'E-learning', 'IT', 'Soroban', 'Solidity', 'DeFi',
  'Smart Contracts', 'IPFS', 'Hyperledger', 'Security',
];

const ROLES = ['Learner', 'Teacher', 'University'];

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      selectedRole: '',
      isSaving: false,
      saveSuccess: false,
      saveError: null,
      user: null,
      redirectToDashboard: false,
    };
  }

  async componentDidMount() {
    try {
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      const email = localUser.email || '';
      if (!email) return;

      const response = await axios.get(`https://edunode.herokuapp.com/api/users/user?email=${email}`);
      const user = response.data;
      this.setState({
        user,
        selectedTags: user.preferences || [],
        selectedRole: user.role || '',
      });
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  }

  toggleTag = (tag) => {
    this.setState(prevState => {
      const selectedTags = new Set(prevState.selectedTags);
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }
      return { selectedTags: [...selectedTags], saveSuccess: false, saveError: null };
    });
  };

  handleRoleChange = (event) => {
    this.setState({ selectedRole: event.target.value, saveSuccess: false, saveError: null });
  };

  handleSave = async () => {
    const email = this.props.auth?.user?.email || this.state.user?.email;
    if (!email) return;

    this.setState({ isSaving: true, saveSuccess: false, saveError: null });

    try {
      await axios.post('https://edunode.herokuapp.com/api/users/preferences', {
        preferences: this.state.selectedTags,
        email,
      });

      if (this.state.selectedRole) {
        await axios.post('https://edunode.herokuapp.com/api/users/role', {
          role: this.state.selectedRole,
          email,
        });
      }

      localStorage.setItem('selectedTags', 'true');
      this.setState({ isSaving: false, saveSuccess: true });

      setTimeout(() => {
        this.setState({ redirectToDashboard: true });
      }, 1200);
    } catch (error) {
      this.setState({
        isSaving: false,
        saveError: error.response?.data?.msg || 'Failed to save preferences. Please try again.',
      });
    }
  };

  handleSkip = () => {
    this.setState({ redirectToDashboard: true });
  };

  render() {
    const { isAuthenticated, isVerified } = this.props.auth;
    const { selectedTags, selectedRole, isSaving, saveSuccess, saveError, redirectToDashboard } = this.state;

    if (!isAuthenticated) return <Navigate to="/" />;
    if (isAuthenticated && !isVerified) return <Navigate to="/VerifyEmail" />;
    if (redirectToDashboard) return <Navigate to="/dashboard" />;

    const firstName = this.props.auth.user?.email?.split('@')[0] || 'Learner';

    return (
      <DashboardContainer>
        <ModernNavbar />

        <ContentContainer maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <SectionTitle variant="h3">
                Welcome, {firstName}!
              </SectionTitle>
              <Typography variant="h6" sx={{ color: '#b8c5d6', maxWidth: 600, mx: 'auto' }}>
                Pick your interests so we can tailor courses, challenges, and content just for you.
              </Typography>
            </Box>
          </motion.div>

          {saveSuccess && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Alert
                severity="success"
                sx={{
                  mb: 4,
                  background: 'rgba(46, 125, 50, 0.2)',
                  color: '#69f0ae',
                  border: '1px solid rgba(46, 125, 50, 0.3)',
                }}
              >
                Preferences saved successfully! Redirecting to your dashboard...
              </Alert>
            </motion.div>
          )}

          {saveError && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  background: 'rgba(211, 47, 47, 0.2)',
                  color: '#ff8a80',
                  border: '1px solid rgba(211, 47, 47, 0.3)',
                }}
              >
                {saveError}
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard elevation={0}>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                Select Your Interests
              </Typography>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 3 }}>
                Choose topics you are interested in. You can always update these later from your profile.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {TAGS.map((tag) => (
                  <TagChip
                    key={tag}
                    label={tag}
                    selected={selectedTags.includes(tag) ? 1 : 0}
                    onClick={() => this.toggleTag(tag)}
                    clickable
                  />
                ))}
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                What is your role?
              </Typography>
              <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 2 }}>
                This helps us show you the right content and tools.
              </Typography>

              <FormControl
                fullWidth
                sx={{
                  mb: 4,
                  '& .MuiInputLabel-root': { color: '#b8c5d6' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#7b2ff7' },
                  },
                  '& .MuiSvgIcon-root': { color: '#b8c5d6' },
                }}
              >
                <InputLabel id="role-select-label">Select your role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={selectedRole}
                  label="Select your role"
                  onChange={this.handleRoleChange}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: '#1a1f3a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '& .MuiMenuItem-root': { color: '#ffffff' },
                        '& .MuiMenuItem-root:hover': { background: 'rgba(123, 47, 247, 0.2)' },
                      },
                    },
                  }}
                >
                  {ROLES.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <GradientButton
                    fullWidth
                    variant="contained"
                    startIcon={isSaving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                    onClick={this.handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </GradientButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    onClick={this.handleSkip}
                    sx={{
                      color: '#b8c5d6',
                      borderColor: 'rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.4)',
                        background: 'rgba(255,255,255,0.05)',
                      },
                    }}
                  >
                    Skip for now
                  </Button>
                </Grid>
              </Grid>
            </GlassCard>
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Preferences));
