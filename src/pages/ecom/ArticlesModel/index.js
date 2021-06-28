import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import StoreIcon from '@material-ui/icons/Store';
import ArticlesModelList from "./ArticlesModelList";
import ArticlesModelCreate from "./ArticlesModelCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ART_MODEL_ECOM_URL} from "constants/routes";

const URL = ART_MODEL_ECOM_URL;

const ArticlesModel = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesModelList}></Route>
      <Route path={`${URL}/create`} component={ArticlesModelCreate}></Route>
      <Route path={`${URL}/:id`} component={ArticlesModelCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesModel)
  },
  name: 'COM_MODART',
  icon: <StoreIcon />
}
export default component;