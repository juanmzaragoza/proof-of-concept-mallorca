import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import AppsIcon from "@material-ui/icons/Apps";

import ApplicationList from "./ApplicationList";
import ApplicationCreate from "./ApplicationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { APP_FACT_URL } from "constants/routes";

const URL = APP_FACT_URL;

const Application = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ApplicationList}></Route>
      <Route path={`${URL}/create`} component={ApplicationCreate}></Route>
      <Route path={`${URL}/:id`} component={ApplicationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Application),
  },
  name: "FAC_APT",
  icon: <AppsIcon />,
};
export default component;
