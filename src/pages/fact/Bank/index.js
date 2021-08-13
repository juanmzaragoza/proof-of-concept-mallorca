import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import BankList from "./BankList";
import BankForm from "./BankForm";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { BANK_FACT_URL } from "constants/routes";

const URL = BANK_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const BankListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(BankList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const BankFormWithUrl = () => <BankForm url={API.banc} />;

const Bank = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={BankListIntl}></Route>
      <Route path={`${URL}/create`} component={BankFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={BankFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Bank),
  },
  name: "FAC_BANCS",
  icon: <AccountBalanceIcon />,
};
