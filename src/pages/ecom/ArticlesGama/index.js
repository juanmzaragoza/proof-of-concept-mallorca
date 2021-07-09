
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import StorefrontIcon from '@material-ui/icons/Storefront';
import ArticlesGamaList from "./ArticlesGamaList";
import ArticlesGamaCreate from "./ArticlesGamaCreate";
import ArticlesGamaForm from "./ArticlesGamaForm";

import {ART_GAMA_ECOM_URL} from "constants/routes";

const URL = ART_GAMA_ECOM_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesGamaListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ArticlesGamaList);

const ArticlesGamaWithUrl = () => < ArticlesGamaForm url={API.articleGammas} />;

const ArticlesGama = () => (
  <Paper style={{ position: 'relative' }}>
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
    component: withHeaders(ArticlesGama)
  },
  name: 'COM_GAMART',
  icon: <StorefrontIcon />
}
export default component;

