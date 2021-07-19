import React from 'react';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import DocumentoPagoCobroList from "./DocumentoPagoCobroList";
import DocumentoPagoCobroForm from "./DocumentoPagoCobroForm";
import {DOCUMENTO_PAGO_COBRO_FACT_URL} from "constants/routes";

const URL = DOCUMENTO_PAGO_COBRO_FACT_URL;

// Documento-Pago-Cobro list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const DocumentoPagoCobroListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(DocumentoPagoCobroList);

// Documento-Pago-Cobro form
// TODO(): maybe we can create a state for the page and set the url there
const DocumentoPagoCobroFormWithUrl = () => <DocumentoPagoCobroForm url={API.documentPagamentCobrament} />;

const DocumentoPagoCobro = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={DocumentoPagoCobroListIntl}></Route>
      <Route path={`${URL}/create`} component={DocumentoPagoCobroFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={DocumentoPagoCobroFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(DocumentoPagoCobro)
  },
  name: 'FAC_DOCP-C',
  icon: <PaymentOutlinedIcon />
}