import LocalMallIcon from '@material-ui/icons/LocalMall';
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  ArticlesList from "./ArticlesList";
import ArticlesForm from "./ArticlesForm";

import {ARTICLE_FACT_URL} from "constants/routes";

const URL = ARTICLE_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ArticlesList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ArticlesFormWithUrl = () => <ArticlesForm url={API.articlesFact} />;


const Articles= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesListIntl}></Route>
      <Route path={`${URL}/create`} component={ArticlesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ArticlesFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Articles)
  },
  name: 'FAC_ARTICL',
  icon: <LocalMallIcon/>
}