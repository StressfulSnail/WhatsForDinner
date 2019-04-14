import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';
import MealPlansPage from './views/public/MealPlansPage';
import LoadingIndicator from "./components/LoadingIndicator";
import {connect} from "react-redux";

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <LoadingIndicator isLoading={this.props.isLoading}/>
                <Route exact path="/" component={LandingPage} />
                <Route path="/create-account" component={CreateAccountPage} />
                <Route path="/recover-account" component={AccountRecoveryPage} />
                <Route path="/home" compenent={HomePage} />
                <Route path="/meal-plans" component={MealPlansPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isLoading,
    }
};

export default connect(mapStateToProps)(UIRoutes);