import React, { Component } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Dashboard as DashboardIcon,
  Book,
  Article,
  Feed,
  VideoLibrary,
  Settings,
  Logout
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import withRouter from '../../../withRouter';
import { logout } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(123, 47, 247, 0.3)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  minHeight: '70px',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
}));

const NavActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#b8c5d6',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    background: 'rgba(123, 47, 247, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
    color: 'white',
    border: '2px solid #1a1f3a',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(123, 47, 247, 0.5)',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)',
    borderRight: '1px solid rgba(123, 47, 247, 0.3)',
  },
}));

const menuItems = [
  { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
  { icon: <Feed />, text: 'Feed', path: '/feed' },
  { icon: <Book />, text: 'Courses', path: '/courses' },
  { icon: <Article />, text: 'Blog', path: '/blog' },
  { icon: <VideoLibrary />, text: 'Videos', path: '/resources' },
  { icon: <Settings />, text: 'Settings', path: '/dashboard/settings' },
 
];

class ModernNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMenuOpen: false,
      notificationCount: 0,
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  static defaultProps = {
    isAuthenticated: false
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMobileMenuToggle = () => {
    this.setState(prevState => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  handleNavigation = (path) => {
    // Use router.navigate from withRouter HOC
    const { router } = this.props;
    router.navigate(path);
    this.handleMobileMenuClose();
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMenuOpen: false });
  };

  handleLogout = async () => {
    try {
      await this.props.logout();
      this.handleMobileMenuClose();
      // Use router.navigate for better UX instead of window.location
      const { router } = this.props;
      router.navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback to window.location if router.navigate fails
      window.location.href = '/';
    }
  };

  render() {
    const { anchorEl, mobileMenuOpen, notificationCount } = this.state;
    const { auth } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const user = auth.user;

    return (
      <>
        <StyledAppBar position="sticky">
          <StyledToolbar>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LogoContainer onClick={() => this.handleNavigation('/dashboard')}>
                <LogoText variant="h6" component="div">
                  EduNode
                </LogoText>
              </LogoContainer>
            </motion.div>

            <NavActions>
              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {menuItems.slice(0, 4).map((item, index) => (
                  <Tooltip key={item.text} title={item.text} arrow>
                    <StyledIconButton onClick={() => this.handleNavigation(item.path)}>
                      {item.icon}
                    </StyledIconButton>
                  </Tooltip>
                ))}
              </Box>

              {/* Notifications */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Notifications" arrow>
                  <StyledBadge badgeContent={notificationCount} color="error">
                    <StyledIconButton>
                      <Notifications />
                    </StyledIconButton>
                  </StyledBadge>
                </Tooltip>
              </motion.div>

              {/* User Profile */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Profile" arrow>
                  <StyledIconButton
                    onClick={this.handleProfileMenuOpen}
                    size="small"
                  >
                    {user && user.avatar ? (
                      <UserAvatar src={user.avatar} alt={user.email} />
                    ) : (
                      <UserAvatar>
                        {user && user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </UserAvatar>
                    )}
                  </StyledIconButton>
                </Tooltip>
              </motion.div>

              {/* Mobile Menu */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <StyledIconButton onClick={this.handleMobileMenuToggle}>
                  <MenuIcon />
                </StyledIconButton>
              </Box>
            </NavActions>
          </StyledToolbar>
        </StyledAppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={this.handleProfileMenuClose}
          onClick={this.handleProfileMenuClose}
          PaperProps={{
            style: {
              background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)',
              border: '1px solid rgba(123, 47, 247, 0.3)',
              borderRadius: '12px',
              marginTop: '8px',
            },
          }}
        >
          <MenuItem onClick={() => this.handleNavigation('/profile')}>
            <ListItemIcon>
              <AccountCircle sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
          <MenuItem onClick={() => this.handleNavigation('/dashboard/settings')}>
            <ListItemIcon>
              <Settings sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.3)' }} />
          <MenuItem onClick={this.handleLogout}>
            <ListItemIcon>
              <Logout sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
        </Menu>

        {/* Mobile Navigation Drawer */}
        <StyledDrawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <LogoContainer sx={{ mb: 4, pl: 2 }} onClick={() => this.handleNavigation('/dashboard')}>
              <LogoText variant="h6" component="div">
                EduNode
              </LogoText>
            </LogoContainer>
            
            <List>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItem
                    button
                    onClick={item.text === 'Logout' ? this.handleLogout : () => this.handleNavigation(item.path)}
                    sx={{
                      color: '#b8c5d6',
                      '&:hover': {
                        background: 'rgba(123, 47, 247, 0.1)',
                        color: '#ffffff',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

ModernNavbar = withRouter(connect(mapStateToProps, { logout, clearErrors })(ModernNavbar));

export default ModernNavbar;
