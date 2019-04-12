import {LOAD_MEAL_PLANS} from "../actions/mealPlanActions";

const initialState = {
    plans: [],
    selectedPlan: null,
    meals: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_MEAL_PLANS:
            return { ...state, plans: action.payload.plans };
        default:
            return state;
    }
}