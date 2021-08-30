import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import TouchAppOutlinedIcon from "@material-ui/icons/TouchAppOutlined";
import AplicadoresList from "./AplicadoresList";
import AplicadoresForm from "./AplicadoresForm";
import withHeaders from "modules/wrappers/withHeaders";
import { APLICADOR_FACT_URL } from "constants/routes";

import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";

const URL = APLICADOR_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const AplicadoresListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(AplicadoresList);

const AplicadoresFormWithUrl = () => <AplicadoresForm url={API.aplicador} />;

const Aplicadores = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={AplicadoresListIntl}></Route>
      <Route path={`${URL}/create`} component={AplicadoresFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={AplicadoresFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Aplicadores),
  },
  name: "FAC_APLICA",
  icon: <TouchAppOutlinedIcon />,
};
