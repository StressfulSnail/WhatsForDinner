import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";


const styles = {
};

const CreateMealPlanModal = function (props) {
    const todayDate = new Date();
    const oneYearFromNowDate = new Date();
    oneYearFromNowDate.setFullYear(todayDate.getFullYear() + 1);
    const today = todayDate.toISOString().split('T')[0];
    const oneYearFromNow = oneYearFromNowDate.toISOString().split('T')[0];

    const create = () => props.onSave();

    return <Dialog open={props.open}>
        <DialogTitle>Create New Meal Plan</DialogTitle>
        <DialogContent>
            <TextField
                label="Start Date"
                type="date"
                id="start"
                defaultValue={today}
                inputProps={{
                    min: today,
                    max: oneYearFromNow,
                }}
                fullWidth/>
            <TextField
                label="End Date"
                type="date"
                id="end"
                defaultValue={today}
                inputProps={{
                    min: today,
                    max: oneYearFromNow,
                }}
                fullWidth/>
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={create}>Create</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

CreateMealPlanModal.propTypes = {
    open: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(CreateMealPlanModal);