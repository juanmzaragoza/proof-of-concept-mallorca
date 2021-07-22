import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import RappelList from "./RappelList";
import RappelCreate from "./RappelCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { RAPPEL_FACT_URL } from "constants/routes";

const URL = RAPPEL_FACT_URL;

const Rappel = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={RappelList}></Route>
      <Route path={`${URL}/create`} component={RappelCreate}></Route>
      <Route path={`${URL}/:id`} component={RappelCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Rappel),
  },
  name: "FAC_RAPPEL",
  icon: <StarBorderIcon />,
};
export default component;
