import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AssignmentIcon from '@material-ui/icons/Assignment';
import ProjectTypeList from "./ProjectTypeList";
import ProjectTypeCreate from "./ProjectTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {PROJECT_TYPE_FACT_URL} from "constants/routes";

const ProjectType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${PROJECT_TYPE_FACT_URL}`} component={ProjectTypeList}></Route>
      <Route path={`${PROJECT_TYPE_FACT_URL}/create`} component={ProjectTypeCreate}></Route>
      <Route path={`${PROJECT_TYPE_FACT_URL}/:id`} component={ProjectTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${PROJECT_TYPE_FACT_URL}`,
    component: withHeaders(ProjectType)
  },
  name: 'FAC_PROTIP',
  icon: <AssignmentIcon />
}
export default component;