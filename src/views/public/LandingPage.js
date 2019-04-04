import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
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
    }
};

// Avoid properties collisions
const LoginLink = props => <Link to="/login" {...props} />;

/**
 * This class represents the landing page: the first page the user sees when they navigate to the app.
 * This page has a Login dialogue popup, and allows navigation to the Create Account and Account Recovery Page.
 */
class LandingPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Welcome
                        </Typography>
                        <Button color="inherit" component={LoginLink}>Login</Button>
                        <br/>
                        <Link to="/recover">
                            <span>Forgot username/password?</span>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
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