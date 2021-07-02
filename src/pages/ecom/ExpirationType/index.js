import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import ExpirationTypeList from "./ExpirationTypeList";
import ExpirationTypeForm from "./ExpirationTypeForm";
import {EXPIRATION_TYPE_ECOM_URL} from "constants/routes";
import * as API from "../../../redux/api";
import TimelapseIcon from '@material-ui/icons/Timelapse';

const URL = EXPIRATION_TYPE_ECOM_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ExpirationTypeListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ExpirationTypeList);


// TODO(): maybe we can create a state for the page and set the url there
const ExpirationTypeFormWithUrl = () => <ExpirationTypeForm url={API.tipusVenciments} />;

const ExpirationType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ExpirationTypeListIntl}></Route>
      <Route path={`${URL}/create`} component={ExpirationTypeFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ExpirationTypeFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ExpirationType)
  },
  name: 'COM_TVE',
  icon: <TimelapseIcon />
}