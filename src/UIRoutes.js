import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './index.css';
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';
import MealPlansPage from './views/public/MealPlansPage';
import MealPlanPage from './views/public/MealPlanPage';
import RecipePage from './views/public/MyCookbook';
import AccountPage from './views/public/AccountPage';
import LoadingIndicator from "./components/common/LoadingIndicator";
import {connect} from "react-redux";

const LANDING = "/";
const HOME = "/home";
const ACCOUNT = "/account";
const CREATE_ACCOUNT = "/create-account";
const RECOVER_ACCOUNT = "/recover-account";
const MY_COOKBOOK = "/my-cookbook";
const MEAL_PLANS = "/meal-plans";

class UIRoutes extends Component {
    render() {
        return (
            <div>
                <LoadingIndicator isLoading={this.props.isLoading}/>
                <Route exact path={LANDING} component={LandingPage} />
                <Route path={CREATE_ACCOUNT} component={CreateAccountPage} />
                <Route path={RECOVER_ACCOUNT} component={AccountRecoveryPage} />
                <Route path={HOME} component={HomePage} />
                <Route path={ACCOUNT} component={AccountPage} />
                <Route path={MY_COOKBOOK} component={RecipePage} />
                <Route exact path={MEAL_PLANS} component={MealPlansPage} />
                <Route exact path={`${MEAL_PLANS}/:id`} component={MealPlanPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isLoading,
    }
};

export {
    LANDING,
    HOME,
    ACCOUNT,
    CREATE_ACCOUNT,
    RECOVER_ACCOUNT,
    MY_COOKBOOK,
    MEAL_PLANS
}

export default connect(mapStateToProps)(UIRoutes);