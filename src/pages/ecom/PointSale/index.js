import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import PointSaleList from "./PointSaleList";
import PointSaleCreate from "./PointSaleCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {POINT_SALE_ECOM_URL} from "constants/routes";

const URL = POINT_SALE_ECOM_URL;

const PointSale = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={PointSaleList}></Route>
      <Route path={`${URL}/create`} component={PointSaleCreate}></Route>
      <Route path={`${URL}/:id`} component={PointSaleCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(PointSale)
  },
  name: 'COM_PTV',
  icon: <LocalOfferIcon />
}
export default component;