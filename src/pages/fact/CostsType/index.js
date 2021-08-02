import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AddCommentIcon from '@material-ui/icons/AddComment';

import CostsTypeList from "./CostsTypeList";
import CostsTypeCreate from "./CostsTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { COSTS_TYPE_FACT_URL } from "constants/routes";

const URL = COSTS_TYPE_FACT_URL;

const CostsType = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CostsTypeList}></Route>
      <Route path={`${URL}/create`} component={CostsTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={CostsTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CostsType),
  },
  name: "FAC_TCT",
  icon: <AddCommentIcon />,
};
export default component;
