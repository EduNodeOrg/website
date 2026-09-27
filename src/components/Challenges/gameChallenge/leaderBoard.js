import React, { Component } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Footer from "../../Footer/Footer";
import Topbar from "../../Dashboard/Navbar1";
import Box from '@mui/material/Box';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import PageMeta from '../../PageMeta';

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

const BoardList = muiStyled(List)(() => ({
  width: '100%',
  background: 'rgba(26, 31, 58, 0.6)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '12px',
  '& .MuiListItemText-primary': { color: '#e2e8f0' },
  '& .MuiListItemText-secondary': { color: '#b8c5d6' },
  '& .MuiDivider-root': { borderColor: 'rgba(123, 47, 247, 0.15)' },
}));

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, 
      errors: {},
      users: []
    }; 
  }
  componentDidMount() {
    this.fetchUsers();
  }

  
  fetchUsers = async () => {
    try {
      const response = await axios.get('https://edunode.herokuapp.com/api/users/rating');
      const filteredUsers = response.data.filter((user) => user.rating > 0);
      this.setState({ users: filteredUsers });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  render() {
    const { users, isLoading } = this.state;
    return (
      <PageContainer>
        <PageMeta
          title="Challenge Leaderboard — EduNode"
          description="EduNode challenge leaderboard — top scores from developers solving blockchain and Web3 coding challenges."
          path="/challengeGame/leaderBoard"
        />
        <Topbar />
        <Box sx={{ maxWidth: 600, mx: 'auto', px: 2, pt: 6, pb: 4 }}>
          <PageTitle variant="h4" component="h1">Leader Board</PageTitle>
          {isLoading && (
            <Typography sx={{ color: '#b8c5d6', textAlign: 'center' }}>Loading…</Typography>
          )}
          {!isLoading && users.length === 0 && (
            <Typography sx={{ color: '#b8c5d6', textAlign: 'center' }}>
              No ratings yet — finish a game challenge to appear here.
            </Typography>
          )}
          {users.length > 0 && (
            <BoardList>
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="User Avatar" src={user.images || '/default-avatar.png'} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    <ListItemText primary="Rating" secondary={user.rating} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </BoardList>
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

LeaderBoard = connect(
  mapStateToProps
)(LeaderBoard)

export default LeaderBoard = reduxForm({
  form: "postReduxForm",
})(LeaderBoard)
