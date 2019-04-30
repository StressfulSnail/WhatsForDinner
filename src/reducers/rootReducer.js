import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';
import accountReducer from './accountReducer';
import mainReducer from "./mainReducer";
import mealPlanReducer from "./mealPlanReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    main: mainReducer,
    account: accountReducer,
    mealPlans: mealPlanReducer,
    form: reduxFormReducer
});