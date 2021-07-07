import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AssessmentIcon from '@material-ui/icons/Assessment';
import UnitTypeList from "./UnitTypeList";
import UnitTypeCreate from "./UnitTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {UNIT_TYPE_FACT_URL} from "constants/routes";

const unitType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${UNIT_TYPE_FACT_URL}`} component={UnitTypeList}></Route>
      <Route path={`${UNIT_TYPE_FACT_URL}/create`} component={UnitTypeCreate}></Route>
      <Route path={`${UNIT_TYPE_FACT_URL}/:id`} component={UnitTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${UNIT_TYPE_FACT_URL}`,
    component: withHeaders(unitType)
  },
  name: 'FAC_UNITIP',
  icon: <AssessmentIcon />
}
export default component;