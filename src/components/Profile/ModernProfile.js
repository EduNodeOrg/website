import React, { Component } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  Alert,
  Paper,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person,
  Email,
  School,
  Work,
  Star,
  EmojiEvents,
  Forum,
  Code,
  Link as LinkIcon,
  Send,
  Close,
  Bookmark,
  Timeline,
  MilitaryTech,
  ArrowBack
} from '@mui/icons-material';
import withRouter from '../../withRouter';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileContainer = styled(Box)(({ theme }) => ({
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
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(10, 14, 39, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(123, 47, 247, 0.3)',
    border: '1px solid rgba(123, 47, 247, 0.5)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid rgba(123, 47, 247, 0.6)',
  boxShadow: '0 8px 32px rgba(123, 47, 247, 0.3)',
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
}));

const BadgeCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(10, 14, 39, 0.6) 100%)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(123, 47, 247, 0.2)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    border: '1px solid rgba(123, 47, 247, 0.4)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  fontWeight: 'bold',
  margin: theme.spacing(0.5),
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  },
}));

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

class ModernProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      user: this.props.user,
      posts: this.props.posts,
      courses: this.props.courses,
      alert: false,
      tabValue: 0,
    };
  }

  sendFriendRequest = async (userId) => {
    try {
      const { data } = await axios.post(`https://edunode.herokuapp.com/api/users/friend-request/${userId}`, {
        user: this.props.user,
      });
      this.setState({ alert: true });
      setTimeout(() => this.setState({ alert: false }), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const logged = localStorage.getItem('user');
    const loggedUser = JSON.parse(logged);
    const { posts, courses, user, tabValue, alert } = this.state;
    const hasShownPopupChat = localStorage.getItem('shownPopupChat');

    if (!user) {
      return (
        <ProfileContainer>
          <ContentContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  border: '3px solid rgba(123, 47, 247, 0.3)',
                  borderTop: '3px solid #7b2ff7',
                  borderRadius: '50%'
                }} />
              </motion.div>
            </Box>
          </ContentContainer>
        </ProfileContainer>
      );
    }

    return (
      <ProfileContainer>
        <ContentContainer maxWidth="xl">
          {/* Alert */}
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3, 
                  background: 'linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 102, 0.1))',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  '& .MuiAlert-icon': { color: '#00ff88' }
                }}
                action={
                  <IconButton size="small" onClick={() => this.setState({ alert: false })}>
                    <Close sx={{ color: '#00ff88' }} />
                  </IconButton>
                }
              >
                Friend Request Sent Successfully! 🎉
              </Alert>
            </motion.div>
          )}

          {/* Back to Dashboard Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              href="/dashboard"
              startIcon={<ArrowBack />}
              sx={{
                mb: 3,
                background: 'linear-gradient(45deg, rgba(123, 47, 247, 0.2), rgba(0, 212, 255, 0.2))',
                border: '1px solid rgba(123, 47, 247, 0.3)',
                color: '#7b2ff7',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                  color: 'white',
                  border: '1px solid rgba(123, 47, 247, 0.6)',
                  transform: 'translateX(-4px)',
                },
              }}
            >
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProfileCard sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <StyledAvatar
                        src={user.images || undefined}
                        sx={{ mx: 'auto', display: 'block' }}
                      >
                        {user.name?.charAt(0)?.toUpperCase()}
                      </StyledAvatar>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h3" sx={{ 
                      color: '#ffffff', 
                      fontWeight: 'bold', 
                      mb: 2,
                      background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {user.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2 }}>
                      {user.email}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {user.skills && typeof user.skills === 'string' ? user.skills.split(',').map((skill, index) => (
                        <StyledChip key={index} label={skill.trim()} size="small" />
                      )) : user.skills && Array.isArray(user.skills) ? user.skills.map((skill, index) => (
                        <StyledChip key={index} label={skill} size="small" />
                      )) : null}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>
                      {user.preferences || 'Web3 Enthusiast | Blockchain Developer | DeFi Explorer'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      {!user.friends?.includes(loggedUser._id) &&
                       !user.friendRequests?.find((request) => request.user === loggedUser._id) && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => this.sendFriendRequest(loggedUser._id)}
                            variant="contained"
                            size="large"
                            startIcon={<Send />}
                            sx={{
                              background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                              color: 'white',
                              fontWeight: 'bold',
                              px: 3,
                              py: 1.5,
                              borderRadius: '50px',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                                boxShadow: '0 8px 25px rgba(123, 47, 247, 0.4)',
                              },
                            }}
                          >
                            Send Friend Request
                          </Button>
                        </motion.div>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </ProfileCard>
          </motion.div>

          <Grid container spacing={4}>
            {/* Left Column - Stats & Badges */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ProfileCard sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      color: '#ffffff', 
                      fontWeight: 'bold', 
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}>
                      <Timeline sx={{ color: '#7b2ff7' }} />
                      Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(123, 47, 247, 0.1)', borderRadius: 2 }}>
                          <Typography variant="h4" sx={{ color: '#00d4ff', fontWeight: 'bold' }}>
                            {posts.length}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#b8c5d6' }}>Posts</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(0, 212, 255, 0.1)', borderRadius: 2 }}>
                          <Typography variant="h4" sx={{ color: '#7b2ff7', fontWeight: 'bold' }}>
                            {courses.length}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#b8c5d6' }}>Courses</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </ProfileCard>

                <ProfileCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      color: '#ffffff', 
                      fontWeight: 'bold', 
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}>
                      <EmojiEvents sx={{ color: '#7b2ff7' }} />
                      Achievements
                    </Typography>
                    <Grid container spacing={2}>
                      {user.CoursesTrophy !== 0 && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <School sx={{ fontSize: 40, color: '#00d4ff', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              Courses Badge
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                      {user.AddCoursesTrophy !== 0 && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <Bookmark sx={{ fontSize: 40, color: '#7b2ff7', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              Add Course Badge
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                      {user.isVerified && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <MilitaryTech sx={{ fontSize: 40, color: '#00ff88', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              Verified
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                      {hasShownPopupChat && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <Code sx={{ fontSize: 40, color: '#ff6b6b', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              AI Badge
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                      {user.ChallengesTrophy !== 0 && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <Star sx={{ fontSize: 40, color: '#ffd700', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              Challenge Badge
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                      {user.PostsTrophy !== 0 && (
                        <Grid item xs={6}>
                          <BadgeCard>
                            <Forum sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                              Posts Badge
                            </Typography>
                          </BadgeCard>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </ProfileCard>
              </motion.div>
            </Grid>

            {/* Right Column - Content */}
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <ProfileCard>
                  <Box sx={{ borderBottom: 1, borderColor: 'rgba(123, 47, 247, 0.3)' }}>
                    <Tabs 
                      value={tabValue} 
                      onChange={this.handleTabChange}
                      sx={{
                        '& .MuiTab-root': {
                          color: '#b8c5d6',
                          fontWeight: 'bold',
                          '&.Mui-selected': {
                            color: '#00d4ff',
                          },
                        },
                        '& .MuiTabs-indicator': {
                          background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                          height: 3,
                        },
                      }}
                    >
                      <Tab icon={<Forum />} label="Posts" />
                      <Tab icon={<School />} label="Courses" />
                      <Tab icon={<Person />} label="About" />
                    </Tabs>
                  </Box>

                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Recent Posts ({posts.length})
                    </Typography>
                    {posts.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" sx={{ color: '#b8c5d6' }}>
                          No posts yet
                        </Typography>
                      </Box>
                    ) : (
                      <Grid container spacing={3}>
                        {posts.map((post) => (
                          <Grid item xs={12} md={6} key={post._id}>
                            <ProfileCard>
                              <CardContent>
                                <Typography variant="h6" sx={{ 
                                  color: '#ffffff', 
                                  mb: 2,
                                  fontWeight: 'bold',
                                }}>
                                  {post.title}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: '#b8c5d6', 
                                    mb: 2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                  }}
                                  dangerouslySetInnerHTML={{ __html: post.description }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {post.tags?.slice(0, 2).map((tag, index) => (
                                      <Chip key={index} label={tag} size="small" sx={{ 
                                        background: 'rgba(123, 47, 247, 0.2)', 
                                        color: '#b8c5d6',
                                        fontSize: '0.7rem',
                                      }} />
                                    ))}
                                  </Box>
                                  {post.link && (
                                    <IconButton size="small" href={post.link} target="_blank" sx={{ color: '#7b2ff7' }}>
                                      <LinkIcon />
                                    </IconButton>
                                  )}
                                </Box>
                              </CardContent>
                            </ProfileCard>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Courses ({courses.length})
                    </Typography>
                    {courses.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" sx={{ color: '#b8c5d6' }}>
                          No courses enrolled yet
                        </Typography>
                      </Box>
                    ) : (
                      <Grid container spacing={3}>
                        {courses.map((course) => (
                          <Grid item xs={12} md={6} key={course._id}>
                            <ProfileCard>
                              <CardContent>
                                <Typography variant="h6" sx={{ 
                                  color: '#ffffff', 
                                  mb: 2,
                                  fontWeight: 'bold',
                                }}>
                                  {course.title}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: '#b8c5d6', 
                                    mb: 2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {course.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {course.tags?.slice(0, 2).map((tag, index) => (
                                      <Chip key={index} label={tag} size="small" sx={{ 
                                        background: 'rgba(0, 212, 255, 0.2)', 
                                        color: '#b8c5d6',
                                        fontSize: '0.7rem',
                                      }} />
                                    ))}
                                  </Box>
                                  {course.link && (
                                    <IconButton size="small" href={course.link} target="_blank" sx={{ color: '#00d4ff' }}>
                                      <LinkIcon />
                                    </IconButton>
                                  )}
                                </Box>
                              </CardContent>
                            </ProfileCard>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      About {user.name}
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon><Person sx={{ color: '#7b2ff7' }} /></ListItemIcon>
                        <ListItemText 
                          primary="Full Name" 
                          secondary={user.name}
                          primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                          secondaryTypographyProps={{ color: '#b8c5d6' }}
                        />
                      </ListItem>
                      <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.2)' }} />
                      <ListItem>
                        <ListItemIcon><Email sx={{ color: '#7b2ff7' }} /></ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary={user.email}
                          primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                          secondaryTypographyProps={{ color: '#b8c5d6' }}
                        />
                      </ListItem>
                      <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.2)' }} />
                      <ListItem>
                        <ListItemIcon><Work sx={{ color: '#7b2ff7' }} /></ListItemIcon>
                        <ListItemText 
                          primary="Preferences" 
                          secondary={user.preferences || 'Web3 Enthusiast'}
                          primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                          secondaryTypographyProps={{ color: '#b8c5d6' }}
                        />
                      </ListItem>
                      <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.2)' }} />
                      <ListItem>
                        <ListItemIcon><School sx={{ color: '#7b2ff7' }} /></ListItemIcon>
                        <ListItemText 
                          primary="Skills" 
                          secondary={user.skills || 'Blockchain Development'}
                          primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                          secondaryTypographyProps={{ color: '#b8c5d6' }}
                        />
                      </ListItem>
                      {user.age && (
                        <>
                          <Divider sx={{ borderColor: 'rgba(123, 47, 247, 0.2)' }} />
                          <ListItem>
                            <ListItemIcon><Person sx={{ color: '#7b2ff7' }} /></ListItemIcon>
                            <ListItemText 
                              primary="Age" 
                              secondary={user.age}
                              primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                              secondaryTypographyProps={{ color: '#b8c5d6' }}
                            />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </TabPanel>
                </ProfileCard>
              </motion.div>
            </Grid>
          </Grid>
        </ContentContainer>
      </ProfileContainer>
    );
  }
}

const WithParams = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://edunode.herokuapp.com/api/users/userByid/${id}`);
        const data = response.data;
        setUser(data.user);
        fetchPosts(data.user.email);
        fetchCourses(data.user.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const fetchPosts = async (email) => {
    try {
      const response = await axios.get(`https://edunode.herokuapp.com/api/post/postemail/${email}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async (email) => {
    try {
      const response = await axios.get(`https://edunode.herokuapp.com/api/cours/coursemail/${email}`);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ContentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Box sx={{ 
                width: 60, 
                height: 60, 
                border: '3px solid rgba(123, 47, 247, 0.3)',
                borderTop: '3px solid #7b2ff7',
                borderRadius: '50%'
              }} />
            </motion.div>
          </Box>
        </ContentContainer>
      </ProfileContainer>
    );
  }

  return <ModernProfilePage id={id} user={user} posts={posts} courses={courses} />;
};

export default withRouter(WithParams);
