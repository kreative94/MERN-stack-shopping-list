import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import About from '../screens/About';
import {
    Collapse, 
    Navbar,
    NavbarToggler,
    NavbarBrand, Nav, NavItem,
    NavLink, Container
} from 'reactstrap';
// import RegisterModal from "./auth/RegisterModal";
// import LoginModal from "./auth/LoginModal";
// import Logout from './auth/Logout';

export default class AppFooter extends Component {
    render() {
        return(
            <footer>
                <Container> 
                    <Nav>
                        <NavLink href="https://github.com/kreative94"><i class="fab fa-github"></i></NavLink>
                    </Nav>
                </Container>
            </footer>
        )
    }
}