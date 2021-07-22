import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CompanyAccountList from "./CompanyAccountList";
import CompanyAccountCreate from "./CompanyAccountCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COMPANY_ACCOUNT_FACT_URL} from "constants/routes";

const URL = COMPANY_ACCOUNT_FACT_URL;

const CompanyAccount = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CompanyAccountList}></Route>
      <Route path={`${URL}/create`} component={CompanyAccountCreate}></Route>
      <Route path={`${URL}/:id`} component={CompanyAccountCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CompanyAccount)
  },
  name: 'FAC_EMPCCR',
  icon: <AccountBalanceWalletIcon />
}
export default component;