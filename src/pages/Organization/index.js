import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import OrganizationList from "./OrganizationList";
import OrganizationCreate from "./OrganizationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ORGANIZATION_FACT_URL} from "constants/routes";

const URL = ORGANIZATION_FACT_URL;

const Organization = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={OrganizationList}></Route>
      <Route path={`${URL}/create`} component={OrganizationCreate}></Route>
      <Route path={`${URL}/:id`} component={OrganizationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Organization),
  },
  name: "FAC_ORG",
  icon: <CheckBoxOutlineBlankIcon />,
};
export default component;
