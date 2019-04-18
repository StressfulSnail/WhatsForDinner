import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, List, ListItem, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";
import TimeFormat from "../common/TimeFormat";
import DateFormat from "../common/DateFormat";

const styles = {
    mealsList: {
        maxHeight: '50vh',
    },
};

const MealTimeSelectionModal = function (props) {
    const minDate = props.startDate ? props.startDate.toISOString().replace('Z', '') : '';
    const maxDate = props.endDate ? props.endDate.toISOString().replace('Z', '') : '';

    const initState = {
        meal: null,
        newMealDateTime: minDate,
        newMealServingsRequired: 1,
        newMealNote: null,
        showInitialDialog: true,
        showMealSelection: false,
        showDateTimeSelection: false,
    };
    const [state, setState] = useState(initState);
    const select = () => {
        props.onSelect(state.meal);
        setState(initState); // reset state
    };
    const create = () => {
        props.onCreate({
            dateTime: state.newMealDateTime,
            servingsRequired: state.newMealServingsRequired,
            note: state.newMealNote,
        });
        setState(initState); // reset state
    };
    const cancel = () => {
        props.onCancel();
        setState(initState); // reset state
    };

    const handleListSelection = (meal) => () => {
        setState({ ...state, meal: meal });
    };

    return <Dialog open={props.open} onClose={cancel}>
        <DialogTitle>Select Meal Time</DialogTitle>
        <DialogContent>
            { state.showInitialDialog ?
                <div>
                    <Button variant="outlined" onClick={() => setState({ ...state, showInitialDialog: false, showMealSelection: true })}>
                        Add to Existing Meal
                    </Button>
                    &nbsp;OR&nbsp;
                    <Button variant="outlined" onClick={() => setState({ ...state, showInitialDialog: false, showDateTimeSelection: true })}>
                        Create new Meal Time
                    </Button>
                </div> : '' }
            { state.showMealSelection ?
                <div>
                    <List className={props.classes.mealsList}>
                        {props.meals.sort((m1, m2) => m1.dateTime - m2.dateTime).map(meal =>
                            <ListItem key={meal.id}
                                      onClick={handleListSelection(meal)}
                                      button
                                      selected={state.meal && state.meal.id === meal.id}>
                                <DateFormat value={meal.dateTime} /> at <TimeFormat value={meal.dateTime} /> (Serving {meal.servingsRequired})
                            </ListItem>
                        )}
                    </List>
                </div> : '' }
            { state.showDateTimeSelection ?
                <div>
                    <TextField
                        label="Meal Date/Time"
                        type="datetime-local"
                        defaultValue={minDate}
                        inputProps={{
                            min: minDate,
                            max: maxDate,
                        }}
                        onChange={({ target }) => setState({ ...state, newMealDateTime: target.value })}
                        fullWidth />
                        <TextField label="Servings Required"
                                   type="number"
                                   defaultValue={1}
                                   inputProps={{ min: 1 }}
                                   onChange={({ target }) => setState({ ...state, newMealServingsRequired: target.value })}
                                   fullWidth />
                        <TextField label="Notes"
                                   inputProps={{ maxLength: 50 }}
                                   onChange={({ target }) => setState({ ...state, newMealNote: target.value })}
                                   fullWidth />
                </div> : '' }
        </DialogContent>
        <DialogContent>
            { !state.showInitialDialog ? <Button color="primary" onClick={ state.showMealSelection ? select : create }>Select Time</Button> : '' }
            <Button color="secondary" onClick={cancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

MealTimeSelectionModal.propTypes = {
    open: PropTypes.bool,
    meals: PropTypes.array,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onSelect: PropTypes.func,
    onCreate: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(MealTimeSelectionModal);