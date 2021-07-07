import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import {INVOICE_FACT_URL} from "constants/routes";

const URL = INVOICE_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const InvoiceListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(InvoiceList);


// TODO(): maybe we can create a state for the page and set the url there
const InvoiceFormWithUrl = () => <InvoiceForm url={API.facturas} />;

const Invoice= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={InvoiceListIntl}></Route>
      <Route path={`${URL}/create`} component={InvoiceFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={InvoiceFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Invoice)
  },
  name: 'FAC_FAC',
  icon: <AttachFileIcon />
}