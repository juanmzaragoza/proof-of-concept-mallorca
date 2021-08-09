import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import AttachmentIcon from '@material-ui/icons/Attachment';
import FinalesFacturaList from "./FinalesFacturasList";
import FinalesFacturaForm from "./FinalesFacturaForm";

import { FINALES_FACTURAS_FACT_URL } from "constants/routes";

const URL = FINALES_FACTURAS_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const FinalesFacturaListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(FinalesFacturaList);

const FinalesFacturaWithUrl = () => (
  <FinalesFacturaForm url={API.finalFactura} />
);

const FinalesFactura = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={FinalesFacturaListIntl}></Route>
      <Route path={`${URL}/create`} component={FinalesFacturaWithUrl}></Route>
      <Route path={`${URL}/:id`} component={FinalesFacturaWithUrl}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(FinalesFactura),
  },
  name: "FAC_FINFAC",
  icon: <AttachmentIcon />,
};
export default component;
