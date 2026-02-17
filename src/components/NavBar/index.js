import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import Logout from '../auth/Logout';
import favicon from "./favicon.png"
import "./style.css"


class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  static defaultProps = {
    isAuthenticated: false
  }

  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false
    }
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isNavExpanded: !prevState.isNavExpanded
    }));
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isNavExpanded } = this.state;

    return (
      <nav className="navigation">
        <div className="nav-container">
          <a href="/" className="brand-name">
            <img src={favicon} alt="EduNode" className="navbar-logo" />
            EduNode
          </a>
          <button
            className="hamburger"
            onClick={this.toggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            <ul>
              <li>
                <a href="/resources">Resources</a>
              </li>
              <li>
                <a href="/community">Community</a>
              </li>
              <li>
                <a href="/milestones">Milestones</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/glossary">Glossary</a>
              </li>
              <li>
                {/* <a href="/stellarnodes">Stellar Nodes</a> */}
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/search">Search</a>
                  </li>
                  <li>
                    <a href="/account">Account</a>
                  </li>
                  <li>
                    <a href="/courses">Courses</a>
                  </li>
                  <li>
                    <a href="/feed">Feed</a>
                  </li>
                  <li>
                    <a href="/certificate">Certificates</a>
                  </li>
                  <li>
                    <a href="/post">New Post</a>
                  </li>
                  <li>
                    <a href="/course">Add Course</a>
                  </li>
                  <li>
                    <a href="/chat">Chat</a>
                  </li>
                  <li>
                    <a href="/historyChat">Chat History</a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        window.location.href = "mailto:hi@edunode.org?subject=Reports";
                      }}
                    >
                      Reports
                    </button>
                  </li>
                  <Logout />
                </>
              ) : (
                <li className="auth-buttons">
                  <Button variant="outlined" href="/login" className="login-btn">LOG IN</Button>
                  <Button variant="contained" href="/register" className="signup-btn">SIGN UP</Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

const ConnectedNavBar = connect(mapStateToProps, null)(NavBar);
export default ConnectedNavBar;