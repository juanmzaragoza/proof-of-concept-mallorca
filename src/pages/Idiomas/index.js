import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {Language} from "@material-ui/icons";

import IdiomasList from "./IdiomasList";
import IdiomasCreate from "./IdiomasCreate";
import withHeaders from "../../modules/wrappers/withHeaders";

const URL = '/idiomes';

const Idiomas = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={IdiomasList}></Route>
      <Route path={`${URL}/create`} component={IdiomasCreate}></Route>
      <Route path={`${URL}/:id`} component={IdiomasCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Idiomas)
  },
  name: 'FAC_IDIOMA',
  icon: <Language />
}
export default component;