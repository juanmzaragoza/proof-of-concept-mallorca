import './App.css';
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { theme } from 'constants/theme';
import * as ROUTES from "constants/routes";
import { Login } from 'modules/Authentication';
import Layout from "./Layout";
import {isUserAuthenticated, login} from "helper/login-helper";

function App() {
  login();
  return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
              <SnackbarProvider
                maxSnack={4}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
            >
              <div>
                <Switch>
                  <Route exact path={ROUTES.LOGIN}>
                    <Login isUserAuthenticated={isUserAuthenticated} />
                  </Route>
                  <Route path='/' component={Layout} />
                </Switch>
                {/*TODO() -> conectar hooks en vez de redux
                TODO() https://medium.com/octopus-labs-london/replacing-redux-with-react-hooks-and-context-part-1-11b72ffdb533
                app.loading && (
                    <div
                        style={{
                          position: 'fixed',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          width: '100vw',
                          zIndex: '1202',
                          top: 0,
                          backgroundColor: 'rgba(0,0,0, 0.6)',
                        }}
                    >
                      <CircularProgress color='secondary' size={80} />
                    </div>
                )*/}
              </div>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Router>
  );
}

export default App;
