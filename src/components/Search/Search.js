import React, { Component } from 'react'
import withRouter from '../../withRouter';
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import { connect } from 'react-redux';
import { reduxForm } from "redux-form";
import { updateAccount, saveUsernameAlbedo, pkeyGoogleUser } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Navbar1 from '../Dashboard/Navbar1';
import axios from 'axios';
import { Grid, Box, Container, Typography, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { KeyboardArrowUp } from '@mui/icons-material';

const SearchContainer = styled(Box)(({ theme }) => ({
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
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(4),
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

const ScrollToTopFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: 'white',
  zIndex: 1000,
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.1)',
  },
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
  pointerEvents: 'none',
  zIndex: 0,
}));



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
            isLoading: false,
            errors: {},
            items: Array.from({ length: 20 }),
            searchQuery: '',
            results: [],
            preferences: [],
            coinGecko: [],
            wiki: [],
            videos: [],
            showScrollTop: false
        }

        this.onChange = this.onChange.bind(this)
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const { email } = this.state;
        fetch(`https://edunode.herokuapp.com/api/search/${email}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ preferences: data });
            })
            .catch(error => {
                console.error(error);
            });

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.setState({ showScrollTop: scrollTop > 300 });
    };

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    /**
        fetchCoinGeckoData = (searchQuery) => {
            const apiKey = 'YOUR_API_KEY'; // Replace with your CoinGecko API key
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchQuery}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
          
            axios
              .get(url, {
                headers: {
                  'Content-Type': 'application/json',
                  // Add any additional headers if required
                },
              })
              .then((response) => {
                const coinGeckoResults = response.data;
                // Do something with the CoinGecko results, such as updating state or merging with existing results
              })
              .catch((error) => {
                console.error('Error fetching CoinGecko data:', error);
              });
          };
           */

    handleInputChange = event => {
        const searchQuery = event.target.value;
        this.setState({ searchQuery }, () => {
            this.performSearch();
            this.performSearchWiki();
        });
    }

    performSearchWiki = async () => {
        const { searchQuery } = this.state;

        try {
            const response = await fetch(`https://edunode.herokuapp.com/api/search/wiki/${searchQuery}`);
            const data = await response.json();
            console.log('wikiiiiiiiiiiiii')
            console.log('wiki data', data)
            this.setState({ wiki: data });
        } catch (error) {
            console.error('Error fetching wiki data:', error.message);
        }
    };


    performSearch = () => {
        const { searchQuery } = this.state;

        // Fetch data from your MongoDB
        fetch(`https://edunode.herokuapp.com/api/search?searchQuery=${searchQuery}`)
            .then((response) => response.json())
            .then((data) => {
                const mongoResults = data;
                this.setState({ results: mongoResults });

                // Fetch data from CoinGecko
                axios
                    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyA88nAAzmcEnMBeWHA-tMHePt5XfhzEo8E&type=video&q=${searchQuery}`)
                    .then((response) => {
                        const vids = response.data.items;
                        this.setState({ videos: vids });
                    })
                    .catch((error) => {
                        console.error('Error fetching youtube data:', error);
                    });
                // Fetch data from CoinGecko
                axios
                    .get(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
                    .then((response) => {
                        const coinGeckoResults = response.data;
                        this.setState({ coinGecko: coinGeckoResults });
                    })
                    .catch((error) => {
                        console.error('Error fetching CoinGecko data:', error);
                    });

            })
            .catch((error) => {
                console.error('Error fetching data from MongoDB:', error);
            });
    };


    componentDidMount() {
        const { email } = this.state;
        fetch(`https://edunode.herokuapp.com/api/search/${email}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ preferences: data });
            })
            .catch(error => {
                console.error(error);
            });

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };


    render() {
        const { searchQuery, results, coinGecko, wiki, showScrollTop } = this.state;
        return (
            <SearchContainer>
                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <FloatingParticle
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                <ContentContainer maxWidth="xl">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography variant="h3" sx={{ 
                                color: '#ffffff', 
                                fontWeight: 'bold', 
                                mb: 2,
                                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                Search & Discover
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                                Explore courses, posts, wiki articles, and more
                            </Typography>
                        </Box>
                    </motion.div>

                    <Navbar1 />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={this.handleInputChange}
                                style={{ 
                                    border: '1px solid rgba(123, 47, 247, 0.3)', 
                                    borderRadius: '8px', 
                                    padding: '12px 16px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    width: '100%',
                                    maxWidth: '500px',
                                    outline: 'none'
                                }}
                            />
                            <button 
                                onClick={this.performSearch} 
                                style={{ 
                                    backgroundColor: 'linear-gradient(45deg, #7b2ff7, #00d4ff)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Search
                            </button>
                        </Box>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Grid container spacing={3}>
                            {results.courses && results.courses.map(course => (
                                <Grid item xs={12} sm={6} md={4} key={course.id}>
                                    <Box sx={{ 
                                        p: 2, 
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                        borderRadius: '12px',
                                        border: '1px solid rgba(123, 47, 247, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Typography variant="h6" sx={{ color: '#00d4ff', mb: 1 }}>
                                            Course
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 2 }}>
                                            {course.description}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <FontAwesomeIcon icon={faLink} sx={{ mr: 1, color: '#7b2ff7' }} />
                                            <a 
                                                href={course.link} 
                                                style={{ color: '#00d4ff', textDecoration: 'none' }}
                                            >
                                                {course.link}
                                            </a>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                            {results.posts && results.posts.map(post => (
                                <Grid item xs={12} sm={6} md={4} key={post.id}>
                                    <Box sx={{ 
                                        p: 2, 
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                        borderRadius: '12px',
                                        border: '1px solid rgba(123, 47, 247, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Typography variant="h6" sx={{ color: '#00d4ff', mb: 1 }}>
                                            Post
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 2 }} dangerouslySetInnerHTML={{ __html: post.description }}>
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <FontAwesomeIcon icon={faLink} sx={{ mr: 1, color: '#7b2ff7' }} />
                                            <a 
                                                href={post.link} 
                                                style={{ color: '#00d4ff', textDecoration: 'none' }}
                                            >
                                                {post.link}
                                            </a>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                            {results.blogs && results.blogs.map(blog => (
                                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                    <Box sx={{ 
                                        p: 2, 
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                        borderRadius: '12px',
                                        border: '1px solid rgba(123, 47, 247, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Typography variant="h6" sx={{ color: '#00d4ff', mb: 1 }}>
                                            Blog
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
                                            {blog.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b8c5d6', mb: 2 }}>
                                            {blog.description}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <FontAwesomeIcon icon={faLink} sx={{ mr: 1, color: '#7b2ff7' }} />
                                            <a 
                                                href={blog.link} 
                                                style={{ color: '#00d4ff', textDecoration: 'none' }}
                                            >
                                                {blog.link}
                                            </a>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </ContentContainer>

                {/* Scroll to Top Button */}
                {showScrollTop && (
                    <ScrollToTopFab
                        onClick={this.scrollToTop}
                        aria-label="Scroll to top"
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <KeyboardArrowUp />
                    </ScrollToTopFab>
                )}
            </SearchContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

Search = connect(
    mapStateToProps, { updateAccount, saveUsernameAlbedo, pkeyGoogleUser, verifyCode, clearErrors }
)(Search);

export default Search = reduxForm({
    form: "ReduxForm",
    fields: ["name", "pkey"],
    clearErrors,
    updateAccount,
    saveUsernameAlbedo,
    pkeyGoogleUser
})(withRouter(Search));
