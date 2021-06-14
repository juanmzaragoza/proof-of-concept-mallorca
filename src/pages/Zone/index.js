import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import ZoneList from "./ZoneList";
import ZoneCreate from "./ZoneCreate";
import withHeaders from "../../modules/wrappers/withHeaders";

const URL = "/zona";

const Zone = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ZoneList}></Route>
      <Route path={`${URL}/create`} component={ZoneCreate}></Route>
      <Route path={`${URL}/:id`} component={ZoneCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Zone),
  },
  name: "FAC_ZONA",
  icon: <LocationSearchingIcon />,
};
export default component;
