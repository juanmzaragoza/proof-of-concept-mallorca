import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CompanyAccountingAccountList from "./CompanyAccountingAccountList";
import CompanyAccountingAccountCreate from "./CompanyAccountingAccountCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COMPANY_ACCOUNTING_ACCOUNTS_FACT_URL} from "constants/routes";

const CompanyAccountingAccount = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${COMPANY_ACCOUNTING_ACCOUNTS_FACT_URL}`} component={CompanyAccountingAccountList}></Route>
      <Route path={`${COMPANY_ACCOUNTING_ACCOUNTS_FACT_URL}/create`} component={CompanyAccountingAccountCreate}></Route>
      <Route path={`${COMPANY_ACCOUNTING_ACCOUNTS_FACT_URL}/:id`} component={CompanyAccountingAccountCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${COMPANY_ACCOUNTING_ACCOUNTS_FACT_URL}`,
    component: withHeaders(CompanyAccountingAccount)
  },
  name: 'FAC_EMPCCM',
  icon: <AccountBalanceWalletIcon />
}
export default component;