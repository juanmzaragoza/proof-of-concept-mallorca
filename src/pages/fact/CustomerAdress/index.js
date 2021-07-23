import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CustomerAdressList from "./CustomerAdressList";
import CustomerAdressForm from "./CustomerAdressForm";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

import { CUSTOMER_ADDRESS_FACT_URL } from "constants/routes";

const URL = CUSTOMER_ADDRESS_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CustomerAdressListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(CustomerAdressList);

// TODO(): maybe we can create a state for the page and set the url there
const CustomerAdressFormWithUrl = () => <CustomerAdressForm url={API.clientAdresa} />;

const CustomerAdress = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CustomerAdressListIntl}></Route>
      <Route path={`${URL}/create`} component={CustomerAdressFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CustomerAdressFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CustomerAdress),
  },
  name: "FAC_ADRCLI",
  icon: <PersonPinCircleIcon />,
};
