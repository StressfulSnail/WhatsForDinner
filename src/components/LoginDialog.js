import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import accountService from "../services/accountService";
import {LOGIN} from "../actions/accountActions";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from "react-router-dom";

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: false,
            loading: false,
            username: '',
            password: ''
        };
    }


    updateUsername = (event) => {
        this.setState({username: event.target.value });
    };

    updatePassword = (event) => {
        this.setState({password: event.target.value });
    };

    login = () => {
        this.setState({ loading: true });
        accountService.validateAccount(this.state.username, this.state.password)
            .then((token) => {
                this.props.dispatchLogin(token);
                this.handleClose();
                this.props.history.push("/dashboard");
            })
            .catch(() => {
                this.setState({
                    error: true,
                    loading: false
                });
            }); // should show message to user instead
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            error: false,
            loading: false
        });
    };

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClickOpen}
                >
                    Login
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="login-dialog"
                >
                    <DialogTitle id="login-dialog">Login!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username and password to login!
                        </DialogContentText>
                        <TextField
                            error={this.state.error}
                            required
                            autoFocus
                            id="username"
                            label="username"
                            type="text"
                            onChange={this.updateUsername}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            error={this.state.error}
                            required
                            id="password"
                            label="password"
                            type="password"
                            onChange={this.updatePassword}
                            margin="dense"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        {this.state.loading && <CircularProgress size={24} />}
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.login}
                            color="primary"
                            disabled={this.state.loading}

                        >
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

/**
 *
 * @param state
 * @returns {{token: *}}
 */
const mapStateToProps = (state) => {
    return {
        token: state.account.token,
    }
};

/**
 *
 * @param dispatch
 * @returns {{dispatchLogin: (function(*): *)}}
 */
const mapActionsToProps = (dispatch) => {
    return {
        dispatchLogin: (token) => dispatch({ type: LOGIN, payload: { token } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(LoginDialog);

export default withRouter(connected);
