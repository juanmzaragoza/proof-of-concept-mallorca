import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";

import {CUSTOMER_ECOM_URL} from "constants/routes";

const URL = CUSTOMER_ECOM_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CustomerListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(CustomerList);

// TODO(): maybe we can create a state for the page and set the url there
const CustomerFormWithUrl = () => < CustomerForm url={API.cliente} />;


const Customer= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CustomerListIntl}></Route>
      <Route path={`${URL}/create`} component={CustomerFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CustomerFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Customer)
  },
  name: 'COM_CLI',
  icon: <PersonIcon/>
}