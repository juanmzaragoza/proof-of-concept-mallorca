import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BankList from "./BankList";
import BankCreate from "./BankCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BANK_FACT_URL} from "constants/routes";
import { findByAltText } from '@testing-library/react';

const URL = BANK_FACT_URL;

const bank = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={BankList}></Route>
      <Route path={`${URL}/create`} component={BankCreate}></Route>
      <Route path={`${URL}/:id`} component={BankCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(bank)
  },
  name: 'FAC_BANCS',
  icon: <AccountBalanceIcon />
}
export default component;