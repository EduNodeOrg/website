import React, { Component } from 'react';
import { connect } from "react-redux";
import { getEmailPreferences, updateEmailPreferences } from '../../actions/emailActions';
import { Box, Typography, Switch, FormControlLabel, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const PreferencesCard = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#7b2ff7',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'rgba(123, 47, 247, 0.5)',
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'rgba(123, 47, 247, 0.3)',
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: '#b8c5d6',
  },
}));

const SaveButton = styled('button')(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(3),
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
  },
  '&:disabled': {
    background: 'rgba(123, 47, 247, 0.3)',
    cursor: 'not-allowed',
  },
}));

class EmailPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: {
        marketing: false,
        notifications: false,
        newsletters: false,
        updates: false,
        courseRecommendations: false,
        achievementNotifications: false
      },
      loading: false,
      saving: false,
      error: null,
      success: false
    };
  }

  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.props.getEmailPreferences(email);
    }
  }

  componentDidUpdate(prevProps) {
    const { email, auth } = this.props;
    
    // Load preferences when email changes or when auth user loads
    if ((email && email !== prevProps.email) || 
        (auth.user && auth.user.email && (!prevProps.auth.user || prevProps.auth.user.email !== auth.user.email))) {
      this.props.getEmailPreferences(email || auth.user.email);
    }

    // Update local state when Redux state changes
    if (prevProps.email.preferences !== this.props.email.preferences) {
      this.setState({
        preferences: this.props.email.preferences || this.state.preferences
      });
    }
  }

  handlePreferenceChange = (preference) => (event) => {
    this.setState({
      preferences: {
        ...this.state.preferences,
        [preference]: event.target.checked
      },
      success: false,
      error: null
    });
  };

  handleSave = () => {
    const { email } = this.props;
    const { preferences } = this.state;

    this.setState({ saving: true, error: null, success: false });

    this.props.updateEmailPreferences(email, preferences)
      .then(() => {
        this.setState({ saving: false, success: true });
        setTimeout(() => this.setState({ success: false }), 3000);
      })
      .catch((err) => {
        this.setState({ saving: false, error: 'Failed to update preferences. Please try again.' });
      });
  };

  render() {
    const { preferences, saving, error, success } = this.state;
    const { email, email: emailState } = this.props;

    const currentPreferences = emailState.preferences || preferences;

    return (
      <PreferencesCard>
        <SectionTitle variant="h6">
          Email Preferences
        </SectionTitle>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Email preferences updated successfully!
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.marketing || false}
                onChange={this.handlePreferenceChange('marketing')}
                disabled={saving}
              />
            }
            label="Marketing emails and promotions"
          />

          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.notifications || false}
                onChange={this.handlePreferenceChange('notifications')}
                disabled={saving}
              />
            }
            label="System notifications"
          />

          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.newsletters || false}
                onChange={this.handlePreferenceChange('newsletters')}
                disabled={saving}
              />
            }
            label="Weekly newsletters"
          />

          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.updates || false}
                onChange={this.handlePreferenceChange('updates')}
                disabled={saving}
              />
            }
            label="Platform updates and announcements"
          />

          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.courseRecommendations || false}
                onChange={this.handlePreferenceChange('courseRecommendations')}
                disabled={saving}
              />
            }
            label="Course recommendations"
          />

          <StyledFormControlLabel
            control={
              <StyledSwitch
                checked={currentPreferences.achievementNotifications || false}
                onChange={this.handlePreferenceChange('achievementNotifications')}
                disabled={saving}
              />
            }
            label="Achievement and badge notifications"
          />
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <SaveButton
            onClick={this.handleSave}
            disabled={saving}
          >
            {saving ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Save Preferences'}
          </SaveButton>
          
          {emailState.isUnsubscribed && (
            <Typography variant="body2" sx={{ color: '#ff6b6b' }}>
              Note: You are currently unsubscribed from all emails
            </Typography>
          )}
        </Box>
      </PreferencesCard>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { getEmailPreferences, updateEmailPreferences })(EmailPreferences);
