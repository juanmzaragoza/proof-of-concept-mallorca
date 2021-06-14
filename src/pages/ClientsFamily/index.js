import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import ClientsFamilyList from "./ClientsFamilyList";
import ClientsFamilyCreate from "./ClientsFamilyCreate";
import withHeaders from "../../modules/wrappers/withHeaders";

const URL = "/familia-clientes";

const ClientsFamily = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ClientsFamilyList}></Route>
      <Route path={`${URL}/create`} component={ClientsFamilyCreate}></Route>
      <Route path={`${URL}/:id`} component={ClientsFamilyCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ClientsFamily),
  },
  name: "FAC_FAMCLI",
  icon: <SupervisorAccountIcon />,
};
export default component;
