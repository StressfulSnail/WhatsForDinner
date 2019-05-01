import React from 'react';
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import RecipeSearch from "../../components/recipes/RecipeSearch";
import {RECIPES_LOADED} from "../../actions/recipeActions";
import recipeService from "../../services/recipeService";
import UserNavBar from "../../components/common/UserNavBar";
import {MY_COOKBOOK} from "../../UIRoutes";

const styles = {};

class CookbookPage extends React.Component {

    componentDidMount() {
        const { token, recipes, loadingStart, loadingComplete, recipesLoaded } = this.props;
        if (recipes < 1) {
            loadingStart();
            recipeService.getPersonalRecipes(token)
                .then(loadedRecipes => {
                    recipesLoaded(loadedRecipes);
                    loadingComplete();
                });
        }
    }

    render() {
        return (
            <div>
                <UserNavBar pageName={"My sCookbook"} currentPath={MY_COOKBOOK}/>

                <RecipeSearch recipes={this.props.recipes} />
            </div>
        );
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
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        recipesLoaded: (recipes) => dispatch({ type: RECIPES_LOADED, payload: { recipes } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(CookbookPage);
export default withStyles(styles)(connected);