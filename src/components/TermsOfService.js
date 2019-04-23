import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export default class TermsOfService extends React.Component {
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

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={this.handleClickOpen}
                >
                    Terms of Service
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="login-dialog"
                >
                    <DialogTitle id="login-dialog">TermsOfService</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Terms of Service:
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} variant="contained" color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}