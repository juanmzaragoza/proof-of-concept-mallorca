import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DomainIcon from '@material-ui/icons/Domain';

import TipoInstalacionesList from "./TipoInstalacionesList";
import TipoInstalacionesCreate from "./TipoInstalacionesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { INSTALACIONES_TYPE_FACT_URL } from "constants/routes";

const URL = INSTALACIONES_TYPE_FACT_URL;

const TipoInstalaciones = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={TipoInstalacionesList}></Route>
      <Route path={`${URL}/create`} component={TipoInstalacionesCreate}></Route>
      <Route path={`${URL}/:id`} component={TipoInstalacionesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(TipoInstalaciones),
  },
  name: "FAC_TIT",
  icon: <DomainIcon />,
};
export default component;
