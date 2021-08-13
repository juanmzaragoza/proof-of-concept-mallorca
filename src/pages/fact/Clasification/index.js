import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ClassIcon from '@material-ui/icons/Class';
import ClasificationList from "./ClasificationList";
import ClasificationCreate from "./ClasificationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {CLASSIFACTION_FACT_URL} from "constants/routes";

const URL = CLASSIFACTION_FACT_URL;

const Clasification = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ClasificationList}></Route>
      <Route path={`${URL}/create`} component={ClasificationCreate}></Route>
      <Route path={`${URL}/:id`} component={ClasificationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Clasification)
  },
  name: 'FAC_CLS',
  icon: <ClassIcon />
}
export default component;