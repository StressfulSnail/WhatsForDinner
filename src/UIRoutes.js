import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/create-account" component={CreateAccountPage} />
                <Route path="/recover-account" component={AccountRecoveryPage} />
                <Route path="/home" compenent={HomePage} />
            </div>
        )
    }
}

export default UIRoutes;