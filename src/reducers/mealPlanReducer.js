import {LOAD_MEAL_PLANS, LOAD_MEALS, MEAL_PLAN_SELECTED} from "../actions/mealPlanActions";

const initialState = {
    plans: [],
    selectedPlan: null,
    meals: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_MEAL_PLANS:
            return { ...state, plans: action.payload.plans };
        case MEAL_PLAN_SELECTED:
            return {
                ...state,
                selectedPlan: state.plans.filter(plan => plan.id === action.payload.id)[0],
            };
        case LOAD_MEALS:
            return { ...state, meals: action.payload.meals };
        default:
            return state;
    }
}