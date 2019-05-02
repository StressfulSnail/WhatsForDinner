import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";

const measurementUnits = [
    'Whole',
    'Cup',
    'Teaspoon',
];

const styles = {};

const CreateRecipeIngredientsListItem = function (props) {
    const { ingredient } = props;
    return <div>
        <Select value={ingredient.measurementUnit}
                onChange={event => ingredient.measurementUnit = event.target.value}>
            {measurementUnits.map((unit, index) => <MenuItem key={index} value={unit}>{unit}</MenuItem>)}
        </Select>
        <TextField type="number" label="Count" onChange={event => ingredient.measurementCount = event.target.value} />
        <TextField type="text" label="Ingredient" onChange={event => ingredient.name = event.target.value} />
    </div>
};

export default withStyles(styles)(CreateRecipeIngredientsListItem);