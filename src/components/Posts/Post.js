import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import NavBar from "../NavBar"
import { clearErrors } from "../../actions/errorActions";
import { newPost } from "../../actions/authActions";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../Footer';
import Box from '@mui/material/Box';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html"; // Import the draftToHtml function
import { convertToRaw } from "draft-js";


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

const Textarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;


const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const SelectedTag = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  background-color: #f5f5f5;
  color: #333;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const RemoveTagButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  cursor: pointer;
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

const tagsList = [
  "Web3",
  "Blockchain",
  "Crypto",
  "Smart Contracts",
  "NFTs",
  "Solidity",
  "IT",
  "Dev",
  "E-learning",
  "Programming",
  "Javascript",
  "Nodejs",
  "Reactjs",
  "Other",
];

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      title: "",
      link: "",
      description: "",
      email: "",
      success: false,
      isLoading: false,
      errors: {}
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
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
    const data = {
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous", // this.props.auth.user.email
      title: this.state.title,
      tags: this.state.tags,
      link: this.state.link,
      description: this.state.description,
    };
    try {
      {/**   const response = await fetch("https://edunode.herokuapp.com/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });  */}
      //const result = await response.json();
      //console.log(result);
      this.setState({ success: true }); // Set success state to true
      console.log(data)
      await this.props.newPost(data)
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

  handleTagSelect(e) {
    const selectedTag = e.target.value;
    if (!this.state.tags.includes(selectedTag)) {
      this.setState({ tags: [...this.state.tags, selectedTag] });
    }
  }

  handleTagRemove(removedTag) {
    this.setState({
      tags: this.state.tags.filter((tag) => tag !== removedTag),
    });
  }

  render() {

    const Item = muiStyled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    const { tags, title, link, description, success } = this.state;
    return (

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Item><Sidebar /></Item>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Item><Topbar /></Item>
              <div style={{ padding: '10px' }}>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="tags">Tags:</Label>
                    <Select id="tags" onChange={this.handleTagSelect}>
                      <option value="">Select a tag</option>
                      {tagsList.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </Select>
                    <SelectedTagsContainer>
                      {tags.map((tag) => (
                        <SelectedTag key={tag}>
                          {tag}
                          <RemoveTagButton onClick={() => this.handleTagRemove(tag)}>
                            X
                          </RemoveTagButton>
                        </SelectedTag>
                      ))}
                    </SelectedTagsContainer>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="title">Title:</Label>
                    <Input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="link">Link:</Label>
                    <Input
                      type="text"
                      id="link"
                      value={link}
                      onChange={(e) => this.setState({ link: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Description:</Label>
                    {/**  <Textarea
                      id="description"
                      value={description}
                      //onChange={(e) => this.setState({ description: e.target.value })}
                    ></Textarea>*/}
                  </FormGroup>
                  <FormGroup>
                    <Editor
                      id="description"
                      initialContent={this.state.description}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onContentStateChange={(contentState) => {
                        const html = draftToHtml(contentState).replace(/<\/?p>/g, '');
                        this.setState({ description: html });
                      }}
                    /></FormGroup>
                  <SubmitButton type="submit">Submit</SubmitButton>
                  {success && (
                    <div style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
                      Success! Your post has been submitted.
                    </div>
                  )}
                </Form>
                <hr />

              </div>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </div>



    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

Post = connect(
  mapStateToProps, { newPost }
)(Post)

export default Post = reduxForm({
  form: "postReduxForm",
  fields: ['email', "tags", 'title', "description", "link"],
  newPost,
  clearErrors,
})(Post)