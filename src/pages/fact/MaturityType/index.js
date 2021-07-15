import React from 'react';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import MaturityTypeList from "./MaturityTypeList";
import MaturityTypeForm from "./MaturityTypeForm";
import {TIPO_VENCIMIENTO_FACT_URL} from "constants/routes";

const URL = TIPO_VENCIMIENTO_FACT_URL;

// Document-Footer list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const MaturityTypeListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(MaturityTypeList);

// Document-Footer form
// TODO(): maybe we can create a state for the page and set the url there
const MaturityTypeFormWithUrl = () => <MaturityTypeForm url={API.tipusVenciment} />;

const Rates = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={MaturityTypeListIntl}></Route>
      <Route path={`${URL}/create`} component={MaturityTypeFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={MaturityTypeFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Rates)
  },
  name: 'FAC_TIPVEN',
  icon: <ReceiptOutlinedIcon />
}