import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ExpedientsList from "./ExpedientsList";
import ExpedientsCreate from "./ExpedientsCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { EXPEDIENT_FACT_URL } from "constants/routes";

const URL = EXPEDIENT_FACT_URL;

const Expedients = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ExpedientsList}></Route>
      <Route path={`${URL}/create`} component={ExpedientsCreate}></Route>
      <Route path={`${URL}/:id`} component={ExpedientsCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Expedients),
  },
  name: "FAC_EXPED",
  icon: <AspectRatioIcon />,
};
export default component;
