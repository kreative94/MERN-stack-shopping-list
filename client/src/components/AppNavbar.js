import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Collapse, 
    Navbar,
    NavbarToggler,
    NavbarBrand,Nav,NavItem,
    NavLink, Container
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

    componentDidMount() {
        this.navAppearance();
    }

    navAppearance = () => {
        const { isAuthenticated } = this.props.auth;
        // let page = "http://localhost:3000/";
      
        // let windowLocation = window.location.href;
        const siteNav = document.getElementById('site-nav');
        
        siteNav.classList.remove("mb-5", "bg-primary");
        siteNav.classList.add("home");

    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
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
        color="primary" 
        dark expand="sm" 
        className="mb-5">
            <Container>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
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
    auth: state.auth,

});

export default connect(mapStateToProps, null)(AppNavbar);