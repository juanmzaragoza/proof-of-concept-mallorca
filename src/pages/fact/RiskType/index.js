import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

import RiskTypeList from "./RiskTypeList";
import RiskTypeCreate from "./RiskTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {RISK_TYPE_FACT_URL} from "constants/routes";

const URL = RISK_TYPE_FACT_URL;

const RiskType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={RiskTypeList}></Route>
      <Route path={`${URL}/create`} component={RiskTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={RiskTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(RiskType)
  },
  name: 'FAC_TIPRIS',
  icon: <ChangeHistoryIcon />
}
export default component;