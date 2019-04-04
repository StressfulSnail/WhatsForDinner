import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import LoginDialog from '../../components/LoginDialog.js';
import image from '../../static/images/foodiesfeed.com_summer-barbeque-feast.jpg';
import { LOAD_ACCOUNT, LOGIN, LOGOUT } from "../../actions/accountActions";

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

const mapStateToProps = (state) => { // map only the items in the state this component will use, if any of these values change the component will reload
    return {
        isAuthenticated: state.account.isAuthenticated,
        token: state.account.token,
        accountData: state.account.accountData,
    }
};

const mapActionsToProps = (dispatch) => { // map actions needed for this component
    return {
        login: (token) => dispatch({ type: LOGIN, payload: { token } }),
        logout: () => dispatch({ type: LOGOUT }),
        loadAccount: (accountData) => dispatch({ type: LOAD_ACCOUNT, payload: { accountData } }),
    }
};

const connectedLandingPage = connect(mapStateToProps, mapActionsToProps)(LandingPage);
export default withStyles(styles)(connectedLandingPage);