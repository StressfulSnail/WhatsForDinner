import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core";
import ChangePasswordForm from "./ChangePasswordForm";
import AccountService from "../services/accountService";

import connect from "react-redux/es/connect/connect";
import SuccessOrErrorDialog from "./common/SuccessOrErrorDialogue";

class EditAccountDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            resultsOpen: false,
            error: false,
            resultsHeader: "",
            resultsMessage: "",
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
    };

    submit = (values) => {
        const { newPassword } = values;
        const { token, account } = this.props;

        AccountService.changePassword(token, account.id, newPassword)
            .then( () => {
                this.setState({
                    resultsOpen: true,
                    error: false,
                    resultsHeader: "Success!",
                    resultsMessage: "Password changed successfully!"
                });
               this.handleClose();
            })
            .catch( (error) => {
                console.log(error.message);
                this.setState({
                    resultsOpen: true,
                    error: true,
                    resultsHeader: "Password change failed",
                    resultsMessage: error.message
                });
                this.handleClose();
            });
    };

    render() {

        const { resultsOpen, error, resultsHeader, resultsMessage } = this.state;

        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={this.handleClickOpen}
                >
                    Change Password
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="change-password-dialog"
                >
                    <DialogTitle id="change-password-dialog">Edit Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your new password
                        </DialogContentText>
                        <Paper>
                            <ChangePasswordForm onSubmit={this.submit} />
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
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

const connected = connect(mapStateToProps, null)(EditAccountDialog);

export default connected;