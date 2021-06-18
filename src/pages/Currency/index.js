import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import CurrencyList from "./CurrencyList";
import CurrencyCreate from "./CurrencyCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {CURRENCY_FACT_URL} from "constants/routes";

const URL = CURRENCY_FACT_URL;

const Currency = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CurrencyList}></Route>
      <Route path={`${URL}/create`} component={CurrencyCreate}></Route>
      <Route path={`${URL}/:id`} component={CurrencyCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Currency),
  },
  name: "FAC_DIVISA",
  icon: <AttachMoneyIcon />,
};
export default component;
