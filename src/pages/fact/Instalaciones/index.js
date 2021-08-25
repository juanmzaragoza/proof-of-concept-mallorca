import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DomainIcon from '@material-ui/icons/Domain';

import InstalacionesList from "./InstalacionesList";
import InstalacionesCreate from "./InstalacionesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { INSTALACIONES_FACT_URL } from "constants/routes";

const URL = INSTALACIONES_FACT_URL;

const Instalaciones = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={InstalacionesList}></Route>
      <Route path={`${URL}/create`} component={InstalacionesCreate}></Route>
      <Route path={`${URL}/:id`} component={InstalacionesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Instalaciones),
  },
  name: "FAC_INS",
  icon: <DomainIcon />,
};
export default component;
