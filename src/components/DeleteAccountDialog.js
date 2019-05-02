import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core";
import AccountService from "../services/accountService";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import SuccessOrErrorDialog from "./common/SuccessOrErrorDialogue";
import { LOGOUT } from "../actions/accountActions";
import {LANDING} from "../UIRoutes";
import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = {
    cssRoot: {
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: [900]
        }
    }
};

class DeleteAccountDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            resultsOpen: false,
            error: false,
            resultsHeader: "",
            resultsMessage: "",
            deleted: false,
        };
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleResultsClose = () => {
        this.setState({ resultsOpen: false });
        if (this.state.deleted === true) {
            this.props.dispatchLogout();
            this.props.history.push(LANDING);
        }
    };

    deleteAccount = () => {

        const { token, account } = this.props;

        AccountService.deleteAccount(token, account.id)
            .then( () => {
                this.setState({
                    resultsOpen: true,
                    error: false,
                    resultsHeader: "Account Deleted",
                    resultsMessage: "",
                    deleted: true
                });
                this.handleClose();
            })
            .catch( (error) => {
                console.log(error.message);
                this.setState({
                    resultsOpen: true,
                    error: true,
                    resultsHeader: "Delete Account Failed",
                    resultsMessage: error.message
                });
                this.handleClose();
            });
    };

    render() {

        const { resultsOpen, error, resultsHeader, resultsMessage } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.cssRoot}
                    size="small"
                    onClick={this.handleClickOpen}
                >
                    Delete Account
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="delete-account-dialog"
                >
                    <DialogTitle id="delete-account-dialog">Delete Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.deleteAccount}
                            variant="contained"
                            color="primary"
                            className={classes.cssRoot}
                        >
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
                <SuccessOrErrorDialog
                    open={resultsOpen}
                    error={error}
                    resultsHeader={resultsHeader}
                    resultsMessage={resultsMessage}
                    handleClose={this.handleResultsClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        account: state.account.accountData
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        dispatchLogout: () => dispatch({ type: LOGOUT })
    }
};

const styled = withStyles(styles)(DeleteAccountDialog);

const connected = connect(mapStateToProps, mapActionsToProps)(styled);

export default withRouter(connected);