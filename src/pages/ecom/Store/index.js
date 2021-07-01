
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  StoreList from "./StoreList";
import StoreForm from "./StoreForm";
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {STORE_ECOM_URL} from "constants/routes";

const URL = STORE_ECOM_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const StoreListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(StoreList);

// TODO(): maybe we can create a state for the page and set the url there
const StoreFormWithUrl = () => < StoreForm url={API.magatzems} />;


const Store= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={StoreListIntl}></Route>
      <Route path={`${URL}/create`} component={StoreFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={StoreFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Store)
  },
  name: 'COM_MAG',
  icon: <HomeWorkIcon/>
}