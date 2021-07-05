import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import PaymentDocumentsList from "./PaymentDocumentsList";
import PaymentDocumentsForm from "./PaymentDocumentsForm";
import {PAYMENT_DOCS_ECOM_URL} from "constants/routes";
import * as API from "../../../redux/api";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const URL = PAYMENT_DOCS_ECOM_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const PaymentDocumentsListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(PaymentDocumentsList);


// TODO(): maybe we can create a state for the page and set the url there
const PaymentDocumentsFormWithUrl = () => <PaymentDocumentsForm url={API.documentPagamentCobraments} />;

const PaymentDocuments = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={PaymentDocumentsListIntl}></Route>
      <Route path={`${URL}/create`} component={PaymentDocumentsFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={PaymentDocumentsFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(PaymentDocuments)
  },
  name: 'COM_DPG',
  icon: <LibraryBooksIcon />
}