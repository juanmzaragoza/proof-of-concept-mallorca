import React from 'react';
import {injectIntl} from "react-intl";
import Paper from "@material-ui/core/Paper";
import {People} from "@material-ui/icons";

import ReactGrid from '../ReactGrid';
import {Route, Switch} from "react-router-dom";
import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";
import {ContentHeaderList} from "../ReactGrid/ContentHeader";

const URL = '/familia-proveedores';

const SuppliersFamilyList = (props) => {
  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "FamiliaProveedores.titulo",
      defaultMessage: "Familias proveedor"
    }),
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'nom',
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.nombre",
          defaultMessage: "Nombre"
        })
      },
    ],
    URL: 'api/fact/familiesProveidor'
  };
  return (
    <>
      <ContentHeaderList title={listConfiguration.title} />
      <ReactGrid configuration={listConfiguration} />
    </>
  );
}
const SuppliersFamilyListIntl = injectIntl(SuppliersFamilyList);

const SuppliersFamilyCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.codigo",
        defaultMessage: "Código"
      }),
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
      placeHolder: props.intl.formatMessage({
        id:"FamiliaProveedores.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.ctaprcmp",
          defaultMessage: "Ctaprcmp"
      }),
      type: 'input',
      key: 'ctaprcmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
          defaultMessage: "Observaciones"
      }),
      type: 'input',
      key: 'observacions',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.tipasicmp",
          defaultMessage: "Tipasicmp"
      }),
      type: 'input',
      key: 'tipasicmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.dricmp",
          defaultMessage: "Dricmp"
      }),
      type: 'input',
      key: 'dricmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.driprfcmp",
          defaultMessage: "Driprfcmp"
      }),
      type: 'input',
      key: 'driprfcmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    }
  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "FamiliaProveedores.titulo",
                        defaultMessage: "Familias proveedor"
                      })}
                      formConfiguration={createConfiguration} url={'api/fact/familiesProveidor'} />
  )
};
const SuppliersFamilyCreateIntl = injectIntl(SuppliersFamilyCreate);

const SuppliersFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersFamilyListIntl}></Route>
      <Route path={`${URL}/create`} component={SuppliersFamilyCreateIntl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFamilyCreateIntl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: SuppliersFamily
  },
  name: 'SuppliersFamily',
  icon: <People />
}