import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import LoginPage from './views/public/LoginPage.js';

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/create-account" component={CreateAccountPage} />
                <Route path="/recover-account" component={LoginPage} />
                <Route path="/login" compenent={LoginPage} />
            </div>
        )
    }
}

export default UIRoutes;