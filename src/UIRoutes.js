import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';
import MealPlansPage from './views/public/MealPlansPage';
import MealPlanPage from './views/public/MealPlanPage';
import LoadingIndicator from "./components/common/LoadingIndicator";
import {connect} from "react-redux";
import CookbookPage from "./views/public/CookbookPage";

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <LoadingIndicator isLoading={this.props.isLoading}/>
                <Route exact path="/" component={LandingPage} />
                <Route path="/create-account" component={CreateAccountPage} />
                <Route path="/recover-account" component={AccountRecoveryPage} />
                <Route path="/home" component={HomePage} />
                <Route exact path="/meal-plans" component={MealPlansPage} />
                <Route exact path="/meal-plans/:id" component={MealPlanPage} />
                <Route exact path="/cookbook" component={CookbookPage} />
                <Route exact path="/cookbook/recipe/:id" component={MealPlansPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isLoading,
    }
};

export default withRouter(connect(mapStateToProps)(UIRoutes));