import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import BillingTypeList from "./BillingTypeList";
import BillingTypeCreate from "./BillingTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BILLING_TYPE_FACT_URL} from "constants/routes";

const billingType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${BILLING_TYPE_FACT_URL}`} component={BillingTypeList}></Route>
      <Route path={`${BILLING_TYPE_FACT_URL}/create`} component={BillingTypeCreate}></Route>
      <Route path={`${BILLING_TYPE_FACT_URL}/:id`} component={BillingTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${BILLING_TYPE_FACT_URL}`,
    component: withHeaders(billingType)
  },
  name: 'FAC_TIPFAC',
  icon: <ReceiptOutlinedIcon />
}
export default component;