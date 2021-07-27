import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DescriptionIcon from '@material-ui/icons/Description';

import IncidenceTypeList from "./IncidenceTypeList";
import IncidenceTypeCreate from "./IncidenceTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { INCIDENCE_TYPE_FACT_URL } from "constants/routes";

const URL = INCIDENCE_TYPE_FACT_URL;

const IncidenceType = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={IncidenceTypeList}></Route>
      <Route path={`${URL}/create`} component={IncidenceTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={IncidenceTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(IncidenceType),
  },
  name: "FAC_TIPINF",
  icon: <DescriptionIcon />,
};
export default component;
