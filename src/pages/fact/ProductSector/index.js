import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ProductSectorList from "./ProductSectorList";
import ProductSectorCreate from "./ProductSectorCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { PRODUCT_SECTOR_FACT_URL } from "constants/routes";

const URL = PRODUCT_SECTOR_FACT_URL;

const ProductSector = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ProductSectorList}></Route>
      <Route path={`${URL}/create`} component={ProductSectorCreate}></Route>
      <Route path={`${URL}/:id`} component={ProductSectorCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ProductSector),
  },
  name: "FAC_APS",
  icon: <DonutLargeIcon />,
};
export default component;
