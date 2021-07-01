import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import StorefrontIcon from '@material-ui/icons/Storefront';
import ArticlesGamaList from "./ArticlesGamaList";
import ArticlesGamaCreate from "./ArticlesGamaCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ART_GAMA_ECOM_URL} from "constants/routes";

const URL = ART_GAMA_ECOM_URL;

const ArticlesGama = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesGamaList}></Route>
      <Route path={`${URL}/create`} component={ArticlesGamaCreate}></Route>
      <Route path={`${URL}/:id`} component={ArticlesGamaCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesGama)
  },
  name: 'COM_GAMART',
  icon: <StorefrontIcon />
}
export default component;