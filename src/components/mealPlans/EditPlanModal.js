import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";

const styles = {
};

const EditPlanModal = function (props) {
    const [plan, setPlan] = useState({ name: null });
    const save = () => {
        if (plan.name) {
            props.plan.name = plan.name;
        }
        props.onSave(props.plan);
    };

    return <Dialog open={props.open} onClose={props.onCancel}>
        <DialogTitle>Edit Meal Plan</DialogTitle>
        <DialogContent>
            <TextField
                label="Name"
                defaultValue={props.plan && props.plan.name}
                inputProps={{ maxLength: 50 }}
                onChange={({ target }) => setPlan( { ...plan, name: target.value })}
                fullWidth/>
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={save}>Save</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

EditPlanModal.propTypes = {
    open: PropTypes.bool,
    plan: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(EditPlanModal);