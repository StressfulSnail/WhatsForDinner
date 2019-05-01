import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import customStore, { history } from './customStore';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, deepOrange } from "@material-ui/core/colors";
import LoadingIndicator from "./components/common/LoadingIndicator";
import PrivateRoute from "./components/common/PrivateRoute";
import LandingPage from './views/public/LandingPage.js';
import CreateAccountPage from './views/public/CreateAccountPage.js';
import AccountRecoveryPage from './views/public/AccountRecoveryPage.js';
import HomePage from './views/public/HomePage.js';
import MealPlansPage from './views/public/MealPlansPage';
import MealPlanPage from './views/public/MealPlanPage';
import RecipePage from './views/public/MyCookbook';
import AccountPage from './views/public/AccountPage';
import ErrorPage from './views/public/ErrorPage';

const LANDING = "/";
const HOME = "/home";
const ACCOUNT = "/account";
const CREATE_ACCOUNT = "/create-account";
const RECOVER_ACCOUNT = "/recover-account";
const MY_COOKBOOK = "/my-cookbook";
const MEAL_PLANS = "/meal-plans";

const store = customStore();

const darkGreen = green[900];
const darkOrange = deepOrange[600];

const theme = createMuiTheme({
    palette: {
        primary: {
            main: darkGreen
        },
        secondary: {
            main: darkOrange
        },
        background: {
            default: darkOrange
        }
    }
});

class UIRoutes extends Component {
    render() {

        return (

            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <LoadingIndicator />
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path={LANDING} component={LandingPage} />
                            <Route path={CREATE_ACCOUNT} component={CreateAccountPage} />
                            <Route path={RECOVER_ACCOUNT} component={AccountRecoveryPage} />
                            <PrivateRoute path={HOME} component={HomePage} />
                            <PrivateRoute path={ACCOUNT} component={AccountPage} />
                            <PrivateRoute path={MY_COOKBOOK} component={RecipePage} />
                            <PrivateRoute exact path={MEAL_PLANS} component={MealPlansPage} />
                            <PrivateRoute exact path={`${MEAL_PLANS}/:id`} component={MealPlanPage} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </Provider>

        );
    };
}

export {
    LANDING,
    HOME,
    ACCOUNT,
    CREATE_ACCOUNT,
    RECOVER_ACCOUNT,
    MY_COOKBOOK,
    MEAL_PLANS
}

export default UIRoutes;