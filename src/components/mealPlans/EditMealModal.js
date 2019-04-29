import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";

const styles = {
};

const EditMealModal = function (props) {
    const [meal, setMeal] = useState({
        servingsRequired: null,
        note: null,
    });
    const [isValid, setValid] = useState(true);
    const save = () => {

        if ((meal.servingsRequired && meal.servingsRequired > 100) ||
            ( meal.note && meal.note.length > 50)) {
            return setValid(false);
        }

        setValid(true);
        if (meal.servingsRequired) {
            props.meal.servingsRequired = meal.servingsRequired;
        }
        if (meal.note) {
            props.meal.note = meal.note;
        }
        props.onSave(props.meal);
    };

    return <Dialog open={props.open} onClose={props.onCancel}>
        <DialogTitle>Edit Meal Details</DialogTitle>
        <DialogContent>
            { !isValid ? <Typography color="error">Oops! That's invalid! Please make sure that Servings is under 99 and Note is under 50 characters!</Typography> : '' }
            <TextField
                label="Servings"
                type="number"
                inputProps={{ min: 1, max: 99 }}
                defaultValue={props.meal && props.meal.servingsRequired}
                onChange={({ target }) => setMeal( { ...meal, servingsRequired: Number(target.value) })}
                fullWidth/>
            <TextField
                label="Note"
                defaultValue={props.meal && props.meal.note}
                inputProps={{ maxLength: 50 }}
                onChange={({ target }) => setMeal( { ...meal, note: target.value })}
                fullWidth/>
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={save}>Save</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

EditMealModal.propTypes = {
    open: PropTypes.bool,
    meal: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(EditMealModal);