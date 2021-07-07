import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import PinDropIcon from '@material-ui/icons/PinDrop';
import LocationList from "./LocationList";
import LocationCreate from "./LocationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {LOCATION_FACT_URL} from "constants/routes";

const location = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${LOCATION_FACT_URL}`} component={LocationList}></Route>
      <Route path={`${LOCATION_FACT_URL}/create`} component={LocationCreate}></Route>
      <Route path={`${LOCATION_FACT_URL}/:id`} component={LocationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${LOCATION_FACT_URL}`,
    component: withHeaders(location)
  },
  name: 'FAC_UBICAC',
  icon: <PinDropIcon />
}
export default component;