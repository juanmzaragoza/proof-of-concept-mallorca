import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import BillingTypeList from "./BillingTypeList";
import BillingTypeCreate from "./BillingTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BILLING_TYPE_ECOM_URL} from "constants/routes";

const URL = BILLING_TYPE_ECOM_URL;

const BillingType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={BillingTypeList}></Route>
      <Route path={`${URL}/create`} component={BillingTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={BillingTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(BillingType)
  },
  name: 'COM_TFC',
  icon: <AssessmentOutlinedIcon />
}
export default component;