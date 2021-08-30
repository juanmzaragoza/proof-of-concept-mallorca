import React from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SuppliersOrdersList from "./SuppliersOrdersList";
import SuppliersOrdersForm from "./SuppliersOrdersForm";
import {SUPPLIER_ORDER_FACT_URL} from "constants/routes";

const URL = SUPPLIER_ORDER_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SuppliersOrdersListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SuppliersOrdersList);



const SuppliersOrdersFormWithUrl = () => <SuppliersOrdersForm url={API.comandesProveidor} />;

const SuppliersOrders = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersOrdersListIntl}></Route>
      <Route path={`${URL}/create`} component={SuppliersOrdersFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersOrdersFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SuppliersOrders)
  },
  name: 'FAC_PROCOM',
  icon: <ReceiptIcon />
}