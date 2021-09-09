
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  StoreOrdersList from "./StoreOrdersList";
import StoreOrdersForm from "./StoreOrdersForm";
import ReceiptIcon from '@material-ui/icons/Receipt';

import {STORE_ORDERS_FACT_URL} from "constants/routes";

const URL = STORE_ORDERS_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const StoreOrdersListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(StoreOrdersList);

// TODO(): maybe we can create a state for the page and set the url there
const StoreOrdersFormWithUrl = () => < StoreOrdersForm url={API.comandesMagatzem} />;


const StoreOrders= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={StoreOrdersListIntl}></Route>
      <Route path={`${URL}/create`} component={StoreOrdersFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={StoreOrdersFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(StoreOrders)
  },
  name: 'FAC_CMG',
  icon: <ReceiptIcon/>
}