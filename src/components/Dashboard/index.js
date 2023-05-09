import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { verifyCode } from '../../actions/authActions';
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import { Navigate } from 'react-router-dom';
//import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from '../Footer';
import withRouter from '../../withRouter';
import Alert from "@material-ui/lab/Alert";
import Popup from 'reactjs-popup';
import Button from "@mui/material/Button";
import axios from "axios";
import 'reactjs-popup/dist/index.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      tags: ['web3', 'Stellar', 'Programming', 'NFT', 'Blockchain', 'Crypto', 'E-learning', 'IT', 'Soroban'],
      selectedTags: [],
      showPopup: true, //  a state variable to control the visibility of the alert
    };

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
    // Hide the popup after saving
    this.setState({ showPopup: false });
  };




  render() {
    const { tags, selectedTags, showPopup  } = this.state;
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
      return (
        <>
          <Topbar />

          {/* <Sidebar props={email} /> */}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
            {showPopup && ( // Only render the alert if showPopup is true
          <Alert className="text-center" severity="warning">
            Please select your preferences so we can provide you with a personalized experience!  
            <Popup trigger={<Button> Click here </Button>} position="right center">
              {close => (
                <div>
                  Select your preferences
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
        )}
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="edunodeorg"
                options={{ height: 800 }}
              />
              <TwitterFollowButton screenName={'edunodeorg'} />
            </Grid>
          </Grid>
          <Footer />
        </>
      );
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
