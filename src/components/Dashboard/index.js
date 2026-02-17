import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ThemeProviders } from '../../ThemeContext';
import DashboardLayout from './layout/DashboardLayout';

class Dashboard extends Component {
  render() {
    const {
      isAuthenticated,
      isVerified,
      hasUsername,
      isGranted,
    } = this.props.auth;

    // Authentication checks
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
        <ThemeProviders>
          <DashboardLayout />
        </ThemeProviders>
      );
    }

    return <Navigate to="/" />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
