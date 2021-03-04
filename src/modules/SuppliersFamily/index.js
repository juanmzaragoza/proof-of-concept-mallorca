import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {People} from "@material-ui/icons";


import SuppliersFamilyList from "./SuppliersFamilyList";
import SuppliersFamilyCreate from "./SuppliersFamilyCreate";

const URL = '/familia-proveedores';

const SuppliersFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersFamilyList}></Route>
      <Route path={`${URL}/create`} component={SuppliersFamilyCreate}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFamilyCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: SuppliersFamily
  },
  name: 'SuppliersFamily',
  icon: <People />
}
export default component;