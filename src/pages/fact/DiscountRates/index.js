import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import DiscountRatesList from "./DiscountRatesList";
import DiscountRatesCreate from "./DiscountRatesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {DISCOUNT_RATES_FACT_URL} from "constants/routes";

const discountRates = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${DISCOUNT_RATES_FACT_URL}`} component={DiscountRatesList}></Route>
      <Route path={`${DISCOUNT_RATES_FACT_URL}/create`} component={DiscountRatesCreate}></Route>
      <Route path={`${DISCOUNT_RATES_FACT_URL}/:id`} component={DiscountRatesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${DISCOUNT_RATES_FACT_URL}`,
    component: withHeaders(discountRates)
  },
  name: 'FAC_TARDES',
  icon: <ReceiptOutlinedIcon />
}
export default component;