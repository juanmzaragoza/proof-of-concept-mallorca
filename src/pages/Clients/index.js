
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
import  ClientsList from "./ClientsList";
import ClientsForm from "./ClientsForm";

const URL = '/clientes';


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ClientsListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ClientsList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ClientsFormWithUrl = () => < ClientsForm url={API.clientes} />;


const Clients= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ ClientsListIntl}></Route>
      <Route path={`${URL}/create`} component={ClientsFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ClientsFormWithUrl}></Route>
     
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Clients)
  },
  name: 'FAC_CLIENT',
  icon: <PersonIcon/>
}