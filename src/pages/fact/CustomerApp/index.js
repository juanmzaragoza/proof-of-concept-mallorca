import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import TouchAppIcon from '@material-ui/icons/TouchApp';
import CustomerAppList from "./CustomerAppList";
import CustomerAppCreate from "./CustomerAppCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {CUSTOMER_APP_FACT_URL} from "constants/routes";

const customerApp = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${CUSTOMER_APP_FACT_URL}`} component={CustomerAppList}></Route>
      <Route path={`${CUSTOMER_APP_FACT_URL}/create`} component={CustomerAppCreate}></Route>
      <Route path={`${CUSTOMER_APP_FACT_URL}/:id`} component={CustomerAppCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${CUSTOMER_APP_FACT_URL}`,
    component: withHeaders(customerApp)
  },
  name: 'FAC_APLCLI',
  icon: <TouchAppIcon />
}
export default component;