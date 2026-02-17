import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from '../../actions/authActions';
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import {
    Button
} from "reactstrap";
import withRouter from "../../withRouter";

class LogoutModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    static propTypes = {
        logout: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    };

    handleLogout = () => {
        this.props.logout();
        this.toggleModal();
        window.location.href = '/';
    };

    render() {

        return (
            <>
               
                    <Button outline onClick={this.handleLogout} size="lg">
                        Logout
                    </Button>
               

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.error
});

export default withRouter(
    connect(mapStateToProps, { clearErrors, logout })(LogoutModal)
);
