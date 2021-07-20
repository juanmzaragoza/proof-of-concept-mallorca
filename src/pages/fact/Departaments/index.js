import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import DepartamentsList from "./DepartamentsList";
import DepartamentsCreate from "./DepartamentsCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { DEPART_FACT_URL } from "constants/routes";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const URL = DEPART_FACT_URL;

const Departament = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={DepartamentsList}></Route>
      <Route path={`${URL}/create`} component={DepartamentsCreate}></Route>
      <Route path={`${URL}/:id`} component={DepartamentsCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Departament),
  },
  name: "FAC_DEPART",
  icon: <AccountTreeIcon />,
};
export default component;
