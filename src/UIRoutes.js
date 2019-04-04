import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import LoginPage from './views/public/LoginPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';


class UIRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/recover" component={AccountRecoveryPage} />
                <Route path="/home" component={HomePage} />
            </div>
        )
    }
}

export default UIRoutes;