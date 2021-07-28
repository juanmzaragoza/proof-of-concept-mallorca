import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CategoryIcon from "@material-ui/icons/Category";

import ToxicCategoryList from "./ToxicCategoryList";
import ToxicCategoryCreate from "./ToxicCategoryCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { CATEG_TOXIC_FACT_URL } from "constants/routes";

const URL = CATEG_TOXIC_FACT_URL;

const ToxicCategory = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ToxicCategoryList}></Route>
      <Route path={`${URL}/create`} component={ToxicCategoryCreate}></Route>
      <Route path={`${URL}/:id`} component={ToxicCategoryCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ToxicCategory),
  },
  name: "FAC_CATTOX",
  icon: <CategoryIcon />,
};
export default component;
