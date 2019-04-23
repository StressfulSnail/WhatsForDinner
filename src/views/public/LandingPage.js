import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginDialog from '../../components/LoginDialog.js';
import image from '../../static/images/foodiesfeed.com_summer-barbeque-feast.jpg';
import { LOAD_ACCOUNT, LOGIN, LOGOUT } from "../../actions/accountActions";

/**
 * Styles for this page's components
 * @type {{grow: {flexGrow: number}, root: {flexGrow: number}, menuButton: {marginRight: number, marginLeft: number}}}
 */
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        marginLeft: 10,
        marginRight: 0
    },
    link: {
        marginTop: 0,
        marginRight: 15,
        marginBottom: 10
    },
    image: {
        width: "100%",
        flexShrink: 1
    }
};

// Avoid properties collisions
const CreateAccountLink = (props) => <Link to="/create-account" {...props} />;

/**
 * This class represents the landing page: the first page the user sees when they navigate to the app.
 * This page has a Login dialogue popup, and allows navigation to the Create Account and Account Recovery Page.
 */
class LandingPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Welcome
                            </Typography>
                            <LoginDialog />
                            <Button
                                component={CreateAccountLink}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                Sign up!
                            </Button>
                        </Toolbar>
                        <br />
                        <Grid container justify="flex-end">
                            <Link
                                to="/recover-account"
                                variant="inherit"
                                color="secondary"
                                className={classes.link}
                            >
                                Forgot username/password
                            </Link>
                        </Grid>
                    </AppBar>
                </div>
                <img src={image} className={classes.image} alt="burrito" />
            </React.Fragment>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

/**
 * Maps items in the central redux store to the properties (props) argument.  Only maps items necessary for this
 * component.
 * @param state
 * @returns {{isAuthenticated: *, accountData: *, token: *}}
 */
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.account.isAuthenticated,
        token: state.account.token,
        accountData: state.account.accountData,
    }
};

/**
 * Maps actions on the central redux store to the properties (props) argument.  Only maps actions necessary for this
 * component.
 * @param dispatch
 * @returns {{logout: (function(): *), loadAccount: (function(*): *), login: (function(*): *)}}
 */
const mapActionsToProps = (dispatch) => { // map actions needed for this component
    return {
        login: (token) => dispatch({ type: LOGIN, payload: { token } }),
        logout: () => dispatch({ type: LOGOUT }),
        loadAccount: (accountData) => dispatch({ type: LOAD_ACCOUNT, payload: { accountData } }),
    }
};

/**
 * Binds redux mapping to component
 */
const connectedLandingPage = connect(mapStateToProps, mapActionsToProps)(LandingPage);

/**
 * Binds styles to component
 */
export default withStyles(styles)(connectedLandingPage);