import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { clearErrors } from "../../actions/errorActions";
import Grid from '@mui/material/Grid';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import { EditorState } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Navbar1 from '../Dashboard/Navbar1';
import { TextField } from '@mui/material';
// Initialize editorState
// const editorState = EditorState.createEmpty();
// const options = { ... };
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  width: 100%; // Set the width to 100% or a specific width, e.g., 600px
  max-width: 600px; // Add a max-width to keep the form from becoming too wide
  height: auto; // Set the height to auto to adjust according to its content
  margin: 0 auto; // Center the form within its parent container
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; // Include padding and border in the form's dimensions
`;
// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // Set the width to 100% to align form fields to the left
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;


const SubmitButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0061c9;
  }
`;


class ValidCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      URL: "",
      university:'',
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
      success: false,
      isLoading: false,
      editorState: EditorState.createEmpty(),
      errors: {},
      privatee: false,
      image:''
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  async handleSubmit(e) {

    e.preventDefault();
    //const email= this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous";
    const data = {
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous", // this.props.auth.user.email
      name: this.state.name,
      url: this.state.URL,
      university:this.state.university,
      image: this.state.image,
    };
    try {
      const response = await fetch("https://edunode.herokuapp.com/api/certificates/validCertificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      this.setState({ success: true }); // Set success state to true
      console.log(data)

      if (this.props.auth.user) {
        console.log("users?", this.props.auth.user)
        return (
          <Navigate to="/dashboard" />
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageString = reader.result;
      this.setState({ image: imageString });
    };
  };

  render() {
    const {  name, URL,university,  success } = this.state;
    return (

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={20}>
              <Navbar1 />
              <br></br>
              <br></br>
              <br></br>
              <div style={{ padding: '10px' }}>
                <Form onSubmit={this.handleSubmit}>
                  <h4 style={{ fontSize: "2em", textAlign: "center" }}>Add Certificate</h4>
                  <br></br>
                  <FormGroup>
                    <Label htmlFor="title">Certificate Name:</Label>
                    <TextField
                    fullWidth
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="image">Certificate Image:</Label>
                      <Input
                        type="file"
                        id="image"
                        onChange={this.onChangeImage}
                      />
                    </FormGroup>
                  <FormGroup>
                    <Label htmlFor="link">University Diploma URL (optional):</Label>
                    <TextField
                    fullWidth
                      type="text"
                      id="url"
                      value={URL}
                      onChange={(e) => this.setState({ URL: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="title">University:</Label>
                    <TextField
                        name="grade"
                        id="grade"
                        fullWidth
                        value={university}
                        onChange={(e) => this.setState({ university: e.target.value })}
                      />
                  </FormGroup>
                  

                  <SubmitButton type="submit">Submit</SubmitButton>
                  {success && (
                    <div style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
                      Success! Your Certificate has been submitted.
                    </div>
                  )}
                </Form>
               
              

              </div>
            </Grid>
          </Grid>
          
        </Box>
<Footer/>
      </div>



    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

ValidCertificate = connect(
  mapStateToProps
)(ValidCertificate)

export default ValidCertificate = reduxForm({
  form: "postReduxForm",
  fields: ['email', "tags", 'title', "description", "link"],
  clearErrors,
})(ValidCertificate)