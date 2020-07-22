import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavItem, Container
} from 'reactstrap';
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from './auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

    return(
        <Navbar id="site-nav" 
        color="light" 
        light
        expand="sm">
            <Container>
                <NavbarBrand className="text-center" href="/">TODOless</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    { isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);