import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RecipeSearch from "../recipes/RecipeSearch";
import {deepOrange} from "@material-ui/core/colors";
import Slide from "@material-ui/core/Slide";

const styles = {
    content: {
        background: deepOrange[600],
    }
};

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const AddRecipeModal = function (props) {
    const { classes } = props;

    return <Dialog open={props.open} onClose={props.onCancel} fullScreen TransitionComponent={Transition}>
        <DialogTitle>Select Recipe</DialogTitle>
        <DialogContent className={classes.content}>
            <RecipeSearch recipes={props.recipes} select onSelect={props.onSelect}/>
        </DialogContent>
        <DialogContent>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </DialogContent>
    </Dialog>
};

AddRecipeModal.propTypes = {
    open: PropTypes.bool,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
    recipes: PropTypes.array,
};

export default withStyles(styles)(AddRecipeModal);