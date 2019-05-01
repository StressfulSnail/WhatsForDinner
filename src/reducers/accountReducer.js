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
            // extract necessary fields
            const {
                id,
                username,
                email,
                firstName,
                lastName,
                middleName,
                paymentInfo,
                subscriptionLevel,
                confirmed
            } = action.payload.accountData;
            console.log(username);
            return { ...state, accountData: {
                    id: id,
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName ? middleName : "N/A",
                    paymentInfo: paymentInfo,
                    subscriptionLevel: subscriptionLevel,
                    confirmed: confirmed
                }
            };
        default:
            return state;
    }
}