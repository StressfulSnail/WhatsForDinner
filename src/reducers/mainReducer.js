import { LOADING_COMPLETE, LOADING_STARTED } from '../actions/mainActions';

const initialState = {
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_STARTED:
            return { ...state, isLoading: true };
        case LOADING_COMPLETE:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}