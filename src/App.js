import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import customStore, { history } from './customStore';
import Routes from './UIRoutes';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, deepOrange } from "@material-ui/core/colors";
import React from "react";
import LoadingIndicator from "./components/common/LoadingIndicator";

const store = customStore();

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

class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
              <MuiThemeProvider theme={theme}>
                  <CssBaseline />
                  <LoadingIndicator isLoading={this.props.isLoading}/>
                  <ConnectedRouter history={history}>
                      <Switch>
                          <Routes />
                      </Switch>
                  </ConnectedRouter>
              </MuiThemeProvider>
          </Provider>
      );
  }

}

export default App;
