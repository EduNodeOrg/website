import React, { Component } from 'react'
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import Box from '@mui/material/Box';
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../Footer';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import axios from "axios"
import "./style.css"
import { Navigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



const suggestedQuestions = [
  "What is Stellar?",
  "What is Soroban?",
  "What is smart Contracts?",
  
];


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth.user.email ? this.props.auth.user.email : '',
      prompt: "",
      isLoading: false,
      errors: {},
      messages: [], // Add this line
      input: '',
      conversation: [],
      messages: [],
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  /**
   handleSubmit = async (event) => {
    event.preventDefault();
    const { input, email, conversation } = this.state;
  
    if (input.trim()) {
      const newMessage = { message: input, sender: 'user' };
      this.setState({ conversation: [...conversation, newMessage], input: '' });
  
      try {
        const response = await axios.post('https://edunode.herokuapp.com/api/chat/openai', { input, email });
        const { msg } = response.data;
        const aiMessage = { message: msg, sender: 'ai' };
        this.setState({ conversation: [...conversation, aiMessage] });
  
        const historyResponse = await axios.get(`https://edunode.herokuapp.com/api/chat/openai/${email}`);
        const { data } = historyResponse;
        const history = data.map((item) => ({
          message: item.input,
          sender: 'user',
        })).concat(data.map((item) => ({
          message: item.output,
          sender: 'ai',
        })));
  
        this.setState({ conversation: history });
      } catch (error) {
        console.error('FRONETEND-ERROR', error);
      }
    }
  };
  */

  handleSubmit = async (event) => {
    event.preventDefault();
    const { input, email, messages } = this.state;

    // Send the new question to the backend to get the AI's response
    const response = await fetch('https://edunode.herokuapp.com/api/chat/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, email }),
    });
    const data = await response.json();
    const aiResponse = data.msg;

    // Update the state with the new chat message
    this.setState({ input: '', messages: [...messages, { user: input, ai: aiResponse }] });

    // Get the chat history from the backend and update the state with it
    const response1 = await fetch(`https://edunode.herokuapp.com/api/chat/openai/${email}`);
    const data1 = await response1.json();
    const chatHistory = data1.map(chat => ({ user: chat.input, ai: chat.output }));
    this.setState({ messages: chatHistory });
  }








  render() {



    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));


    const {

      isAuthenticated,

    } = this.props.auth;

    if (isAuthenticated) {

      const { input, messages } = this.state;
      return (

        <>
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid xs={5} sm={3.5} md={2}>
                  <Item><Sidebar /></Item>
                </Grid>

                <Grid xs={7} sm={8.5} md={10}>
                  <Item><Topbar /></Item>
                  <div>
                    <div>
                      <div>
                       
                        {messages.map((message, index) => (
                          <div key={index}>

                            <Alert severity="info"><Typography variant="h6">User:</Typography> {message.user}</Alert>

                            <Alert severity="success">
                              <Typography variant="h6">AI:</Typography> {message.ai}
                            </Alert>
                          </div>
                        ))}

<form onSubmit={this.handleSubmit}>



<div>
<h2>Suggested Questions:</h2>
{suggestedQuestions.map((question, index) => (
<button key={index} onClick={() => this.setState({ input: question }, this.handleSubmit)}>
{question}
</button>
))}
</div>


  <TextField
    label="Ask a question"
    value={input}
    onChange={(event) =>
      this.setState({ input: event.target.value })
    }
    fullWidth
  />
  <Button type="submit" variant="contained">
    Send
  </Button>
</form>
                      </div>
                    </div>
                  </div>

                </Grid>

              </Grid>
              <Footer />
            </Box>
          </div>
        </>

      )

    }


    if (!this.props.auth.isAuthenticated) {
      return (
        <Navigate to="/" />
      );
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