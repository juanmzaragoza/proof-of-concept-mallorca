import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import CommercialSituationList from "./CommercialSituationList";
import CommercialSituationCreate from "./CommercialSituationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { COMMERCIAL_FACT_URL } from "constants/routes";
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";

const URL = COMMERCIAL_FACT_URL;

const CommericalSituation = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CommercialSituationList}></Route>
      <Route
        path={`${URL}/create`}
        component={CommercialSituationCreate}
      ></Route>
      <Route path={`${URL}/:id`} component={CommercialSituationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CommericalSituation),
  },
  name: "FAC_SITCOM",
  icon: <StoreOutlinedIcon />,
};
export default component;
