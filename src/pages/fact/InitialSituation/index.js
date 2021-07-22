import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AssistantIcon from "@material-ui/icons/Assistant";

import InitialSituationList from "./InitialSituationList";
import InitialSituationCreate from "./InitialSituationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { INITIAL_SITUATION_FACT_URL } from "constants/routes";

const URL = INITIAL_SITUATION_FACT_URL;

const InitialSituation = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={InitialSituationList}></Route>
      <Route path={`${URL}/create`} component={InitialSituationCreate}></Route>
      <Route path={`${URL}/:id`} component={InitialSituationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(InitialSituation),
  },
  name: "FAC_SITINI",
  icon: <AssistantIcon />,
};
export default component;
