import React from "react";
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

function CreateAccountSuccessDialog(props) {

    const { open, handleClose } = props;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="create-account-success"
            >
                <DialogTitle id="create-accoount-success">
                    YourAccount has been created successfully!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please check you email account for a confirmation email with you activation token,
                        and return to the landing page to log in with you username and password.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

CreateAccountSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default CreateAccountSuccessDialog;