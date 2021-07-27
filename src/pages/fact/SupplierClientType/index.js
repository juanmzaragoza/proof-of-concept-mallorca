import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import SupplierClientTypeList from "./SupplierClientTypeList";
import SupplierClientTypeCreate from "./SupplierClientTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { SUPPLIER_CLIENT_TYPE_FACT_URL } from "constants/routes";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const URL = SUPPLIER_CLIENT_TYPE_FACT_URL;

const SupplierClientType = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={SupplierClientTypeList}></Route>
      <Route path={`${URL}/create`} component={SupplierClientTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={SupplierClientTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SupplierClientType),
  },
  name: "FAC_TIPP",
  icon: <SupervisorAccountIcon />,
};
export default component;
