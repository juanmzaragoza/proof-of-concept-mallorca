import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import BusinessIcon from '@material-ui/icons/Business';
import BusinessAreaList from "./BusinessAreaList";
import BusinessAreaCreate from "./BusinessAreaCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BUSINESS_AREA_FACT_URL} from "constants/routes";

const businessArea = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${BUSINESS_AREA_FACT_URL}`} component={BusinessAreaList}></Route>
      <Route path={`${BUSINESS_AREA_FACT_URL}/create`} component={BusinessAreaCreate}></Route>
      <Route path={`${BUSINESS_AREA_FACT_URL}/:id`} component={BusinessAreaCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${BUSINESS_AREA_FACT_URL}`,
    component: withHeaders(businessArea)
  },
  // name: 'FAC_ARENEG',
  icon: <BusinessIcon />
}
export default component;