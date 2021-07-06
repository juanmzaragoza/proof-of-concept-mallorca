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
import RatesList from "./RatesList";
import RatesForm from "./RatesForm";
import {RATES_FACT_URL} from "constants/routes";

const URL = RATES_FACT_URL;

// Document-Footer list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const RatesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(RatesList);

// Document-Footer form
// TODO(): maybe we can create a state for the page and set the url there
const RatesFormWithUrl = () => <RatesForm url={API.tarifas} />;

const Rates = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={RatesListIntl}></Route>
      <Route path={`${URL}/create`} component={RatesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={RatesFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Rates)
  },
  name: 'FAC_TARIFA',
  icon: <ReceiptIcon />
}