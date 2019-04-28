import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import accountReducer from './accountReducer';
import mainReducer from "./mainReducer";
import mealPlanReducer from "./mealPlanReducer";
import recipeReducer from "./recipeReducer";

export default combineReducers({
    main: mainReducer,
    account: accountReducer,
    mealPlans: mealPlanReducer,
    recipe: recipeReducer,
    form: reduxFormReducer,
});