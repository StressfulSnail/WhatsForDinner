import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers/rootReducer';

export const history = createBrowserHistory();

export default function customStore(initialState) {
    const store = createStore(
        rootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            )
        )
    )

    return store;
};