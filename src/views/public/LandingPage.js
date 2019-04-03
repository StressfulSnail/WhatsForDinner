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

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

// Avoid properties collisions
const LoginLink = props => <Link to="/login" {...props} />;

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