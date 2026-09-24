import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

class LoggedOut extends Component {
    constructor(props){
        super(props);
       
        this.state = {
            isLoggedOut: false
        };
    }

    componentDidMount(){
        localStorage.removeItem('token');
        this.setState({ isLoggedOut: true });
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Logged out | EduNode</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <NavBar />
                <div className="container py-5 text-center">
                    <h1>You are now logged out</h1>
                    <p>Thanks for stopping by — your session has ended.</p>
                    <Link className="btn btn-primary" to="/">Back to home</Link>{' '}
                    <Link className="btn btn-outline-primary" to="/login">Log in again</Link>
                </div>
                <Footer />
            </>
        );
    }
}

export default LoggedOut;
