import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  ProductsList from "./ProductsList";
import ProductsForm from "./ProductsForm";
import {PRODUCT_FACT_URL} from "constants/routes";

const URL = PRODUCT_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ProductsListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ProductsList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ProductsFormWithUrl = () => <ProductsForm url={API.productes} />;


const Products= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ProductsListIntl}></Route>
      <Route path={`${URL}/create`} component={ProductsFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ProductsFormWithUrl}></Route>
     
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Products)
  },
  name: 'FAC_PROD',
  icon: <LocalOfferIcon/>
}