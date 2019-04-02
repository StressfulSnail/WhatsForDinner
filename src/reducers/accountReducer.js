import { LOGIN, LOGOUT, LOAD_ACCOUNT } from '../actions/accountActions';

const initialState = {
    isAuthenticated: false,
    token: null,
    accountData: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case LOGOUT:
            return initialState;
        case LOAD_ACCOUNT:
            return { ...state, accountData: action.payload.accountData };
        default:
            return state;
    }
}