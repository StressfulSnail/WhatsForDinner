import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";
import {inputDateToDateObject} from "../common/DateFormat";

const styles = {
};

const EditPlanModal = function (props) {
    const today = new Date();
    const todayInOneYear = new Date();
    todayInOneYear.setFullYear(todayInOneYear.getFullYear() + 1);

    const initialState = {
        name: null,
        offset: 0,
        startDate: null,
        endDate: null,
    };

    const [plan, setPlan] = useState(initialState);
    const [isValid, setValid] = useState(true);

    if (props.plan.startDate && !plan.startDate) {
        setPlan({
            ...plan,
            startDate: props.plan.startDate && props.plan.startDate.toISOString().split('T')[0],
            endDate: props.plan.endDate && props.plan.endDate.toISOString().split('T')[0],
        });
    }

    const save = () => {
        if (plan.name && plan.name.length > 50) {
            return setValid(false);
        }
        setValid(true);
        props.onSave(plan.name, plan.offset);
        setPlan(initialState);
    };
    const close = () => {
        setPlan(initialState);
        props.onCancel();
    };

    const handleDateChange = ({ target }) => {
        const selectedDate = inputDateToDateObject(target.value);

        const offset = selectedDate.getTime() - props.plan.startDate.getTime();

        const endDate = new Date(props.plan.endDate);
        endDate.setTime(props.plan.endDate.getTime() + offset);

        setPlan({ ...plan, offset, endDate: endDate.toISOString().split('T')[0] });
    };

    return <Dialog open={props.open} onClose={close}>
        <DialogTitle>Edit Meal Plan</DialogTitle>
        <DialogContent>
            { !isValid ? <Typography color="error">Oops! That's invalid! Please make sure that Name is under 50 characters!</Typography> : '' }
            <TextField
                label="Name"
                defaultValue={props.plan && props.plan.name}
                inputProps={{ maxLength: 50 }}
                onChange={({ target }) => setPlan( { ...plan, name: target.value })}
                fullWidth/>
            <TextField
                label="Start Date"
                type="date"
                defaultValue={plan.startDate}
                inputProps={{
                    min: today.toISOString().split('T')[0],
                    max: todayInOneYear.toISOString().split('T')[0],
                }}
                onChange={handleDateChange}
                fullWidth/>
            <TextField
                label="End Date"
                type="date"
                value={plan.endDate}
                disabled
                fullWidth/>
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={save}>Save</Button>
            <Button color="secondary" onClick={close}>Cancel</Button>
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