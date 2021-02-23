import React from 'react';
import ReactGrid from '../ReactGrid';
import {Route, Switch} from "react-router-dom";
import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";
import Paper from "@material-ui/core/Paper";

const URL = '/familia-proveedores';

const listConfiguration = {
  title: 'Familias proveedor',
  columns: [
    { name: 'codi', title: 'Código' },
    { name: 'nom', title: 'Nombre' },
  ]
};

const createConfiguration = [
  {
    placeHolder: "Código",
    type: 'input',
    key: 'codi',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
    noEditable: true
  },
  {
    placeHolder: "Nombre",
    type: 'input',
    key: 'nom',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: "Ctaprcmp",
    type: 'input',
    key: 'ctaprcmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: "Observaciones",
    type: 'input',
    key: 'observacions',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: "Tipasicmp",
    type: 'input',
    key: 'tipasicmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: "Dricmp",
    type: 'input',
    key: 'dricmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: "Driprfcmp",
    type: 'input',
    key: 'driprfcmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
];

const SuppliersFamilyList = () => {
  return (
    <ReactGrid configuration={listConfiguration} />
  );
}

const SuppliersFamilyCreate = () => {
  return (
    <CreateUpdateForm title={listConfiguration.title} configuration={createConfiguration} />
  )
};

const SuppliersFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersFamilyList}></Route>
      <Route path={`${URL}/create`} component={SuppliersFamilyCreate}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFamilyCreate}></Route>
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