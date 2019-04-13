import React from "react";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";

const styles = {};

class MealPlanPage extends React.Component {

    render() {
        const mealPlanId = this.props.match.params.id;
        return <div>{mealPlanId}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        selectedPlan: state.mealPlans.selectedPlan,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),

    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlanPage);
export default withStyles(styles)(connected);