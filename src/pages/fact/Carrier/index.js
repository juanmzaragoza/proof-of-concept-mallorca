import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CarrierList from "./CarrierList";
import CarrierForm from "./CarrierForm";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import { CARRIER_FACT_URL } from "constants/routes";

const URL = CARRIER_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CarrierListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(CarrierList);

// TODO(): maybe we can create a state for the page and set the url there
const CarrierFormWithUrl = () => <CarrierForm url={API.transportista} />;

const Carrier = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CarrierListIntl}></Route>
      <Route path={`${URL}/create`} component={CarrierFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CarrierFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Carrier),
  },
  name: "FAC_TRANSP",
  icon: <LocalShippingIcon />,
};
