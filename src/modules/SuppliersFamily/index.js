import React from 'react';
import Paper from "@material-ui/core/Paper";
import {FormattedMessage} from "react-intl";

import ReactGrid from '../ReactGrid';
import {Route, Switch} from "react-router-dom";
import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";

const URL = '/familia-proveedores';

const listConfiguration = {
  title: <FormattedMessage
    id="FamiliaProveedores.titulo"
    defaultMessage="Familias proveedor"
  />,
  columns: [
    { name: 'codi', title: <FormattedMessage
        id="FamiliaProveedores.codigo"
        defaultMessage="Código"
      />
    },
    { name: 'nom', title: <FormattedMessage
        id="FamiliaProveedores.nombre"
        defaultMessage="Nombre"
      />
    },
  ]
};

const createConfiguration = [
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.codigo"
      defaultMessage="Código"
    /> ,
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
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.nombre"
      defaultMessage="Nombre"
    /> ,
    type: 'input',
    key: 'nom',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.ctaprcmp"
      defaultMessage="Ctaprcmp"
    />,
    type: 'input',
    key: 'ctaprcmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.observaciones"
      defaultMessage="Observaciones"
    />,
    type: 'input',
    key: 'observacions',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.tipasicmp"
      defaultMessage="Tipasicmp"
    />,
    type: 'input',
    key: 'tipasicmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.dricmp"
      defaultMessage="Dricmp"
    />,
    type: 'input',
    key: 'dricmp',
    required: true,
    breakpoints: {
      xs: 12,
      md: 4
    },
  },
  {
    placeHolder: <FormattedMessage
      id="FamiliaProveedores.driprfcmp"
      defaultMessage="Driprfcmp"
    />,
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
    <CreateUpdateForm title={listConfiguration.title} formConfiguration={createConfiguration} url={'api/fact/familiesProveidor'} />
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