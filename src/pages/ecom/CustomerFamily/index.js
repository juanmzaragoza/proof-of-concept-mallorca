import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import CustomerFamilyList from "./CustomerFamilyList";
import CustomerFamilyCreate from "./CustomerFamilyCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {CLIENT_FAMILY_ECOM_URL} from "constants/routes";

const URL = CLIENT_FAMILY_ECOM_URL;

const CustomerFamily = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CustomerFamilyList}></Route>
      <Route path={`${URL}/create`} component={CustomerFamilyCreate}></Route>
      <Route path={`${URL}/:id`} component={CustomerFamilyCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CustomerFamily),
  },
  name: "COM_FMC",
  icon: <SupervisorAccountIcon />,
};
export default component;
