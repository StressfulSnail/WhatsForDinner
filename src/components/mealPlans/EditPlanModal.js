import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
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

    if (props.plan.startDate && !plan.startDate) {
        setPlan({
            ...plan,
            startDate: props.plan.startDate && props.plan.startDate.toISOString().split('T')[0],
            endDate: props.plan.endDate && props.plan.endDate.toISOString().split('T')[0],
        });
    }

    const save = () => {
        props.onSave(plan.name, plan.offset);
        setPlan(initialState);
    };
    const close = () => {
        setPlan(initialState);
        props.onCancel();
    };

    const handleDateChange = ({ target }) => {
        const selectedDate = inputDateToDateObject(target.value);

        const offset = selectedDate.getDate() - props.plan.startDate.getDate();

        const endDate = new Date(props.plan.endDate);
        endDate.setDate(props.plan.endDate.getDate() + offset);

        setPlan({ ...plan, offset, endDate: endDate.toISOString().split('T')[0] });
    };

    return <Dialog open={props.open} onClose={close}>
        <DialogTitle>Edit Meal Plan</DialogTitle>
        <DialogContent>
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
                    min: today,
                    max: todayInOneYear,
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