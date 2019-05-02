import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";

const SuccessOrErrorDialog = function(props) {

    const { open, error, resultsHeader, resultsMessage, handleClose } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="success-or-error-dialog"
            >
                <DialogTitle
                    id="success-or-error-dialog"
                    color={error ? "error" : "inherit"}
                >
                    {resultsHeader}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {resultsMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

SuccessOrErrorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    resultsHeader: PropTypes.string.isRequired,
    resultsMessage: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default SuccessOrErrorDialog