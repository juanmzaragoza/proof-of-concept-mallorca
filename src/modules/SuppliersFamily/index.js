import React from 'react';
import ReactGrid from '../ReactGrid';
import {Route, Switch} from "react-router-dom";
import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";
import Paper from "@material-ui/core/Paper";

const URL = '/familia-proveedores';

const configuration = {
  title: 'Familias proveedor',
  columns: [
    { name: 'codi', title: 'Código' },
    { name: 'nom', title: 'Nombre' },
  ]
};

const SuppliersFamilyList = () => {
  return (
    <ReactGrid configuration={configuration} />
  );
}

const SuppliersFamilyCreate = () => {
  return (
    <CreateUpdateForm title={configuration.title} />
  )
};

const SuppliersFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersFamilyList}></Route>
      <Route path={`${URL}/create`} component={SuppliersFamilyCreate}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: SuppliersFamily
  },
  name: 'SuppliersFamily',
}