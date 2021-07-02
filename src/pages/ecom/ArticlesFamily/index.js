
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import ArticlesFamilyList from "./ArticlesFamilyList";

import ArticlesFamilyForm from "./ArticlesFamilyForm";
import StorefrontIcon from '@material-ui/icons/Storefront';

import {ART_FAMILIA_ECOM_URL} from "constants/routes";

const URL = ART_FAMILIA_ECOM_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesFamilyListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ArticlesFamilyList);


// TODO(): maybe we can create a state for the page and set the url there
const ArticlesFamilyWithUrl = () => < ArticlesFamilyForm url={API.articleFamilias} />;

const ArticlesFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesFamilyListIntl}></Route>
      <Route path={`${URL}/create`} component={ArticlesFamilyWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ArticlesFamilyWithUrl}></Route>
    </Switch>
  </Paper>
);



export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesFamily)
  },
  name: 'COM_FAMART',
  icon: <StorefrontIcon/>
}