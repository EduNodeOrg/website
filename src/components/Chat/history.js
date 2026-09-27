import React, { Component } from 'react'
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import { reduxForm } from "redux-form";
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import "./style.css"
import { Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Navbar1 from '../Dashboard/Navbar1';

const PageContainer = styled(Box)(() => ({
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 'bold',
}));

const MessageCard = styled(Box)(() => ({
    background: 'rgba(26, 31, 58, 0.6)',
    border: '1px solid rgba(123, 47, 247, 0.3)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '12px',
}));


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
            prompt: "",
            isLoading: false,
            errors: {},
            messages: [], // Add this line
            input: '',
            sidebarRef: React.createRef(),
        }

        this.onChange = this.onChange.bind(this)


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



    async componentDidMount() {
        const { input, email } = this.state;
        // Get the chat history from the backend and update the state with it
        const response = await fetch(`https://edunode.herokuapp.com/api/chat/openai/${email}`);
        const data = await response.json();
        const chatHistory = data.map(chat => ({ user: chat.input, ai: chat.output }));
        this.setState({ messages: chatHistory });


    }

    render() {
        const {
            isAuthenticated,
        } = this.props.auth;

        if (isAuthenticated) {
            const { messages } = this.state;
            return (
                <PageContainer>
                    <Navbar1 />
                    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, pt: 6, pb: 4 }}>
                        <PageTitle variant="h4" component="h1">Chat History</PageTitle>
                        {messages.length === 0 && (
                            <Typography sx={{ color: '#b8c5d6', textAlign: 'center' }}>
                                No chat history yet — ask the AI something on the Chat page.
                            </Typography>
                        )}
                        {messages.map((message, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <MessageCard>
                                    <Typography variant="subtitle2" sx={{ color: '#00d4ff' }}>You</Typography>
                                    <Typography sx={{ color: '#e2e8f0' }}>{message.user}</Typography>
                                </MessageCard>
                                <MessageCard>
                                    <Typography variant="subtitle2" sx={{ color: '#7b2ff7' }}>AI</Typography>
                                    <Typography sx={{ color: '#e2e8f0' }}>{message.ai}</Typography>
                                </MessageCard>
                            </Box>
                        ))}
                    </Box>
                </PageContainer>
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

History = connect(
    mapStateToProps, { verifyCode, clearErrors }
)(History);

export default History = reduxForm({
    form: "ReduxForm",
    fields: ["input", "email"],
    clearErrors

})((History));