import React from "react";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {LOAD_MEAL_PLANS, LOAD_MEALS, MEAL_PLAN_SELECTED} from "../../actions/mealPlanActions";
import mealPlanService from "../../services/mealPlanService";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PlanCalendar from "../../components/mealPlans/PlanCalendar";
import Grid from "@material-ui/core/Grid";
import DateFormat from "../../components/common/DateFormat";

const styles = {
    mealTitle: {
        paddingLeft: '1em',
    },
    dateRange: {
        marginTop: '-1em',
        marginBottom: '2em',
    }
};

class MealPlanPage extends React.Component {

    componentDidMount() {
        const {
            token,
            mealPlans,
            match,
            loadingStart,
            loadMealPlans,
            selectMealPlan,
            loadMeals,
            loadingComplete } = this.props;

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
               return mealPlanService.getMeals(token, Number(match.params.id));
           })
           .then((meals) => {
               loadMeals(meals);
               loadingComplete();
           })
           .catch(console.err);
    }

    render() {
        const { classes, selectedPlan, meals } = this.props;
        return <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Meal Plans
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.mealTitle}>
                <Grid justify="center" container>
                    <Grid item xs={12} lg={7}>
                        <h1>{selectedPlan.name}</h1>
                        <Typography color="textSecondary" className={classes.dateRange}>
                            <DateFormat value={selectedPlan.startDate} /> through <DateFormat value={selectedPlan.endDate} />
                        </Typography>
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
        loadMeals: (meals) => dispatch({ type: LOAD_MEALS, payload: { meals } }),
        selectMealPlan: (id) => dispatch({ type: MEAL_PLAN_SELECTED, payload: { id } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlanPage);
export default withStyles(styles)(connected);