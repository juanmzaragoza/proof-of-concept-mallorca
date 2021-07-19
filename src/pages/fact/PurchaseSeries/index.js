import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import PurchaseSeriesList from "./PurchaseSeriesList";
import PurchaseSeriesCreate from "./PurchaseSeriesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {PURCHASE_SERIES_FACT_URL} from "constants/routes";

const SeriesIntracomunitarias = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${PURCHASE_SERIES_FACT_URL}`} component={PurchaseSeriesList}></Route>
      <Route path={`${PURCHASE_SERIES_FACT_URL}/create`} component={PurchaseSeriesCreate}></Route>
      <Route path={`${PURCHASE_SERIES_FACT_URL}/:id`} component={PurchaseSeriesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${PURCHASE_SERIES_FACT_URL}`,
    component: withHeaders(SeriesIntracomunitarias)
  },
  name: 'FAC_SERCOM',
  icon: <ShoppingBasketOutlinedIcon />
}
export default component;