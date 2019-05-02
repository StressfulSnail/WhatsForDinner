import React from 'react';
import {Button, CardActions, CardContent, Typography, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

const styles = {
    media: {
        height: 140,
    },
    recipeDetail: {
        marginBottom: '-1em',
    },
    actionItem: {
      marginLeft: 'auto',
    },
};

// TODO have this create star icons
const getRatingStars = (number) => {
    let tempStr = '';
    for (let i = 0; i < number; i++) {
        tempStr += '*';
    }
    return tempStr;
};

const RecipePreview = function (props) {
    const { classes, recipe } = props;

    return <div>
        <Card className={classes.card}>
            { recipe.imageURL ? <CardMedia className={classes.media} image={recipe.imageURL} title="Recipe Image" /> : '' }
            <CardContent>
                <Typography component="h3">{recipe.name}</Typography>
                <Typography color="textSecondary" component="div">
                    <p className={classes.recipeDetail}>Rating: {getRatingStars(recipe.tasteRating)}</p>
                    <p className={classes.recipeDetail}>Prep Time: {recipe.prepTime}</p>
                    <p className={classes.recipeDetail}>Cook Time: {recipe.cookTime}</p>
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.actionItem} size="small" color="primary">View</Button>
            </CardActions>
        </Card>
    </div>
};

RecipePreview.propTypes = {
    recipe: PropTypes.object,
};

export default withStyles(styles)(RecipePreview);