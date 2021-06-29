import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {Public} from "@material-ui/icons";

import CountryList from "./CountryList";
import CountryCreate from "./CountryCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COUNTRY_ECOM_URL} from "constants/routes";

const URL = COUNTRY_ECOM_URL;

const Country = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CountryList}></Route>
      <Route path={`${URL}/create`} component={CountryCreate}></Route>
      <Route path={`${URL}/:id`} component={CountryCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Country)
  },
  name: 'COM_PAI',
  icon: <Public />
}
export default component;