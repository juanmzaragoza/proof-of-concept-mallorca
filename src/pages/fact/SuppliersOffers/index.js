import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SuppliersOffersList from "./SuppliersOffersList";
import SuppliersOffersForm from "./SuppliersOffersForm";
import {SUPPLIERS_OFFERS_FACT_URL} from "constants/routes";

const URL = SUPPLIERS_OFFERS_FACT_URL;

// suppliers list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SuppliersOffersListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SuppliersOffersList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const SuppliersOffersFormWithUrl = () => <SuppliersOffersForm url={API.ofertesProveidor} />;

const SuppliersOffers = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersOffersListIntl}></Route>
      <Route path={`${URL}/create`} component={SuppliersOffersFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersOffersFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SuppliersOffers)
  },
  name: 'FAC_OFEPRO',
  icon: <LocalOfferIcon />
}