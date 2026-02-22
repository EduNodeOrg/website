import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { styled as muiStyled } from '@mui/material/styles';
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { clearErrors } from "../../actions/errorActions";
import { newPost } from "../../actions/authActions";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ModernNavbar from '../Dashboard/layout/ModernNavbar';
import UserContext from './UserContext';
import home from './homework.png';


// Modern styled components matching dashboard theme
const DashboardContainer = styled(Box)(({ theme }) => ({
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
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#b8c5d6',
    '& fieldset': {
      borderColor: 'rgba(123, 47, 247, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(123, 47, 247, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7b2ff7',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#b8c5d6',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#ffffff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(123, 47, 247, 0.3)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(123, 47, 247, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7b2ff7',
  },
  '& .MuiSvgIcon-root': {
    color: '#b8c5d6',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  '& .MuiChip-deleteIcon': {
    color: '#ffffff',
    '&:hover': {
      color: '#ff4444',
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
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

const tagsList = [
  "Web3",
  "Blockchain",
  "Crypto",
  "Smart Contracts",
  "NFTs",
  "Soroban",
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
      description: '',
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous",
      success: false,
      isLoading: false,
      editorState: EditorState.createEmpty(),
      errors: {},
      privatee: false,
      showPopup: false,
      image: ''
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }
  handleSwitchChange(event) {
    this.setState({ privatee: event.target.checked });
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
    // Validate the form fields
    const errors = {};
    if (this.state.title.trim() === "") {
      errors.title = "Title is required.";
    }
    if (this.state.editorState.getCurrentContent() === "") {
      errors.description = "Description is required.";
    }
    if (this.state.tags.length === 0) {
      errors.tags = "At least one tag must be selected.";
    }
    if (Object.keys(errors).length > 0) {
      // Display error messages and return if there are validation errors
      this.setState({ errors });
      return;
    }
    this.setState({ showPopup: true });

    const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous";
    fetch('https://edunode.herokuapp.com/api/post/increment-trophy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to increment trophy');
        }
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({ showPopup: true });
    e.preventDefault();
    const data = {
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "anonymous", // this.props.auth.user.email
      title: this.state.title,
      tags: this.state.tags,
      link: this.state.link,
      description: convertToHTML(this.state.editorState.getCurrentContent()),
      privatee: this.state.privatee,
      image: this.state.image,
    };
    try {

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
    this.setState({ errors: {} });



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

  handleClosePopup = () => {
    this.setState({ showPopup: false });
  };


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


  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      description: this.state.description,
    });
  };


  render() {
    const { editorState } = this.state;
    const { tags, title, link, description, success, showPopup } = this.state;
    const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "";
    const { errors } = this.state;
    
    return (
      <UserContext.Provider value={this.state.email}>
        <DashboardContainer>
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
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

          <ModernNavbar />

          <ContentContainer maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FormContainer>
                <SectionTitle variant="h2" component="h1">
                  Create New Post
                </SectionTitle>

                <Box component="form" onSubmit={this.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Tags Section */}
                  <Box>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2, fontWeight: 'bold' }}>
                      Tags:
                    </Typography>
                    <StyledSelect
                      fullWidth
                      value=""
                      onChange={(e) => {
                        const selectedTag = e.target.value;
                        if (selectedTag && !tags.includes(selectedTag)) {
                          this.setState({ tags: [...tags, selectedTag] });
                        }
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Select a tag</MenuItem>
                      {tagsList.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                    {errors.tags && <Alert severity="error" sx={{ mt: 1 }}>{errors.tags}</Alert>}
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {tags.map((tag) => (
                        <StyledChip
                          key={tag}
                          label={tag}
                          onDelete={() => this.handleTagRemove(tag)}
                          deleteIcon={<Box component="span" sx={{ cursor: 'pointer' }}>×</Box>}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Title Field */}
                  <StyledTextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title}
                  />

                  {/* Link Field */}
                  <StyledTextField
                    fullWidth
                    label="Link"
                    value={link}
                    onChange={(e) => this.setState({ link: e.target.value })}
                    variant="outlined"
                  />

                  {/* Image Upload */}
                  <Box>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2, fontWeight: 'bold' }}>
                      Image:
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="image-upload"
                      type="file"
                      onChange={this.onChangeImage}
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outlined" component="span" sx={{ 
                        color: '#b8c5d6', 
                        borderColor: 'rgba(123, 47, 247, 0.3)',
                        '&:hover': {
                          borderColor: '#7b2ff7',
                          backgroundColor: 'rgba(123, 47, 247, 0.1)',
                        }
                      }}>
                        Upload Image
                      </Button>
                    </label>
                  </Box>

                  {/* Description Editor */}
                  <Box>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2, fontWeight: 'bold' }}>
                      Description:
                    </Typography>
                    <Box sx={{
                      '& .rdw-editor-wrapper': {
                        border: '1px solid rgba(123, 47, 247, 0.3)',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(26, 31, 58, 0.5)',
                      },
                      '& .rdw-editor-toolbar': {
                        border: 'none',
                        borderBottom: '1px solid rgba(123, 47, 247, 0.3)',
                        backgroundColor: 'rgba(26, 31, 58, 0.8)',
                      },
                      '& .rdw-editor-main': {
                        minHeight: '200px',
                        padding: '16px',
                      },
                      '& .public-DraftEditor-content': {
                        color: '#ffffff',
                        minHeight: '200px',
                      },
                    }}>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                      />
                    </Box>
                    {errors.description && <Alert severity="error" sx={{ mt: 1 }}>{errors.description}</Alert>}
                  </Box>

                  {/* Private Switch */}
                  <FormControlLabel
                    value="private"
                    control={<Switch color="primary" checked={this.state.privatee} onChange={this.handleSwitchChange} />}
                    label="Private"
                    labelPlacement="start"
                    sx={{ color: '#b8c5d6' }}
                  />

                  {/* Submit Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <SubmitButton type="submit" variant="contained">
                      Submit Post
                    </SubmitButton>
                  </Box>

                  {/* Success Message */}
                  {success && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Success! Your post has been submitted.
                    </Alert>
                  )}
                </Box>
              </FormContainer>
            </motion.div>
          </ContentContainer>

          {/* Success Modal */}
          <Modal
            open={showPopup}
            onClose={this.handleClosePopup}
            aria-labelledby="congratulations-modal"
            aria-describedby="congratulations-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'rgba(26, 31, 58, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 47, 247, 0.3)',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
            }}>
              <Typography id="congratulations-modal" variant="h4" component="h2" sx={{ 
                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
                fontWeight: 'bold'
              }}>
                Congratulations!
              </Typography>
              <Typography id="congratulations-modal-description" sx={{ color: '#b8c5d6', mb: 3 }}>
                Thank you for adding a new post.
              </Typography>
              <Box
                component="img"
                src={home}
                alt="Trophy"
                sx={{ width: 150, mb: 3 }}
              />
              <Button onClick={this.handleClosePopup} variant="contained" sx={{
                background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                }
              }}>
                Close
              </Button>
            </Box>
          </Modal>
        </DashboardContainer>
      </UserContext.Provider>
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