import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
};

const ConfirmDeleteModal = function (props) {
    return <Dialog open={props.open} onClose={props.onCancel}>
        <DialogContent>
            Are you sure you want to delete { props.itemName || 'this' }?
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={props.onConfirm}>Yes, delete</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

ConfirmDeleteModal.propTypes = {
    open: PropTypes.bool,
    itemName: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(ConfirmDeleteModal);