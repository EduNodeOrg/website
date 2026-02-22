import React, { Component } from 'react'
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { reduxForm } from "redux-form";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ModernNavbar from '../Dashboard/layout/ModernNavbar';
import { Navigate } from "react-router-dom";
import dec from './decision-making.png';

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

const ChatContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(3),
  height: '70vh',
  overflow: 'auto',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.6)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(123, 47, 247, 0.2)',
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '& .MuiAlert-message': {
    fontSize: '0.9rem',
    color: '#1a1f3a', // Dark text for better readability
  },
  '& .MuiAlert-icon': {
    color: '#7b2ff7',
  },
}));

const SuggestionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
  },
}));

const SendButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 3),
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

const suggestedQuestions = [
  "What is Stellar Network?",
  "What is Soroban Smart Contract Platform?",
  "How does Oracles Work?",
  "What is Hyperledger?",
  "What is Ethereum?",
  "What is Solidity?",
  "How to build a React app?",
  "How does IPFS work?",
  "What are NFTs?"
];

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
      prompt: "",
      isLoading: false,
      errors: {},
      messages: [], // Add this line
      input: '',
      conversation: [],
      messages: [],
      sessionMessages: [],
      showPopup: false,
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidUpdate() {
    // Scroll to the end of the page if new messages have been added
    this.scrollToBottom();
  }

  scrollToBottom() {
    // Use the DOM API to scroll to the end of the page
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  handleSubmit = async (event) => {
    const { input, email, sessionMessages } = this.state;
    // Set loading to true when the request is sent
    this.setState({ loading: true });

    // Send the new question to the backend to get the AI's response
    const response = await fetch('https://edunode.herokuapp.com/api/chat/genai', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
      },
      body: JSON.stringify({ prompt: input, email }),
    });
    const data = await response.json();
    const aiResponse = data.text;

    // Update the state with the new chat message and set loading to false
    this.setState({ input: '', sessionMessages: [...sessionMessages, { user: input, ai: aiResponse }], loading: false });


    // Clear the input field after the message is sent
    this.setState({ input: '' });


    // Scroll to the end of the page
    window.scrollTo(0, document.body.scrollHeight);
    const hasShownPopupChat = localStorage.getItem('shownPopupChat');
   
    if (!hasShownPopupChat) {
      this.setState({ showPopup: true });
    }

   

  }



  handleClosePopup = () => {
    this.setState({ showPopup: false });
    localStorage.setItem('shownPopupChat', true);
  };


  render() {
    const {
      isAuthenticated,
    } = this.props.auth;

    if (isAuthenticated) {
      const { input, sessionMessages, loading, showPopup } = this.state;
      return (
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

          <ContentContainer maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle variant="h2" component="h1">
                AI Learning Assistant
              </SectionTitle>

              <ChatContainer>
                <Box sx={{ height: '100%', overflow: 'auto', pr: 2 }}>
                  {sessionMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <MessageContainer>
                        <StyledAlert severity="info">
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            User:
                          </Typography>
                          <Typography variant="body2">
                            {message.user}
                          </Typography>
                        </StyledAlert>
                        
                        {message.ai.match(/'''[\s\S]*?'''/g) ? (
                          <StyledAlert severity="success">
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              AI:
                            </Typography>
                            {message.ai.split(/'''[\s\S]*?'''/g).map((part, index) => (
                              part.match(/'''[\s\S]*?'''/) ? (
                                <SyntaxHighlighter
                                  key={index}
                                  language="python"
                                  style={docco}
                                >
                                  {part.replace(/'''/g, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <Typography key={index} component="span">
                                  {part}
                                </Typography>
                              )
                            ))}
                          </StyledAlert>
                        ) : (
                          <StyledAlert severity="success">
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              AI:
                            </Typography>
                            <Typography variant="body2">
                              {message.ai}
                            </Typography>
                          </StyledAlert>
                        )}
                      </MessageContainer>
                    </motion.div>
                  ))}

                  <Box sx={{ height: 60 }} />

                  <Box sx={{ 
                    background: 'rgba(26, 31, 58, 0.9)', 
                    p: 2, 
                    borderRadius: 2, 
                    mt: 2 
                  }}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 'bold' }}>
                      Suggested Questions:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {suggestedQuestions.map((question, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <SuggestionButton 
                            variant="contained" 
                            onClick={() => this.setState({ input: question }, this.handleSubmit)}
                            size="small"
                          >
                            {question}
                          </SuggestionButton>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField
                      label="Ask a question"
                      value={input}
                      onChange={(event) =>
                        this.setState({ input: event.target.value })
                      }
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
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
                      }}
                    />
                    <SendButton 
                      type="submit" 
                      variant="contained" 
                      onClick={() => this.handleSubmit()} 
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send"}
                    </SendButton>
                  </Box>
                </Box>
              </ChatContainer>
            </motion.div>
          </ContentContainer>

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
                You have gained a Badge for using our chat AI!
              </Typography>
              <Box
                component="img"
                src={dec}
                alt="Trophy"
                sx={{ width: 150, mb: 3 }}
              />
              <SendButton onClick={this.handleClosePopup}>
                Close
              </SendButton>
            </Box>
          </Modal>
        </DashboardContainer>
      );
    }

    if (!this.props.auth.isAuthenticated) {
      return <Navigate to="/" />;
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Chat = connect(
  mapStateToProps, { verifyCode, clearErrors }
)(Chat);

export default Chat = reduxForm({
  form: "ReduxForm",
  fields: ["input", "email"],
  clearErrors

})((Chat));