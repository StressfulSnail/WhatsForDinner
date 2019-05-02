import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core";
import EditAccountForm from "./EditAccountForm";
import AccountService from "../services/accountService";
import {LOAD_ACCOUNT, LOGIN} from "../actions/accountActions";
import connect from "react-redux/es/connect/connect";

class EditAccountDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    submit = (values) => {
        const { username, email, firstName, lastName, middleName } = values;
        const { token, account, dispatchLoadAccount } = this.props;

        AccountService.editAccount(token, account.id, username, email, firstName, lastName, middleName)
            .then( () => {
                // TODO dialogue?
                return AccountService.getAccountByID(token, account.id);
            })
            .then( (account) => {
                this.props.dispatchLoadAccount(account);
                this.handleClose();
            })
            .catch( (error) => {
                // TODO: Error Reporting
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
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