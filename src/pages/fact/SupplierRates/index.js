import React from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SupplierRatesList from "./SupplierRatesList";
import SupplierRatesForm from "./SupplierRatesForm";
import {SUPPLIERS_RATES_FACT_URL} from "constants/routes";

const URL = SUPPLIERS_RATES_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SupplierRatesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SupplierRatesList);

const SupplierRatesFormWithUrl = () => <SupplierRatesForm url={API.tarifaProveidor} />;

const SupplierRates = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SupplierRatesListIntl}></Route>
      <Route exact path={`${URL}?proveedor`} component={SupplierRatesListIntl}></Route>
      <Route path={`${URL}/create`} component={SupplierRatesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SupplierRatesFormWithUrl}></Route>
      
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SupplierRates)
  },
  name: 'FAC_TARPRO',
  icon: <LocalMall />
}