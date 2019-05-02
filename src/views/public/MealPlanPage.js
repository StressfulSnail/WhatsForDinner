import React from "react";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import {Button, withStyles} from "@material-ui/core";
import {LOAD_MEAL_PLANS, LOAD_MEALS, MEAL_PLAN_SELECTED} from "../../actions/mealPlanActions";
import mealPlanService from "../../services/mealPlanService";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PlanCalendar from "../../components/mealPlans/PlanCalendar";
import Grid from "@material-ui/core/Grid";
import DateFormat from "../../components/common/DateFormat";
import AddRecipeModal from "../../components/mealPlans/AddRecipeModal";
import { Link } from 'react-router-dom';
import MealTimeSelectionModal from "../../components/mealPlans/MealTimeSelectionModal";
import EditMealModal from "../../components/mealPlans/EditMealModal";
import EditPlanModal from "../../components/mealPlans/EditPlanModal";
import ShoppingList from "../../components/mealPlans/ShoppingList";
import {HOME, MEAL_PLANS} from "../../UIRoutes";
import UserNavBar from "../../components/common/UserNavBar";
import recipeService from "../../services/recipeService";
import {RECIPES_LOADED} from "../../actions/recipeActions";

const styles = {
    mealTitle: {
        paddingLeft: '1em',
        marginBottom: '2em',
    },
    dateRange: {
        marginTop: '-1em',
        marginBottom: '2em',
    },
    button: {
        marginTop: '10px',
    },
};

class MealPlanPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            recipeModalOpen: false,
            selectTimeModalOpen: false,
            editMealModalOpen: false,
            editPlanModalOpen: false,
            selectedRecipe: null,
            mealToEdit: null,
        }
    }

    componentDidMount() {
        const {
            token,
            mealPlans,
            match,
            loadingStart,
            loadMealPlans,
            selectMealPlan } = this.props;

       loadingStart();
       Promise.resolve()
           .then(() => {
               if (mealPlans < 1) {
                   return mealPlanService.getMealPlans(token)
                       .then((mealPlans) => {
                           loadMealPlans(mealPlans);
                       })
                       .catch(console.err);
               }
           })
           .then(() => {
               selectMealPlan(Number(match.params.id));
               return this.loadMeals();
           });
    }

    loadMeals = async () => {
        const { token, match, mealsLoaded, loadingComplete } = this.props;
        try {
            const meals = await mealPlanService.getMeals(token, Number(match.params.id));
            mealsLoaded(meals);
            loadingComplete();
        } catch (err) {
            console.error(err);
            this.loadingError();
        }
    };

    selectRecipe = (recipe) => {
        this.setState({ ...this.state, recipeModalOpen: false, selectTimeModalOpen: true, selectedRecipe: recipe });
    };

    selectMealTime = async (meal) => {
        try {
            this.props.loadingStart();
            meal.recipes.push(this.state.selectedRecipe);
            await mealPlanService.saveMeal(this.props.token, this.props.selectedPlan.id, meal);
            await this.loadMeals();
            this.closeMealTimeModal();
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    createMealTime = async (meal) => {
        try {
            this.props.loadingStart();
            meal.dateTime = new Date(meal.dateTime);
            meal.recipes = [this.state.selectedRecipe];
            await mealPlanService.createMeal(this.props.token, this.props.selectedPlan.id, meal);
            await this.loadMeals();
            this.closeMealTimeModal();
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    deleteRecipe = async (meal, recipeId) => {
        try {
            meal.recipes = meal.recipes.filter(recipe => recipe.id !== recipeId);

            // if no recipes left in meal, delete meal
            if (meal.recipes.length === 0) {
                await mealPlanService.deleteMeal(this.props.token, this.props.selectedPlan.id, meal);
            } else {
                await mealPlanService.saveMeal(this.props.token, this.props.selectedPlan.id, meal);
            }

            await this.loadMeals();
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    saveMealChanges = async (meal) => {
        try {
            this.props.loadingStart();
            await mealPlanService.saveMeal(this.props.token, this.props.selectedPlan.id, meal);
            await this.loadMeals();
            this.closeEditMealModal();
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    savePlanChanges = async (planName, dateOffset) => {
        const { token, meals, selectedPlan } = this.props;

        if (planName) {
            selectedPlan.name = planName;
        }

        if (dateOffset) {
            const startDate = new Date(selectedPlan.startDate);
            startDate.setTime(selectedPlan.startDate.getTime() + dateOffset);
            const endDate = new Date(selectedPlan.endDate);
            endDate.setTime(selectedPlan.endDate.getTime() + dateOffset);

            selectedPlan.startDate = startDate;
            selectedPlan.endDate = endDate;

            for (let meal of meals) {
                const dateTime = new Date(meal.dateTime);
                dateTime.setTime(meal.dateTime.getTime() + dateOffset);
                meal.dateTime = dateTime;
            }
        }

        try {
            this.props.loadingStart();
            this.setState({ ...this.state, selectedPlan: selectedPlan });

            await mealPlanService.savePlan(this.props.token, selectedPlan);
            await Promise.all(
                meals.map(meal => mealPlanService.saveMeal(token, selectedPlan.id, meal))
            );
            await this.loadMeals();

            this.closeEditPlanModal();
            this.props.loadingComplete();
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    selectMealToEdit = (meal) => this.setState({ ...this.state, mealToEdit: meal, editMealModalOpen: true });

    loadingError = () => {
        this.props.loadingComplete();
        this.setState({
            ...this.state,
            error: true,
            recipeModalOpen: false,
            selectTimeModalOpen: false,
            editMealModalOpen: false,
            editPlanModalOpen: false,
        });
    };

    generateShoppingList = async () => {
        try {
            this.props.loadingStart();
            const listItems = await mealPlanService.getShoppingList(this.props.token, this.props.selectedPlan.id);
            this.props.loadingComplete();
            ShoppingList({mealPlan: this.props.selectedPlan, listItems});
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };

    openRecipeModal = async () => {
        try {
            this.props.loadingStart();
            const recipes = await recipeService.getPersonalRecipes(this.props.token);
            this.props.recipesLoaded(recipes);
            this.props.loadingComplete();
            this.setState({...this.state, recipeModalOpen: true});
        } catch (e) {
            console.error(e);
            this.loadingError();
        }
    };
    openEditPlanModal = () => this.setState({ ...this.state, editPlanModalOpen: true });
    closeRecipeModal = () => this.setState({ ...this.state, recipeModalOpen: false });
    closeMealTimeModal = () => this.setState({ ...this.state, selectTimeModalOpen: false });
    closeEditMealModal = () => this.setState({ ...this.state, editMealModalOpen: false });
    closeEditPlanModal = () => this.setState({ ...this.state, editPlanModalOpen: false });

    render() {
        const { classes, selectedPlan, meals, recipes } = this.props;
        return <div>

            <UserNavBar pageName="Meal Plan" currentPath={MEAL_PLANS}/>

            <AddRecipeModal open={this.state.recipeModalOpen}
                            onCancel={this.closeRecipeModal}
                            onSelect={this.selectRecipe}
                            recipes={recipes}/>
            <MealTimeSelectionModal open={this.state.selectTimeModalOpen}
                                    meals={meals}
                                    startDate={selectedPlan.startDate}
                                    endDate={selectedPlan.endDate}
                                    onSelect={this.selectMealTime}
                                    onCreate={this.createMealTime}
                                    onCancel={this.closeMealTimeModal}/>
            <EditMealModal open={this.state.editMealModalOpen}
                           meal={this.state.mealToEdit}
                           onSave={this.saveMealChanges}
                           onCancel={this.closeEditMealModal} />
            <EditPlanModal open={this.state.editPlanModalOpen}
                           plan={selectedPlan}
                           onSave={this.savePlanChanges}
                           onCancel={this.closeEditPlanModal} />

            <div className={classes.mealTitle}>
                <Grid justify="center" container>
                    <Grid item xs={10} md={6}>
                        <h1>{selectedPlan.name}</h1>
                        <Typography color="textSecondary" className={classes.dateRange}>
                            <DateFormat value={selectedPlan.startDate} /> through <DateFormat value={selectedPlan.endDate} />
                        </Typography>
                        { this.state.error ? <Typography color="error">Something went wrong! Please try again.</Typography> : '' }
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Button color="default"
                                variant="contained"
                                className={classes.button}
                                component={Link}
                                to="/meal-plans"
                                fullWidth>All Meal Plans</Button>
                        <br/>
                        <Button color="default"
                                variant="contained"
                                className={classes.button}
                                onClick={this.generateShoppingList}
                                fullWidth>Generate Shopping List</Button>
                        <br/>
                        <Button color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={this.openEditPlanModal}
                                fullWidth>Edit Plan</Button>
                        <br/>
                        <Button color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={this.openRecipeModal}
                                fullWidth>Add Recipe</Button>
                    </Grid>
                </Grid>
            </div>
            <PlanCalendar
                meals={meals}
                onRecipeDelete={this.deleteRecipe}
                onMealEdit={this.selectMealToEdit}
                startDate={selectedPlan.startDate}
                endDate={selectedPlan.endDate} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        selectedPlan: state.mealPlans.selectedPlan,
        mealPlans: state.mealPlans.plans,
        meals: state.mealPlans.meals,
        recipes: state.recipe.recipes,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        loadMealPlans: (plans) => dispatch({ type: LOAD_MEAL_PLANS, payload: { plans } }),
        mealsLoaded: (meals) => dispatch({ type: LOAD_MEALS, payload: { meals } }),
        selectMealPlan: (id) => dispatch({ type: MEAL_PLAN_SELECTED, payload: { id } }),
        recipesLoaded: (recipes) => dispatch({ type: RECIPES_LOADED, payload: { recipes } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlanPage);
export default withStyles(styles)(connected);