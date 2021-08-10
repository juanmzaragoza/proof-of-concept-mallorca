import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";

import ArticleFamilyTransList from "./ArticleFamilyTransList";
import ArticleFamilyTransCreate from "./ArticleFamilyTransCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { ART_FAM_TRANSP_FACT_URL } from "constants/routes";

const URL = ART_FAM_TRANSP_FACT_URL;

const ArticleFamilyTrans = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticleFamilyTransList}></Route>
      <Route
        path={`${URL}/create`}
        component={ArticleFamilyTransCreate}
      ></Route>
      <Route path={`${URL}/:id`} component={ArticleFamilyTransCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticleFamilyTrans),
  },
  name: "FAC_FTT",
  icon: <EmojiTransportationIcon />,
};
export default component;
