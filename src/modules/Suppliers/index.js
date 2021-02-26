import React from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import Paper from "@material-ui/core/Paper";
import {Route, Switch} from "react-router-dom";

import {ContentHeaderList} from "modules/ReactGrid/ContentHeader";
import ReactGrid from "../ReactGrid";
import AdvancedFilters from "./AdvancedFilters";
import * as API from "redux/api";

const URL = '/proveedores';

const SuppliersList = (props) => {
  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Proveedores.titulo",
      defaultMessage: "Proveedores"
    }),
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Proveedores.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'nomComercial',
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_comercial",
          defaultMessage: "Nombre Comercial"
        })
      },
      { name: 'descCodiNom',
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "NIF"
        })
      },
      { name: 'id',
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia"
        })
      },
      { name: 'nomFiscal',
        title: props.intl.formatMessage({
          id: "Proveedores.alias",
          defaultMessage: "Alias"
        })
      },
    ],
    URL: API.suppliers,
    listKey: 'proveidors'
  };
  return (
    <>
      <ContentHeaderList title={props.intl.formatMessage({
        id: "Proveedores.titulo",
        defaultMessage: "Proveedores"
      })} />
      <AdvancedFilters />
      <ReactGrid configuration={listConfiguration} />
    </>
  )
};

const SuppliersListIntl = injectIntl(SuppliersList);

const Suppliers = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersListIntl}></Route>
      {/*<Route path={`${URL}/create`} component={SuppliersFamilyCreateIntl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFamilyCreateIntl}></Route>*/}
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: Suppliers
  },
  name: 'Suppliers',
  icon: <LocalMall />
}