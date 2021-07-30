import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";


import withHeaders from "modules/wrappers/withHeaders";
import FactoringLineList from "./FactoringLineList";
import FactoringLineCreate from "./FactoringLineCreate";
import ListIcon from "@material-ui/icons/List";
import { FACTORING_LINE_FACT_URL } from "constants/routes";

const URL = FACTORING_LINE_FACT_URL;



const FactoringLine = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={FactoringLineList}></Route>
      <Route path={`${URL}/create`} component={FactoringLineCreate}></Route>
      <Route path={`${URL}/:id`} component={FactoringLineCreate}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(FactoringLine),
  },
  name: "FAC_LINFAC",
  icon: <ListIcon />,
};
