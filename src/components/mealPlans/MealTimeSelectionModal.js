import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";

const styles = {
};

const MealTimeSelectionModal = function (props) {
    const [state, setState] = useState({
        mealId: -1,
        dateTime: null,
        showInitialDialog: true,
        showMealSelection: false,
        showDateTimeSelection: false,
    });
    const select = () => props.onSelect(state.mealId);
    const create = () => props.onSelect(state.dateTime);
    const cancel = () => {
        props.onCancel();
        setState({
            showInitialDialog: true,
            showMealSelection: false,
            showDateTimeSelection: false,
        })
    };

    return <Dialog open={props.open} onClose={cancel}>
        <DialogTitle>Select Meal Time</DialogTitle>
        <DialogContent>
            { state.showInitialDialog ?
                <div>
                    <Button variant="outlined" onClick={() => setState({ showInitialDialog: false, showMealSelection: true })}>
                        Add to Existing Meal
                    </Button>
                    &nbsp;OR&nbsp;
                    <Button variant="outlined" onClick={() => setState({ showInitialDialog: false, showDateTimeSelection: true })}>
                        Create new Meal Time
                    </Button>
                </div> : '' }
            { state.showMealSelection ?
                <div>
                    meal selection
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