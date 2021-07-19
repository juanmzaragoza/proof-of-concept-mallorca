import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import VehicleList from "./VehicleList";
import VehicleCreate from "./VehicleCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {VEHICLE_FACT_URL} from "constants/routes";

const URL = VEHICLE_FACT_URL;

const Vehicle = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={VehicleList}></Route>
      <Route path={`${URL}/create`} component={VehicleCreate}></Route>
      <Route path={`${URL}/:id`} component={VehicleCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Vehicle)
  },
  name: 'FAC_VEHICL',
  icon: <DriveEtaIcon />
}
export default component;