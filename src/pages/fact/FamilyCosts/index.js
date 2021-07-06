import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FamilyCostsList from "./FamilyCostsList";
import FamilyCostsCreate from "./FamilyCostsCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {FAMILY_COSTS_FACT_URL} from "constants/routes";

const FamilyCosts = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${FAMILY_COSTS_FACT_URL}`} component={FamilyCostsList}></Route>
      <Route path={`${FAMILY_COSTS_FACT_URL}/create`} component={FamilyCostsCreate}></Route>
      <Route path={`${FAMILY_COSTS_FACT_URL}/:id`} component={FamilyCostsCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${FAMILY_COSTS_FACT_URL}`,
    component: withHeaders(FamilyCosts)
  },
  name: 'FAC_FAMCOS',
  icon: <SupervisorAccountIcon />
}
export default component;