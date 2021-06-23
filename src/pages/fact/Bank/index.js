import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BankList from "./BankList";
import BankCreate from "./BankCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BANK_FACT_URL} from "constants/routes";

const bank = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${BANK_FACT_URL}`} component={BankList}></Route>
      <Route path={`${BANK_FACT_URL}/create`} component={BankCreate}></Route>
      <Route path={`${BANK_FACT_URL}/:id`} component={BankCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${BANK_FACT_URL}`,
    component: withHeaders(bank)
  },
  name: 'FAC_BANCS',
  icon: <AccountBalanceIcon />
}
export default component;