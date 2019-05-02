import React from "react";
import UserNavBar from "../../components/common/UserNavBar";
import {MY_COOKBOOK} from "../../UIRoutes";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { Link } from 'react-router-dom';
import CreateRecipeForm from "../../components/recipes/CreateRecipeForm";
import CreateRecipeIngredientsListItem from "../../components/recipes/CreateRecipeIngredientsListItem";

const styles = {
    mainButton: {
        margin: '5px',
    },
};

class NewRecipePage extends React.Component {
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
                        <CreateRecipeForm />
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

export default withStyles(styles)(NewRecipePage);