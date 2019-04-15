import { LOGIN, LOGOUT, LOAD_ACCOUNT } from '../actions/accountActions';

const initialState = {
    isAuthenticated: false,
    token: window.localStorage.getItem('token'),
    accountData: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            window.localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case LOGOUT:
            window.localStorage.setItem('token', null);
            return initialState;
        case LOAD_ACCOUNT:
            return { ...state, accountData: action.payload.accountData };
        default:
            return state;
    }
}