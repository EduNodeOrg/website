import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Button, Chip, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const MembershipCard = styled(Box)(({ theme }) => ({
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

const tiers = {
  Free: {
    price: '€0',
    period: '/mo',
    color: '#b8c5d6',
    chipColor: 'rgba(184, 197, 214, 0.2)',
    benefits: [
      'Access to FREE educational content and courses',
      'Email support',
      'Community Discord access',
    ],
  },
  Pro: {
    price: '€6.99',
    period: '/mo',
    color: '#00d4ff',
    chipColor: 'rgba(0, 212, 255, 0.2)',
    benefits: [
      'All Free tier features',
      'NFT certification for course completion',
      'Priority email support',
      'Exclusive Discord Role',
      'Advanced course materials',
    ],
  },
  Enterprise: {
    price: 'Custom',
    period: '',
    color: '#7b2ff7',
    chipColor: 'rgba(123, 47, 247, 0.2)',
    benefits: [
      'Tailored courses for employees',
      'Custom NFT certification',
      'Phone & email priority support',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
};

function MembershipManagementContent({ auth }) {
  const navigate = useNavigate();
  const user = auth?.user || {};

  // Determine membership tier from any possible backend field
  const currentTier =
    user.membership ||
    user.subscription?.tier ||
    user.tier ||
    user.plan ||
    (user.isPro ? 'Pro' : null) ||
    (user.isEnterprise ? 'Enterprise' : null) ||
    'Free';

  const tier = tiers[currentTier] || tiers.Free;
  const isFree = currentTier === 'Free';
  const isPro = currentTier === 'Pro';

  return (
    <MembershipCard>
      <SectionTitle variant="h6">Membership</SectionTitle>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', display: 'inline' }}>
            {tier.price}
          </Typography>
          <Typography variant="body1" sx={{ color: '#b8c5d6', display: 'inline', ml: 0.5 }}>
            {tier.period}
          </Typography>
        </Box>
        <Chip
          icon={isPro ? <StarIcon sx={{ color: '#00d4ff !important' }} /> : null}
          label={currentTier}
          sx={{
            backgroundColor: tier.chipColor,
            color: tier.color,
            fontWeight: 'bold',
            border: `1px solid ${tier.color}`,
            '& .MuiChip-label': { px: 2 },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

      <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 1.5, fontWeight: 500 }}>
        Current benefits:
      </Typography>

      <List dense sx={{ py: 0 }}>
        {tier.benefits.map((benefit, idx) => (
          <ListItem key={idx} sx={{ py: 0.3, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon sx={{ color: tier.color, fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              primary={benefit}
              primaryTypographyProps={{ variant: 'body2', sx: { color: '#b8c5d6' } }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3 }}>
        {isFree ? (
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => navigate('/membership')}
            sx={{
              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
              color: '#ffffff',
              fontWeight: 'bold',
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                background: 'linear-gradient(45deg, #00b8e6, #6b2fd6)',
                transform: 'scale(1.02)',
              },
            }}
          >
            Upgrade to Pro
          </Button>
        ) : (
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => navigate('/membership')}
            sx={{
              borderColor: 'rgba(123, 47, 247, 0.5)',
              color: '#00d4ff',
              fontWeight: 'bold',
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                background: 'rgba(123, 47, 247, 0.1)',
                borderColor: 'rgba(123, 47, 247, 0.8)',
              },
            }}
          >
            Manage Membership
          </Button>
        )}
      </Box>
    </MembershipCard>
  );
}

class MembershipManagement extends Component {
  render() {
    return <MembershipManagementContent auth={this.props.auth} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MembershipManagement);
