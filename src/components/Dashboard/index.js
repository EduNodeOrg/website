import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { verifyCode } from '../../actions/authActions';
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import { Navigate } from 'react-router-dom';
//import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from '../Footer';
import Footer1 from '../Footer/Footer';
import withRouter from '../../withRouter';
import Alert from "@material-ui/lab/Alert";
import Popup from 'reactjs-popup';
import Button from "@mui/material/Button";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import Navbar1 from './Navbar1';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import tuto from './tutorial.png'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: this.props.auth.user.preferences ? this.props.auth.user.preferences: [],
      skills:this.props.auth.user.skills ? this.props.auth.user.skills: [],
      email:  this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
      tags: ['web3', 'Stellar', 'Programming', 'NFT', 'Blockchain', 'Crypto', 'E-learning', 'IT', 'Soroban'],
      selectedTags: [],
      showAlert: true, //  a state variable to control the visibility of the alert,
      preference:[],
      user:[],
      showPopup: false
    };

  }

  componentDidMount() {
    const { isAuthenticated, isVerified } = this.props.auth;
    const hasShownPopup = localStorage.getItem('shownPopup');

    if (isAuthenticated && isVerified && !hasShownPopup) {
      this.setState({ showPopup: true });
    }
  
    const { email,showAlert } = this.state;
    console.log('email',email)
    if (this.props.auth.user.preferences && this.props.auth.user.preferences.length === 0) {
      // preferences array is empty
      console.log("Preferences array is empty");
      this.setState({ showAlert: true });
    } else {
      // preferences array is not empty
      console.log("Preferences array is not empty");
      this.setState({ showAlert: false });
    }

    
    //const showAlert = !localStorage.getItem('selectedTags'); // check if the flag is set
     // update the state based on the flag
    console.log(this.state.preferences)

   
    fetch(`https://edunode.herokuapp.com/api/search/${email}`)
    .then(response => response.json())
    .then(data => {
        this.setState({ preference: data });
    })
    .catch(error => {
        console.error(error);
    });
  }



  handleTagChange = (event) => {
    const tagName = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => {
      const selectedTags = new Set(prevState.selectedTags);
      if (isChecked) {
        selectedTags.add(tagName);
      } else {
        selectedTags.delete(tagName);
      }
      return { selectedTags: [...selectedTags] };
    });
  };

  handleSave = () => {
    const email = this.props.auth.user ? this.props.auth.user.email : '';
    // Get the selected tags from state
    const { selectedTags } = this.state;
    console.log(selectedTags);
    // Make an HTTP request to your backend to save the selected tags
    axios.post('https://edunode.herokuapp.com/api/users/preferences', { preferences: selectedTags, email: email })
      .then(response => {
        console.log(response.data); // Log the response from the backend
      })
      .catch(error => {
        console.error(error); // Log any errors that occur
      });
    // set the flag in localStorage
    localStorage.setItem('selectedTags', 'true');
    // Hide the popup after saving
    this.setState({ showAlert: false });
  };


   handleClosePopup = () => {
    this.setState({ showPopup: false });
    localStorage.setItem('shownPopup', true);
  };

  render() {
    const { tags, selectedTags, showAlert,preference,skills,preferences , showPopup} = this.state;
    const {
      isAuthenticated,
      isVerified,
      hasUsername,
      isGranted,
      user,
    } = this.props.auth;
    const email = user && user.email ? user.email : '';



    if (!isGranted && !isVerified && !isAuthenticated && !hasUsername) {
      return <Navigate to="/" />;
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if (isAuthenticated && !isVerified) {
      return <Navigate to="/" />;
    }

    if (isAuthenticated) {

      if (!showAlert) {
        return (
          <>
            <Navbar1 />
            {/* <Sidebar props={email} /> */}
            
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>

        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>These are your preferences and skills:</h1>

        <p className="card-text">
          <small className="text-muted">
          Preferences: {this.state.preferences.join(", ")}
          </small>
        </p>
        <p className="card-text">
          <small className="text-muted">
          Skills: {this.state.skills.join(", ")}
          </small>
        </p>



        <h1 style={{fontSize: '20px', fontWeight: 'bold'}}>These are some search based on your interests ans skills:</h1>


<div className="row justify-content card-deck d-flex">
    {preference.courses && preference.courses.map(course => (
        <div className="col-md-4 mb-4 h-100" key={course.id}>
            <div className="card shadow h-100">
                <div className="card-body">
                    <h6 className="card-title"> Course </h6>
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <p className="card-text">

                        <a href={course.link} className="card-link">
                            <FontAwesomeIcon icon={faLink} className="mr-2" />
                            {course.link}
                        </a>

                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            Tags: {course.tags.join(", ")}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    ))}
    {preference.posts && preference.posts.map(post => (
        <div className="col-md-4 mb-4 h-100" key={post.id}>
            <div className="card shadow h-100">
                <div className="card-body">
                <h6 className="card-title"> Post </h6>
                    <h5 className="card-title">{post.title}</h5>
                    
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: post.description }} ></p>
                    <a href={post.link} className="card-link">
                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                        {post.link}
                    </a>
                    <p className="card-text">
                        <small className="text-muted">
                            Tags: {post.tags.join(", ")}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    ))}
    {preference.blogs && preference.blogs.map(blog => (
        <div className="col-md-4 mb-4 h-100" key={blog.id}>
            <div className="card shadow h-100">
                <div className="card-body">
                <h6 className="card-title"> Blog </h6>
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <p className="card-text">
                        <a href={blog.link} className="card-link">
                            <FontAwesomeIcon icon={faLink} className="mr-2" />
                            {blog.link}
                        </a>

                        <p className="card-text">
                            <small className="text-muted">
                                Tags: {blog.tags.join(", ")}
                            </small>
                        </p>
                    </p>
                </div>
            </div>
        </div>
    ))}
</div>
        </Grid>
      </Grid>
      <br></br>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>

                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="edunodeorg"
                  options={{ height: 800 }}
                />
                <TwitterFollowButton screenName={'edunodeorg'} />
              </Grid>
            </Grid>
            <Modal
                  isOpen={showPopup}
                  onRequestClose={this.handleClosePopup}
                  contentLabel="Congratulations"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                      width: '400px',
                      height: '400px',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px',
                      borderRadius: '8px'
                    }
                  }}
                >
                  <h2 style={{ marginBottom: '20px' }}>Congratulations!</h2>
                  <p style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Thank you for joining our community!
                  </p>
                  <img
                    src={tuto}
                    alt="Trophy"
                    style={{ width: '150px', marginBottom: '20px' }}
                  />
                  <button onClick={this.handleClosePopup}>Close</button>
                </Modal>
           
          </>
        );
      }
      // show the alert and the popup if the flag is not set
      else {
        return (
          <>
          <Navbar1 />
           
            <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Alert className="text-center" severity="warning">
            Please select your preferences so we can provide you with a personalized experience!  
            <Popup trigger=
            {<Button> Click here </Button>}
            position="right center">
            {close => (
            <div> Select your preferences
              {tags.map(tag => (
                <div key={tag}>
                  <input
                    type="checkbox"
                    name={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={this.handleTagChange}
                  />
                  <label>{tag}</label>
                </div>
              ))}

              <button
                onClick={() => {
                  this.handleSave();
                  close();
                }}
              >
                Save
              </button>
            </div>
            )}
            </Popup>
          </Alert>
        </Grid>
      </Grid>
      <Grid container spacing={2}>

      

        <br></br>
            {/**  /* <Grid item xs={12} sm={12} md={12}>

                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="edunodeorg"
                  options={{ height: 800 }}
                />
                <TwitterFollowButton screenName={'edunodeorg'} />
              </Grid>*/}
            </Grid>
    
      </>
        )
      }
    }

    return (
      <Navigate to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Dashboard = connect(mapStateToProps, { verifyCode })(Dashboard);

export default withRouter(Dashboard);
