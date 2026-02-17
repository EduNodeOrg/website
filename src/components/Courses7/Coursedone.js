import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/errorActions';
import { setCourseOne, setCourseOneGoogle } from '../../actions/authActions';
import { reduxForm } from 'redux-form';

class Coursedone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      const { user } = this.props.auth;
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create certificate
      const payload = {
        name: user.name,
        email: user.email,
        pkey: "GABC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD"
      };

      console.log('Sending certificate request with payload:', payload);
      
      const response = await fetch("https://edunode.herokuapp.com/api/certificates/diploma7", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));
      
      console.log('Certificate API response:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      
      if (response.ok && data.success && data.certificate?.certificateNumber) {
        // Redirect to certificate after 3 seconds
        this.redirectTimeout = setTimeout(() => {
          this.props.navigate(`/certificates/${data.certificate.certificateNumber}`);
        }, 3000);
      } else {
        throw new Error(data.message || `Failed to generate certificate: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Certificate generation error details:', {
        error,
        response: error.response,
        stack: error.stack
      });
      this.setState({ 
        error: error.message || 'Failed to generate certificate',
        isLoading: false 
      });
    }
  }

  componentWillUnmount() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  }

  render() {
    const { isLoading, error } = this.state;
    const { user } = this.props.auth || {};

    if (error) {
      return (
        <div className="alert alert-danger m-3">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="text-center p-5">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <h4 className="mt-3">Generating your certificate...</h4>
        <p>You will be redirected shortly</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth,
});

// Create a wrapper component to use the useNavigate hook
const withNavigate = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
};

Coursedone = connect(mapStateToProps, {
  setCourseOne,
  setCourseOneGoogle,
  clearErrors,
})(withNavigate(Coursedone));

export default reduxForm({
  form: 'coursedone',
})(Coursedone);