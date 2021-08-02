import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import StorefrontIcon from "@material-ui/icons/Storefront";
import ArticlesGamaList from "./GamaList";

import ArticlesGamaForm from "./GamaForm";

import { GAMA_FACT_URL } from "constants/routes";

const URL = GAMA_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesGamaListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ArticlesGamaList);

const ArticlesGamaWithUrl = () => <ArticlesGamaForm url={API.articlesGama} />;

const ArticlesGama = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesGamaListIntl}></Route>
      <Route path={`${URL}/create`} component={ArticlesGamaWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ArticlesGamaWithUrl}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesGama),
  },
  name: "FAC_GAMART",
  icon: <StorefrontIcon />,
};
export default component;
