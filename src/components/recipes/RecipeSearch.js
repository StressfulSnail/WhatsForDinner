import React, {useState} from 'react';
import {Button, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import RecipePreview from "./RecipePreview";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";

const styles = {
    grid: {
        padding: '10px',
    },
};

const RecipeSearch = function (props) {
    const { classes, recipes } = props;
    const [searchedRecipes, setSearchedRecipes] = useState(null);

    const searchRecipes = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearchedRecipes(recipes.filter(recipe => recipe.name.toLowerCase().indexOf(searchText) > -1));
    };

    const recipesToRender = searchedRecipes ? searchedRecipes : recipes;

    return <div>
        <Grid container spacing={24} className={classes.grid} justify="center" alignItems="center">
            <Grid item xs={12} md={10}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            id="search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                maxLength: 50,
                            }}
                            onChange={searchRecipes}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div align="right">
                            <Button color="primary"
                                    variant="contained"
                                    onClick={''}>NEW RECIPE</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container justify="space-evenly" alignItems="flex-start" spacing={16}>
            {recipesToRender.map(recipe => (
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