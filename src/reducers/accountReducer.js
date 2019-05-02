import { LOGIN, LOGOUT, LOAD_ACCOUNT } from '../actions/accountActions';

const initialState = {
    isAuthenticated: window.localStorage.getItem('token') !== 'null',
    token: window.localStorage.getItem('token'),
    accountData: JSON.parse(window.localStorage.getItem('account')),
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
            window.localStorage.setItem('account', null);
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
            const accountData = {
                id: id,
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName ? middleName : "N/A",
                paymentInfo: paymentInfo,
                subscriptionLevel: subscriptionLevel,
                confirmed: confirmed
            };
            window.localStorage.setItem('account', JSON.stringify(accountData));
            return { ...state, accountData };
        default:
            return state;
    }
}