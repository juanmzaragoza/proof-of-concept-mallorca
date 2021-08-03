import React from 'react';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CompanyList from "./CompanyList";
import CompanyForm from "./CompanyForm";
import {COMPANY_FACT_URL} from "constants/routes";

const URL = COMPANY_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CompanyListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(CompanyList);


const CompanyFormWithUrl = () => <CompanyForm url={API.empresa} />;

const Company = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CompanyListIntl}></Route>
      <Route path={`${URL}/create`} component={CompanyFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CompanyFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Company)
  },
  name: 'FAC_EMPRES',
  icon: <BusinessCenterIcon />
}