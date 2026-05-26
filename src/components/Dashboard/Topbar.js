import React, { Component } from 'react';
import './topbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logout from '../auth/Logout';
import { Link } from "react-router-dom";
import {
  LineStyle,
  Storefront,
  PermIdentity,
  DynamicFeed,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import PublishIcon from "@mui/icons-material/Publish";
import SmartToyIcon from '@mui/icons-material/SmartToy';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
           <span className="logo">EduNode</span> 
          </div> 
          <div className="topRight">
            <Navbar bg="white" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  {/* <NavDropdown title={<Settings />} id="basic-nav-dropdown"> */}
                    <Nav.Link as={Link} to="/" className="link">
                      <LineStyle className="sidebarIcon" />
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/search" className="link">
                      <SearchIcon className="sidebarIcon" />
                      Search
                    </Nav.Link>
                    <Nav.Link as={Link} to="/account" className="link">
                      <PermIdentity className="sidebarIcon" />
                      Account
                    </Nav.Link>
                    <Nav.Link as={Link} to="/courses" className="link">
                      <Storefront className="sidebarIcon" />
                      Courses
                    </Nav.Link>
                    <Nav.Link as={Link} to="/feed" className="link">
                      <DynamicFeed className="sidebarIcon" />
                      Feed
                    </Nav.Link>
                    <Nav.Link as={Link} to="/certificate" className="link">
                      <WorkOutline className="sidebarIcon" />
                      Certificates
                    </Nav.Link>
                    <Nav.Link as={Link} to="/post" className="link">
                      <PublishIcon className="sidebarIcon" />
                      New Post
                    </Nav.Link>
                    <Nav.Link as={Link} to="/course" className="link">
                      <PublishIcon className="sidebarIcon" />
                      Add Course
                    </Nav.Link>
                    <Nav.Link as={Link} to="/chat" className="link">
                      <SmartToyIcon className="sidebarIcon" />
                      Chat
                    </Nav.Link>
                    <Nav.Link as={Link} to="/historyChat" className="link">
                      <SmartToyIcon className="sidebarIcon" />
                      Chat History
                    </Nav.Link>
                    <Nav.Link
                      href="mailto:hi@edunode.org?subject=Reports"
                      className="link"
                      style={{ cursor: 'pointer' }}
                    >
                      <Report className="sidebarIcon" />
                      Reports
                    </Nav.Link>
                    <div className="link" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem' }}>
                      <Logout />
                    </div>

                    <NavDropdown.Divider />
                    {/* </NavDropdown> */}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>



            </div>

          </div>
        </div>
 
    );
  }
}

export default Topbar;
