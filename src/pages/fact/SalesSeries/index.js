import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SalesSeriesList from "./SalesSeriesList";
import SalesSeriesForm from "./SalesSeriesForm";
import {SALES_SERIES_FACT_URL} from "constants/routes";

const URL = SALES_SERIES_FACT_URL;

// Sales-Series list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SalesSeriesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SalesSeriesList);

// Sales-Series form
// TODO(): maybe we can create a state for the page and set the url there
const SalesSeriesFormWithUrl = () => <SalesSeriesForm url={API.serie} />;

const SalesSeries = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SalesSeriesListIntl}></Route>
      <Route path={`${URL}/create`} component={SalesSeriesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SalesSeriesFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SalesSeries)
  },
  name: 'FAC_SERVEN',
  icon: <AssignmentIcon />
}