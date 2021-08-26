import React from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SupplierInvoiceList from "./SupplierInvoiceList";
import SupplierInvoiceForm from "./SupplierInvoiceForm";
import { INVOICE_SUPPLIER_FACT_URL } from "constants/routes";

const URL = INVOICE_SUPPLIER_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SupplierInvoiceListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(SupplierInvoiceList);

// TODO(): maybe we can create a state for the page and set the url there
const SupplierInvoiceFormWithUrl = () => (
  <SupplierInvoiceForm url={API.facturesProveidor} />
);

const SupplierInvoice = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={SupplierInvoiceListIntl}></Route>
      <Route
        path={`${URL}/create`}
        component={SupplierInvoiceFormWithUrl}
      ></Route>
      <Route path={`${URL}/:id`} component={SupplierInvoiceFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SupplierInvoice),
  },
  name: "FAC_FACPRO",
  icon: <AttachFileIcon />,
};
