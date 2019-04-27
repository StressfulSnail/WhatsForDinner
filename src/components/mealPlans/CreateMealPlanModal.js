import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, Typography, withStyles} from "@material-ui/core";
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

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [isValid, setValid] = useState(true);
    const create = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (startDateObj > endDateObj) {
            return setValid(false);
        }
        setValid(true);
        props.onSave({ startDate, endDate });
    };

    return <Dialog open={props.open} onClose={props.onCancel}>
        <DialogTitle>Create New Meal Plan</DialogTitle>
        <DialogContent>
            { props.error ? <Typography color="error">Oh No! Something went wrong! Please try again.</Typography> : '' }
            { !isValid ? <Typography color="error">Oops! That's an invalid date selection! Please make sure that Start Date is before End Date!</Typography> : '' }
            <TextField
                label="Start Date"
                type="date"
                id="start"
                defaultValue={startDate}
                inputProps={{
                    min: today,
                    max: oneYearFromNow,
                }}
                onChange={({ target }) => setStartDate(target.value)}
                fullWidth/>
            <TextField
                label="End Date"
                type="date"
                id="end"
                defaultValue={endDate}
                inputProps={{
                    min: today,
                    max: oneYearFromNow,
                }}
                onChange={({ target }) => setEndDate(target.value)}
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
    error: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(CreateMealPlanModal);