import React, { Component } from 'react';
import {
    Nav,
    NavLink, Container
} from 'reactstrap';

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