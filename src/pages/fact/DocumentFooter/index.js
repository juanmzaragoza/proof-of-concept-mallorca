import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import DocumentFooterList from "./DocumentFooterList";
import DocumentFooterForm from "./DocumentFooterForm";
import {DOCUMENT_FOOTER_FACT_URL} from "constants/routes";

const URL = DOCUMENT_FOOTER_FACT_URL;

// Document-Footer list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const DocumentFooterListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(DocumentFooterList);

// Document-Footer form
// TODO(): maybe we can create a state for the page and set the url there
const DocumentFooterFormWithUrl = () => <DocumentFooterForm url={API.peusDocument} />;

const DocumentFooter = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={DocumentFooterListIntl}></Route>
      <Route path={`${URL}/create`} component={DocumentFooterFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={DocumentFooterFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(DocumentFooter)
  },
  name: 'FAC_PEUDOC',
  icon: <AssignmentIcon />
}