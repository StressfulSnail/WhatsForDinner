import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, List, ListItem, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";
import TimeFormat from "../common/TimeFormat";
import DateFormat from "../common/DateFormat";

const styles = {
};

const MealTimeSelectionModal = function (props) {
    const [state, setState] = useState({
        meal: null,
        newMeal: null,
        showInitialDialog: true,
        showMealSelection: false,
        showDateTimeSelection: false,
    });
    const select = () => props.onSelect(state.meal);
    const create = () => props.onSelect(state.newMeal);
    const cancel = () => {
        props.onCancel();
        setState({
            ...state,
            showInitialDialog: true,
            showMealSelection: false,
            showDateTimeSelection: false,
        })
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
                    <List>
                        {props.meals.map(meal =>
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
                    date time
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
    onSelect: PropTypes.func,
    onCreate: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(MealTimeSelectionModal);