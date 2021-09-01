import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import CostesList from "./CostesList";
import CostesCreate from "./CostesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { COSTS_FACT_URL } from "constants/routes";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const URL = COSTS_FACT_URL;

const Costes = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CostesList}></Route>
      <Route
        path={`${URL}/create`}
        component={CostesCreate}
      ></Route>
      <Route path={`${URL}/:id`} component={CostesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Costes),
  },
  name: "FAC_COST",
  icon: <MonetizationOnIcon />,
};
export default component;
