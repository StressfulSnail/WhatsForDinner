import React from 'react';
import {withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import RecipePreview from "./RecipePreview";

const styles = {
};

const RecipeSearch = function (props) {
    const { recipes } = props;

    return <div>
        <Grid container justify="space-evenly" alignItems="flex-start" spacing={16}>
            {recipes.map(recipe => (
                <Grid item key={recipe.id} xs={12} md={4} lg={2}>
                    <RecipePreview recipe={recipe} />
                </Grid>
            ))}
        </Grid>
    </div>
};

RecipeSearch.propTypes = {
    recipes: PropTypes.array,
};

export default withStyles(styles)(RecipeSearch);