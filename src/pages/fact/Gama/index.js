import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GamaList from "./GamaList";
import GamaCreate from "./GamaCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {GAMA_FACT_URL} from "constants/routes";

const gama = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${GAMA_FACT_URL}`} component={GamaList}></Route>
      <Route path={`${GAMA_FACT_URL}/create`} component={GamaCreate}></Route>
      <Route path={`${GAMA_FACT_URL}/:id`} component={GamaCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${GAMA_FACT_URL}`,
    component: withHeaders(gama)
  },
  name: 'FAC_GAMART',
  icon: <AccountBalanceIcon />
}
export default component;