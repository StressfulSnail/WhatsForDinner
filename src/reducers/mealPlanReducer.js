import {
    CREATE_MEAL_PLAN,
    DELETE_MEAL_PLAN,
    LOAD_MEAL_PLANS,
    LOAD_MEALS,
    MEAL_PLAN_SELECTED
} from "../actions/mealPlanActions";

const initialState = {
    plans: [],
    selectedPlan: {},
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
        case CREATE_MEAL_PLAN:
            return {
                ...state,
                plans: [
                    ...state.plans, action.payload.plan,
                ]
            };
        case DELETE_MEAL_PLAN:
            return {
                ...state,
                plans: state.plans.filter(plan => plan.id !== action.payload.plan.id),
            };
        default:
            return state;
    }
}