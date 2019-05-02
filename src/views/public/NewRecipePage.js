import React from "react";
import UserNavBar from "../../components/common/UserNavBar";
import {MY_COOKBOOK} from "../../UIRoutes";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { Link } from 'react-router-dom';
import CreateRecipeForm from "../../components/recipes/CreateRecipeForm";
import CreateRecipeIngredientsListItem from "../../components/recipes/CreateRecipeIngredientsListItem";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import recipeService from "../../services/recipeService";

const styles = {
    mainButton: {
        margin: '5px',
    },
};

class NewRecipePage extends React.Component {
    saveRecipe = async (values) => {
        this.props.loadingStart();
        await recipeService.createRecipe(this.props.token, values);
        this.props.loadingComplete();
        this.props.history.push(MY_COOKBOOK);
    };

    render() {
        const { classes } = this.props;
        return <div>
            <UserNavBar pageName={"My Cookbook - New Recipe"} currentPath={MY_COOKBOOK}/>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Paper>
                        <Button className={classes.mainButton}
                                color="secondary"
                                variant="contained"
                                component={Link}
                                to={MY_COOKBOOK}>CANCEL</Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Typography variant="h5">Recipe Details</Typography>
                        <CreateRecipeForm onSubmit={this.saveRecipe}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Typography variant="h5">Ingredients</Typography>
                        <CreateRecipeIngredientsListItem ingredient={{}}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        recipes: state.recipe.recipes,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE })
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(NewRecipePage);

export default withStyles(styles)(connected);