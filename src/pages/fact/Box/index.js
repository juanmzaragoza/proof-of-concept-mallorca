import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import BoxList from "./BoxList";
import BoxForm from "./BoxForm";
import InputIcon from "@material-ui/icons/Input";
import { BOX_FACT_URL } from "constants/routes";

const URL = BOX_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const BoxListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(BoxList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const BoxFormWithUrl = () => <BoxForm url={API.caixa} />;

const Box = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={BoxListIntl}></Route>
      <Route path={`${URL}/create`} component={BoxFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={BoxFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Box),
  },
  name: "FAC_CAIXA",
  icon: <InputIcon />,
};
