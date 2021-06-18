import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AdjustIcon from '@material-ui/icons/Adjust';

import RetentionList from "./RetentionList";
import RetentionCreate from "./RetentionCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {RETENTIONS_FACT_URL} from "constants/routes";

const URL = RETENTIONS_FACT_URL;

const Retention = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={RetentionList}></Route>
      <Route path={`${URL}/create`} component={RetentionCreate}></Route>
      <Route path={`${URL}/:id`} component={RetentionCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Retention)
  },
  name: 'FAC_CLARET',
  icon: <AdjustIcon />
}
export default component;