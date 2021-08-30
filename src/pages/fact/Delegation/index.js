import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";

import DelegationList from "./DelegationList";
import DelegationCreate from "./DelegationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { DELEGATION_TYPE_FACT_URL } from "constants/routes";

const URL = DELEGATION_TYPE_FACT_URL;

const Delegation = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={DelegationList}></Route>
      <Route path={`${URL}/create`} component={DelegationCreate}></Route>
      <Route path={`${URL}/:id`} component={DelegationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Delegation),
  },
  name: "FAC_DELEG",
  icon: <DeviceHubIcon />,
};
export default component;
