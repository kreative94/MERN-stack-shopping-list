import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppNavbar from './AppNavbar';
class Routes extends React.Component {
    render() {
        return (
            <Router>
                <AppNavbar />
                <Switch>
                </Switch>
            </Router>
        );
    }
}

export default Routes;