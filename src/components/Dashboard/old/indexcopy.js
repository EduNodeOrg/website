import React, { Component } from 'react'
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import { reduxForm } from "redux-form";
import withRouter  from '../../../withRouter'
//import { Redirect, BrowserRouter } from "react-router-dom";
import "./style.css";
import Main from "/main"


const validate = values => {
  const errors = {};
  const requiredFields = ["confirmationCode"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values.confirmationCode && values.confirmationCode.length < 4) {
    errors.confirmationCode = "Confirmation Code must be at least 5 characters";
  }
  return errors;
};

class Dashboard extends Component {

  

  render() {
    const { isLoading, isAuthenticated, isVerified,history } = this.props.auth

     if (!isAuthenticated) {

      history.push('/')

    }
    if (isAuthenticated && !isVerified) {
      //  <p class="loading">Loading...</p> <CircularProgress color="secondary" />
      history.push('/VerifyEmail');
    }
   
      return (
        <Main />
      )


  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Dashboard = connect(
  mapStateToProps, { verifyCode, clearErrors }
  )(Dashboard);

export default Dashboard = reduxForm({
  form: "VerifyEmailForm",
  fields: ["confirmationCode"],
  validate,
  clearErrors,
  verifyCode
})(withRouter(Dashboard));
