import React from 'react';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import AlbaranesClientesList from "./AlbaranesClientesList";
import AlbaranesClientesForm from "./AlbaranesClientesForm";
import {ALBARANES_CLIENTE_FACT_URL} from "constants/routes";

const URL = ALBARANES_CLIENTE_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const AlbaranesClientesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(AlbaranesClientesList);


const AlbaranesClientesWithUrl = () => <AlbaranesClientesForm url={API.albarans} />;

const AlbaranesClientes = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={AlbaranesClientesListIntl}></Route>
      <Route path={`${URL}/create`} component={AlbaranesClientesWithUrl}></Route>
      <Route path={`${URL}/:id`} component={AlbaranesClientesWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(AlbaranesClientes)
  },
  name: 'FAC_ALBARA',
  icon: <AssignmentOutlinedIcon />
}