import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SubvencionesList from "./SubvencionesList";
import SubvencionesCreate from "./SubvencionesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {SUBVENCIONES_FACT_URL} from "constants/routes";

const subvencion = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${SUBVENCIONES_FACT_URL}`} component={SubvencionesList}></Route>
      <Route path={`${SUBVENCIONES_FACT_URL}/create`} component={SubvencionesCreate}></Route>
      <Route path={`${SUBVENCIONES_FACT_URL}/:id`} component={SubvencionesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${SUBVENCIONES_FACT_URL}`,
    component: withHeaders(subvencion)
  },
  name: 'FAC_SUBVEN',
  icon: <AttachMoneyIcon />
}
export default component;