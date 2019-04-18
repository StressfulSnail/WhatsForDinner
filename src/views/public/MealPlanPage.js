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
            selectedRecipe: null,
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

    loadingError = () => {
        this.props.loadingComplete();
        this.setState({
            ...this.state,
            error: true,
            recipeModalOpen: false,
            selectTimeModalOpen: false,
        });
    };

    openRecipeModal = () => this.setState({ ...this.state, recipeModalOpen: true });
    closeRecipeModal = () => this.setState({ ...this.state, recipeModalOpen: false });
    closeMealTimeModal = () => this.setState({ ...this.state, selectTimeModalOpen: false });

    render() {
        const { classes, selectedPlan, meals } = this.props;
        return <div>
            <AddRecipeModal open={this.state.recipeModalOpen}
                            onCancel={this.closeRecipeModal}
                            onSelect={this.selectRecipe}/>
            <MealTimeSelectionModal open={this.state.selectTimeModalOpen}
                                    meals={meals}
                                    startDate={selectedPlan.startDate}
                                    endDate={selectedPlan.endDate}
                                    onSelect={this.selectMealTime}
                                    onCreate={this.createMealTime}
                                    onCancel={this.closeMealTimeModal}/>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Meal Plans
                    </Typography>
                </Toolbar>
            </AppBar>

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
                        <Button color="primary"
                                variant="contained"
                                className={classes.button}
                                fullWidth>Change Name</Button>
                        <br/>
                        <Button color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={this.openRecipeModal}
                                fullWidth>Add Recipe</Button>
                    </Grid>
                </Grid>
            </div>
            <PlanCalendar meals={meals} startDate={selectedPlan.startDate} endDate={selectedPlan.endDate}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        selectedPlan: state.mealPlans.selectedPlan,
        mealPlans: state.mealPlans.plans,
        meals: state.mealPlans.meals,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        loadMealPlans: (plans) => dispatch({ type: LOAD_MEAL_PLANS, payload: { plans } }),
        mealsLoaded: (meals) => dispatch({ type: LOAD_MEALS, payload: { meals } }),
        selectMealPlan: (id) => dispatch({ type: MEAL_PLAN_SELECTED, payload: { id } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlanPage);
export default withStyles(styles)(connected);