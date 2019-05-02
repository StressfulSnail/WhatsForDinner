import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core";
import EditAccountForm from "./EditAccountForm";
import AccountService from "../services/accountService";
import { LOAD_ACCOUNT } from "../actions/accountActions";
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
        const { username, email, firstName, lastName, middleName } = values;
        const { token, account } = this.props;

        AccountService.editAccount(token, account.id, username, email, firstName, lastName, middleName)
            .then( () => {
                return AccountService.getAccountByID(token, account.id);
            })
            .then( (account) => {
                this.props.dispatchLoadAccount(account);
                this.handleClose();
                this.setState({
                    resultsOpen: true,
                    error: false,
                    resultsHeader: "Success!",
                    resultsMessage: "Account updated successfully!"
                });
            })
            .catch( (error) => {
                this.setState({
                    resultsOpen: true,
                    error: true,
                    resultsHeader: "Error",
                    resultsMessage: error.message
                });
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
                    Edit Account
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="edit-account-dialog"
                >
                    <DialogTitle id="edit-account-dialog">Edit Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Change your account details here
                        </DialogContentText>
                        <Paper>
                            <EditAccountForm onSubmit={this.submit} />
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


const mapActionsToProps = (dispatch) => {
    return {
        dispatchLoadAccount: (accountData) => dispatch({type: LOAD_ACCOUNT, payload: { accountData } })
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(EditAccountDialog);

export default connected;