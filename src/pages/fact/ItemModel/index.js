import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import StoreIcon from "@material-ui/icons/Store";
import ArticlesModelList from "./ItemModelList";
import ArticlesModelForm from "./ItemModelForm";

import { MODEL_FACT_URL } from "constants/routes";

const URL = MODEL_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesModelListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ArticlesModelList);

const ArticlesModelWithUrl = () => (
  <ArticlesModelForm url={API.articlesModel} />
);

const ArticlesModel = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesModelListIntl}></Route>
      <Route path={`${URL}/create`} component={ArticlesModelWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ArticlesModelWithUrl}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesModel),
  },
  name: "FAC_MODART",
  icon: <StoreIcon />,
};
export default component;
