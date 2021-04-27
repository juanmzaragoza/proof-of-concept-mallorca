import React, {useEffect} from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";

import Paper from "@material-ui/core/Paper";
import ReactGrid from "../ReactGrid";
import AdvancedFilters from "./AdvancedFilters";
import SuppliersForm from "./SuppliersForm";
import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";

const URL = '/proveedores';

const SuppliersList = ({actions, ...props}) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proveedores.titulo",
        defaultMessage: "Proveedores"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Proveedores", href:"/proveedores"}
    ]);
  },[]);

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
      <AdvancedFilters />
      <ReactGrid configuration={listConfiguration} />
    </>
  )
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SuppliersListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SuppliersList);

const SuppliersFormWithUrl = () => {
  return (
    // url necessary for withAbmServices
    // TODO(): maybe we can create a state for the page and set the url there
    <SuppliersForm url={API.suppliers} />
  )
};

const Suppliers = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersListIntl}></Route>
      <Route path={`${URL}/create`} component={SuppliersFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: Suppliers
  },
  name: 'FAC_CP',
  icon: <LocalMall />
}