
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
import  ClientesList from "./ClientesList";
import ClientesForm from "./ClientesForm";

const URL = '/clientes';

// suppliers list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ClientesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ClientesList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ClientesFormWithUrl = () => < ClientesForm url={API.clientes} />;


const Clientes= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ ClientesListIntl}></Route>
      <Route path={`${URL}/create`} component={ClientesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ClientesFormWithUrl}></Route>
     
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Clientes)
  },
  name: 'FAC_CLIENT',
  icon: <PersonIcon/>
}