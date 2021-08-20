
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
import AlbaranesProveedoresList from "./AlbaranesProveedoresList";
import AlbaranesProveedoresForm from "./AlbaranesProveedoresForm";
import {ALBARANES_PROV_FACT_URL} from "constants/routes";

const URL = ALBARANES_PROV_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const AlbaranesProveedoresListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(AlbaranesProveedoresList);

const AlbaranesProveedoresWithUrl = () => <AlbaranesProveedoresForm url={API.albaransProveidor} />;

const AlbaranesProveedores = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={AlbaranesProveedoresListIntl}></Route>
      <Route path={`${URL}/create`} component={AlbaranesProveedoresWithUrl}></Route>
      <Route path={`${URL}/:id`} component={AlbaranesProveedoresWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(AlbaranesProveedores)
  },
  name: 'FAC_ALBPRO',
  icon: <AssignmentOutlinedIcon />
}