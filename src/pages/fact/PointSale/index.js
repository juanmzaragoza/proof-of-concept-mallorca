import React from "react";
import { LocalMall } from "@material-ui/icons";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import PointSaleList from "./PointSaleList";
import PointSaleForm from "./PointSaleForm";
import { POINT_SALE_FACT_URL } from "constants/routes";

const URL = POINT_SALE_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const PointSaleListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(PointSaleList);

const PointSaleWithUrl = () => <PointSaleForm url={API.puntsVenda} />;

const PointSale = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={PointSaleListIntl}></Route>
      <Route path={`${URL}/create`} component={PointSaleWithUrl}></Route>
      <Route path={`${URL}/:id`} component={PointSaleWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(PointSale),
  },
  name: "FAC_PUNVEN",
  icon: <LocalMall />,
};
