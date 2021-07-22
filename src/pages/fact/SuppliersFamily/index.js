import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {People} from "@material-ui/icons";

import SuppliersFamilyList from "./SuppliersFamilyList";
import SuppliersFamilyCreate from "./SuppliersFamilyCreate";
import withHeaders from "../../../modules/wrappers/withHeaders";
import {SUPPLIERS_FAMILY_FACT_URL} from "constants/routes";


const SuppliersFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${SUPPLIERS_FAMILY_FACT_URL}`} component={SuppliersFamilyList}></Route>
      <Route path={`${SUPPLIERS_FAMILY_FACT_URL}/create`} component={SuppliersFamilyCreate}></Route>
      <Route path={`${SUPPLIERS_FAMILY_FACT_URL}/:id`} component={SuppliersFamilyCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${SUPPLIERS_FAMILY_FACT_URL}`,
    component: withHeaders(SuppliersFamily)
  },
  name: 'FAC_FAMPRO',
  icon: <People />
}
export default component;