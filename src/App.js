import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { theme } from './constants/theme';
import Login from './pages/Login';
import CustomTable from './components/CustomTable';
import Layout from "./Layout";

function App() {
  const [loading, setLoading] = useState(false);
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
                  {/* <Route exact path='/admin' component={Login} /> */}
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/' component={Layout} />
                  {/*TODO()<Route exact path='/forgot-password' component={Recovery} />
                  <Route exact path='/reset-password' component={ResetPassword} />
                  <Route exact path='/sign-up' component={Registration} />
                  <Route exact path='/logout' component={Logout} />
                  <AuthRoute path='/' component={Layout} />
                  <Route exact path='/not-found' component={NotFound} />
                  <Redirect exact from='*' to='/not-found' />*/}
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
