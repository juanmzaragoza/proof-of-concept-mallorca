import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import SerieCompraList from "./PurchaseSeriesList";
import SerieCompraForm from "./PurschaseSeriesForm";
import {PURCHASE_SERIES_FACT_URL} from "constants/routes";


import withHeaders from "modules/wrappers/withHeaders";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";


const URL = PURCHASE_SERIES_FACT_URL;

// suppliers list
const mapStateToProps = (state, props) => {
  return {
    detailedComponent: SerieCompraFormUrl,
    url: API.serieCompra
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SerieCompraListIntl = compose(
  injectIntl,
  connect(mapStateToProps,mapDispatchToProps)
)(SerieCompraList);


const SerieCompraFormUrl = () => <SerieCompraForm url={API.serieCompra} />;

const SerieCompra = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SerieCompraListIntl}></Route>
      <Route path={`${URL}/create`} component={SerieCompraFormUrl}></Route>
      <Route path={`${URL}/:id`} component={SerieCompraFormUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${PURCHASE_SERIES_FACT_URL}`,
    component: withHeaders(SerieCompra)
  },
  name: 'FAC_SERCOM',
  icon: <ShoppingBasketOutlinedIcon />
}