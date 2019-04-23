import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import Routes from './UIRoutes';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, deepOrange } from "@material-ui/core/colors";

import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

const darkGreen = green[900];
const darkOrange = deepOrange[600];

const theme = createMuiTheme({
    palette: {
        primary: {
            main: darkGreen
        },
        secondary: {
            main: darkOrange
        },
        background: {
            default: darkOrange
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
