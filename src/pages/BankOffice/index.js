import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BankOfficeList from "./BankOfficeList";
import BankOfficeCreate from "./BankOfficeCreate";
import withHeaders from "../../modules/wrappers/withHeaders";
const URL = '/oficina-bancaria';

const bankOffice = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={BankOfficeList}></Route>
      <Route path={`${URL}/create`} component={BankOfficeCreate}></Route>
      <Route path={`${URL}/:id`} component={BankOfficeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(bankOffice)
  },
  name: 'FAC_OFIBAN',
  icon: <AccountBalanceIcon />
}
export default component;