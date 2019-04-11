import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import mainReducer from "./mainReducer";

export default combineReducers({
    main: mainReducer,
    account: accountReducer,
});