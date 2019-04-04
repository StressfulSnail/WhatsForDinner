import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../actions/accountActions';
import { connect } from 'react-redux';
import accountService from "../../services/accountService";

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
const HomeLink = (props) => <Link to="/" {...props} />;

class LoginPage extends React.Component {

    usernameUpdate = (event) => {
        this.username = event.target.value;
    };

    passwordUpdate = (event) => {
        this.password = event.target.value;
    };

    login = (username, password) => {
        accountService.validateAccount(this.username, this.password)
            .then((token) => this.props.dispatchLogin(token))
            .catch(() => console.error('oh no! you are not authenticated!')); // should show message to user instead
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Login {this.props.token + ''}
                        </Typography>
                        <Button color="inherit" component={HomeLink}>Home</Button>
                    </Toolbar>
                </AppBar>
                <div>
                    <TextField label="Username" variant="outlined" onChange={this.usernameUpdate}/>
                    <TextField label="Password" variant="outlined" onChange={this.passwordUpdate}/>
                    <Button color="primary" variant="contained" onClick={this.login}>Login</Button>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => { // map only the items in the state this component will use, if any of these values change the component will reload
    return {
        token: state.account.token,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        dispatchLogin: (token) => dispatch({ type: LOGIN, payload: { token } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(LoginPage);
export default withStyles(styles)(connected);