import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import LoginPage from './views/public/LoginPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/recover" component={AccountRecoveryPage} />
            </div>
        )
    }
}

export default UIRoutes;