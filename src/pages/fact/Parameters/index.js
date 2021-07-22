import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import ParametersList from "./ParametersList";
import ParametersCreate from "./ParametersCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { PARAMETERS_FACT_URL } from "constants/routes";

const URL = PARAMETERS_FACT_URL;

const Parameters = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ParametersList}></Route>
      <Route path={`${URL}/create`} component={ParametersCreate}></Route>
      <Route path={`${URL}/:id`} component={ParametersCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Parameters),
  },
  name: "FAC_PARAM",
  icon: <ViewHeadlineIcon />,
};
export default component;
