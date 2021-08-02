import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import WorkTypeList from "./WorkTypeList";
import WorkTypeCreate from "./WorkTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {WORK_TYPE_FACT_URL} from "constants/routes";

const WorkType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${WORK_TYPE_FACT_URL}`} component={WorkTypeList}></Route>
      <Route path={`${WORK_TYPE_FACT_URL}/create`} component={WorkTypeCreate}></Route>
      <Route path={`${WORK_TYPE_FACT_URL}/:id`} component={WorkTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${WORK_TYPE_FACT_URL}`,
    component: withHeaders(WorkType)
  },
  name: 'FAC_TFO',
  icon: <AllInboxIcon />
}
export default component;