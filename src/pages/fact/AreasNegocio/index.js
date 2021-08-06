import React from "react";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import AreasNegocioList from "./AreasNegocioList";
import AreasNegocioForm from "./AreasNegocioForm";
import { AREA_NEGOCIO_FACT_URL } from "constants/routes";

const URL = AREA_NEGOCIO_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const AreasNegociListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(AreasNegocioList);

const AreasNegociFormWithUrl = () => <AreasNegocioForm url={API.areaNegocis} />;

const AreasNegoci = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={AreasNegociListIntl}></Route>
      <Route path={`${URL}/create`} component={AreasNegociFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={AreasNegociFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(AreasNegoci),
  },
  name: "FAC_SERARENEG",
  icon: <FontDownloadIcon />,
};
