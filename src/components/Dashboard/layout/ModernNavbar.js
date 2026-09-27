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
  Divider,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Dashboard as DashboardIcon,
  Home,
  Search,
  PostAdd,
  Book,
  Article,
  Feed,
  CardMembership,
  Chat,
  History,
  MilitaryTech,
  EmojiEvents,
  SportsEsports,
  Mail,
  Flag,
  Sell,
  Groups,
  Info,
  MenuBook,
  HowToReg,
  Source,
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
  { icon: <Home />, text: 'Home', path: '/' },
  { icon: <Search />, text: 'Search', path: '/search' },
  { icon: <PostAdd />, text: 'New Post', path: '/post' },
  { icon: <Book />, text: 'Courses', path: '/courses' },
  { icon: <Feed />, text: 'Feed', path: '/feed' },
  { icon: <CardMembership />, text: 'Certificates', path: '/certificate' },
  { icon: <Chat />, text: 'Chat', path: '/chat' },
  { icon: <History />, text: 'Chat History', path: '/historyChat' },
  { icon: <MilitaryTech />, text: 'Badges', path: '/badges' },
  { icon: <EmojiEvents />, text: 'Challenges', path: '/challenges' },
  { icon: <Article />, text: 'Blog', path: '/blog' },
  { icon: <Source />, text: 'Resources', path: '/resources' },
  { icon: <Settings />, text: 'Settings', path: '/dashboard/settings' },
];

// Links the legacy navbars exposed to Teacher/University/Admin roles.
const staffMenuItems = [
  { icon: <PostAdd />, text: 'Add Course', path: '/course' },
  { icon: <MilitaryTech />, text: 'Add Badge', path: '/addBadge' },
  { icon: <CardMembership />, text: 'Add Certificate', path: '/validCertificate' },
  { icon: <SportsEsports />, text: 'Add Game Challenge', path: '/addGame' },
];

// Logged-out visitors get the marketing pages instead of the app links.
const publicMenuItems = [
  { icon: <Source />, text: 'Resources', path: '/resources' },
  { icon: <Sell />, text: 'Pricing', path: '/pricing' },
  { icon: <Groups />, text: 'Community', path: '/community' },
  { icon: <EmojiEvents />, text: 'Milestones', path: '/milestones' },
  { icon: <Article />, text: 'Blog', path: '/blog' },
  { icon: <Info />, text: 'About', path: '/about' },
  { icon: <MenuBook />, text: 'Glossary', path: '/glossary' },
];

class ModernNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMenuOpen: false,
      notificationCount: 0,
      userRole: null,
    };
  }

  componentDidMount() {
    // Role isn't on the redux user — same lookup the legacy navbars used.
    const email = this.props.auth && this.props.auth.user && this.props.auth.user.email;
    if (!email) return;
    fetch(`https://edunode.herokuapp.com/api/users/user?email=${email}`)
      .then((res) => res.json())
      .then((user) => this.setState({ userRole: user && user.role }))
      .catch(() => {});
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
    const { anchorEl, mobileMenuOpen, notificationCount, userRole } = this.state;
    const { auth } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const user = auth.user;
    const { isAuthenticated } = auth;
    const isStaff = ['Teacher', 'University', 'Admin'].includes(userRole);
    const items = isAuthenticated
      ? [...menuItems, ...(isStaff ? staffMenuItems : [])]
      : publicMenuItems;
    // Logged-in users also get the public/marketing links in the drawer,
    // matching the legacy navbar which always showed them.
    const drawerItems = isAuthenticated ? [...items, ...publicMenuItems] : items;
    const homePath = isAuthenticated ? '/dashboard' : '/';

    return (
      <>
        <StyledAppBar position="sticky">
          <StyledToolbar>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LogoContainer onClick={() => this.handleNavigation(homePath)}>
                <LogoText variant="h6" component="div">
                  EduNode
                </LogoText>
              </LogoContainer>
            </motion.div>

            <NavActions>
              {/* Desktop Navigation — all links; below lg the drawer covers it */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
                {items.map((item, index) => (
                  <Tooltip key={item.text} title={item.text} arrow>
                    <StyledIconButton onClick={() => this.handleNavigation(item.path)}>
                      {item.icon}
                    </StyledIconButton>
                  </Tooltip>
                ))}
              </Box>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Tooltip title="Notifications" arrow>
                      <StyledBadge badgeContent={notificationCount} color="error">
                        <StyledIconButton onClick={() => this.handleNavigation('/notification')}>
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
                        {user && (user.avatar || user.googleProfilePic) ? (
                          <UserAvatar src={user.avatar || user.googleProfilePic} alt={user.email} />
                        ) : (
                          <UserAvatar>
                            {user && user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                          </UserAvatar>
                        )}
                      </StyledIconButton>
                    </Tooltip>
                  </motion.div>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    href="/login"
                    sx={{ color: '#b8c5d6', borderColor: 'rgba(123, 47, 247, 0.6)' }}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    href="/register"
                    sx={{ background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)', color: 'white' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Menu — full link list in the drawer */}
              <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
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
          <MenuItem onClick={() => this.handleNavigation('/account')}>
            <ListItemIcon>
              <Settings sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Profile Setting" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
          {(userRole === 'University' || userRole === 'Admin') && (
            <MenuItem onClick={() => this.handleNavigation('/AdminDashboard')}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: '#b8c5d6' }} />
              </ListItemIcon>
              <ListItemText primary="University Dashboard" sx={{ color: '#b8c5d6' }} />
            </MenuItem>
          )}
          {userRole === 'Admin' && (
            <MenuItem onClick={() => this.handleNavigation('/Admin')}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: '#b8c5d6' }} />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" sx={{ color: '#b8c5d6' }} />
            </MenuItem>
          )}
          {userRole && !isStaff && (
            <MenuItem onClick={() => this.handleNavigation('/tutor')}>
              <ListItemIcon>
                <HowToReg sx={{ color: '#b8c5d6' }} />
              </ListItemIcon>
              <ListItemText primary="Role Request" sx={{ color: '#b8c5d6' }} />
            </MenuItem>
          )}
          <MenuItem onClick={() => this.handleNavigation('/messages')}>
            <ListItemIcon>
              <Mail sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Messages" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
          <MenuItem onClick={() => this.handleNavigation('/notification')}>
            <ListItemIcon>
              <Notifications sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Notifications" sx={{ color: '#b8c5d6' }} />
          </MenuItem>
          <MenuItem onClick={() => {
            window.location.href = 'mailto:hi@ogtechnologies.co?subject=Reports';
          }}>
            <ListItemIcon>
              <Flag sx={{ color: '#b8c5d6' }} />
            </ListItemIcon>
            <ListItemText primary="Report" sx={{ color: '#b8c5d6' }} />
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
            <LogoContainer sx={{ mb: 4, pl: 2 }} onClick={() => this.handleNavigation(homePath)}>
              <LogoText variant="h6" component="div">
                EduNode
              </LogoText>
            </LogoContainer>

            <List>
              {drawerItems.map((item, index) => (
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
