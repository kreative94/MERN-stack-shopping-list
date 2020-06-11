import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/about" />
                </Switch>
            </Router>
        );
    }
}

export default Routes;