import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import PublicIcon from '@material-ui/icons/Public';
import CountryNifList from "./CountryNifList";
import CountryNifCreate from "./CountryNifCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COUNTRY_NIF_FACT_URL} from "constants/routes";

const URL = COUNTRY_NIF_FACT_URL;

const CountryNif = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CountryNifList}></Route>
      <Route path={`${URL}/create`} component={CountryNifCreate}></Route>
      <Route path={`${URL}/:id`} component={CountryNifCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CountryNif),
  },
  name: "FAC_PAINIF",
  icon: <PublicIcon />,
};
export default component;
