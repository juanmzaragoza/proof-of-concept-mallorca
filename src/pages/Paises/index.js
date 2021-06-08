import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {Public} from "@material-ui/icons";

import PaisesList from "./PaisesList";
import PaisesCreate from "./PaisesCreate";


import withHeaders from "../../modules/wrappers/withHeaders";
const URL = '/paises';



const Paises = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={PaisesList}></Route>
      <Route path={`${URL}/create`} component={PaisesCreate}></Route>
      <Route path={`${URL}/:id`} component={PaisesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Paises)
  },
  name: 'FAC_PAIS',
  icon: <Public />
}
export default component;