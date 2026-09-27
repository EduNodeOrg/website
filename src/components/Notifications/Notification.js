import React, { Component } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { clearErrors } from "../../actions/errorActions";
import Footer from "../Footer/Footer";
import Topbar from "../Dashboard/Navbar1";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import IconButton from '@mui/material/IconButton';

const PageContainer = muiStyled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
}));

const PageTitle = muiStyled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const ListTitle = muiStyled(Typography)(({ theme }) => ({
  color: '#e2e8f0',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const NotifList = muiStyled(List)(() => ({
  width: '100%',
  background: 'rgba(26, 31, 58, 0.6)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '12px',
  marginBottom: '24px',
  padding: '4px 0',
  '& .MuiListItem-root': {
    borderBottom: '1px solid rgba(123, 47, 247, 0.15)',
  },
  '& .MuiListItem-root:last-child': {
    borderBottom: 'none',
  },
  '& .MuiListItemText-primary': {
    color: '#e2e8f0',
  },
  '& .MuiListItemText-secondary': {
    color: '#94a3b8',
  },
}));

const UnreadDot = muiStyled(FiberNewIcon)({
  color: '#00d4ff',
  marginLeft: 8,
});

const notifDate = (n) => {
  const raw = n.date || n.time || n.createdAt;
  const d = raw ? new Date(raw) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleString() : '';
};

const readStorageKey = (email) => `readNotifications:${email}`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: {},
      notifications: [],
      messageNotifications: [],
      readIds: new Set(),
      email: ''
    };
  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }


  componentDidMount() {
    const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : ""
    try {
      const stored = JSON.parse(localStorage.getItem(readStorageKey(email)) || '[]');
      this.setState({ email, readIds: new Set(stored) });
    } catch (e) {
      this.setState({ email });
    }
    this.fetchNotifications(email);
    this.fetchMessageNotifications(email);
  }

 async fetchNotifications(props) {
    try {
        const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : ""
      this.setState({ isLoading: true });
      const response = await axios.get(`https://edunode.herokuapp.com/api/certificates/notification/${email}`);
      const notifications = response.data;
      this.setState({ isLoading: false, notifications });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false, errors: error.response.data });
    }
  };

  async fetchMessageNotifications(props) {
    try {
        const receiver = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : ""
      this.setState({ isLoading: true });
      const response = await axios.get(`https://edunode.herokuapp.com/api/messageNotif/${receiver}`);
      const notifications = response.data;
      this.setState({ isLoading: false, messageNotifications: notifications });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false, errors: error.response.data });
    }
  };

  markRead = (id) => {
    const { readIds, email } = this.state;
    if (readIds.has(id)) return;
    const next = new Set(readIds);
    next.add(id);
    this.setState({ readIds: next });
    try {
      localStorage.setItem(readStorageKey(email), JSON.stringify([...next]));
    } catch (e) {
      // storage unavailable — read state just won't persist
    }
  };

  openNotification = (id, path) => {
    this.markRead(id);
    window.location.href = path;
  };

  renderNotification = (notification, description, path) => {
    const { readIds } = this.state;
    const isUnread = !readIds.has(notification._id);
    return (
      <ListItem
        key={notification._id}
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => this.openNotification(notification._id, path)}
            aria-label="open"
            sx={{ color: '#b8c5d6' }}
          >
            <CommentIcon />
          </IconButton>
        }
        sx={isUnread ? {
          background: 'rgba(0, 212, 255, 0.08)',
          borderLeft: '3px solid #00d4ff',
        } : {}}
      >
        <ListItemButton onClick={() => this.openNotification(notification._id, path)}>
          <ListItemText
            primary={
              <>
                {notification.message || notification.notificationMessage}
                {isUnread && <UnreadDot fontSize="small" />}
              </>
            }
            secondary={`${description}${notifDate(notification) ? ` — ${notifDate(notification)}` : ''}`}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  render() {
    const { isLoading, notifications, messageNotifications } = this.state;
    const empty = notifications.length === 0 && messageNotifications.length === 0;
    return (
      <PageContainer>
        <Topbar />
        <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, pt: 6, pb: 4 }}>
          <PageTitle variant="h4" component="h1">Notifications</PageTitle>
          {isLoading && (
            <Typography sx={{ color: '#b8c5d6', textAlign: 'center' }}>Loading…</Typography>
          )}
          {!isLoading && empty && (
            <Typography sx={{ color: '#b8c5d6', textAlign: 'center' }}>
              You&apos;re all caught up.
            </Typography>
          )}
          {notifications.length > 0 && (
            <>
              <ListTitle variant="h6">Certificates</ListTitle>
              <NotifList>
                {notifications.map(notification =>
                  this.renderNotification(
                    notification,
                    'Your certificate or badge is ready — click to view it',
                    '/certificate'
                  ))}
              </NotifList>
            </>
          )}
          {messageNotifications.length > 0 && (
            <>
              <ListTitle variant="h6">Messages</ListTitle>
              <NotifList>
                {messageNotifications.map(notification =>
                  this.renderNotification(
                    notification,
                    `${notification.sender ? `${notification.sender} sent you a message` : 'You have a new message'} — click to open Messages`,
                    '/messages'
                  ))}
              </NotifList>
            </>
          )}
        </Box>
        <Footer />
      </PageContainer>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

Notification = connect(
  mapStateToProps
)(Notification)

export default Notification = reduxForm({
  form: "postReduxForm",
  clearErrors,
})(Notification)
