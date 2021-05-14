import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {SnackbarProvider} from "notistack";
import MomentUtils from "@date-io/moment";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import messages from 'assets/i18n/es/locale.json';
import store from "redux/store.js";
import {theme} from "constants/theme";
import {SnackbarUtilsConfigurator} from "./helper/snackbar-function";

//TODO() itntl https://www.freecodecamp.org/news/setting-up-internationalization-in-react-from-start-to-finish-6cb94a7af725/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider messages={messages} locale={'es'}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider
              maxSnack={4}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <SnackbarUtilsConfigurator />
              <App />
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
