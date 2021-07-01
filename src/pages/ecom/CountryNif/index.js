import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {Public} from "@material-ui/icons";

import CountryNifList from "./CountryNifList";
import CountryNifCreate from "./CountryNifCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COUNTRY_NIF_ECOM_URL} from "constants/routes";

const URL = COUNTRY_NIF_ECOM_URL;

const CountryNif = () => (
  <Paper style={{ position: 'relative' }}>
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
    component: withHeaders(CountryNif)
  },
  name: 'COM_PAINIF',
  icon: <Public />
}
export default component;