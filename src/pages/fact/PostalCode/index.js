import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import {LocationCity} from "@material-ui/icons";
import PostalCodeList from "./PostalCodeList";
import PostalCodeCreate from "./PostalCodeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {POSTAL_CODE_FACT_URL} from "constants/routes";

const URL = POSTAL_CODE_FACT_URL;

const postalCode = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={PostalCodeList}></Route>
      <Route path={`${URL}/create`} component={PostalCodeCreate}></Route>
      <Route path={`${URL}/:id`} component={PostalCodeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(postalCode)
  },
  name: 'FAC_CP',
  icon: <LocationCity />
}
export default component;