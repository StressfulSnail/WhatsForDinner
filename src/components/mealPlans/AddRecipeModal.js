import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/Button";

const styles = {
};

// TODO Currently setup to take in a recipe ID, need to switch out to recipe search UI once implemented
const AddRecipeModal = function (props) {
    const [recipe, setRecipe] = useState({ id: -1, name: '' });
    const select = () => props.onSelect(recipe);

    return <Dialog open={props.open} onClose={props.onCancel}>
        <DialogTitle>Select Recipe</DialogTitle>
        <DialogContent>
            <TextField
                label="Recipe Id"
                type="number"
                onChange={({ target }) => setRecipe( { id: Number(target.value) })}
                fullWidth/>
        </DialogContent>
        <DialogContent>
            <Button color="primary" onClick={select}>Select Recipe</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

AddRecipeModal.propTypes = {
    open: PropTypes.bool,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(AddRecipeModal);