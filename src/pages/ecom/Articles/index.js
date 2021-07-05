import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import ArticlesList from "./ArticlesList";
import ArticlesForm from "./ArticlesForm";
import {ARTICLES_ECOM_URL} from "constants/routes";
import * as API from "../../../redux/api";
import LocalMallIcon from '@material-ui/icons/LocalMall';

const URL = ARTICLES_ECOM_URL;


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


// TODO(): maybe we can create a state for the page and set the url there
const ArticlesFormWithUrl = () => <ArticlesForm url={API.articles} />;

const Articles = () => (
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
  name: 'COM_ARTICL',
  icon: <LocalMallIcon />
}