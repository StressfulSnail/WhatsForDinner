import {RECIPES_LOADED} from "../actions/recipeActions";

const initialState = {
    recipes: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECIPES_LOADED:
            return { ...state, recipes: action.payload.recipes };
        default:
            return state;
    }
}