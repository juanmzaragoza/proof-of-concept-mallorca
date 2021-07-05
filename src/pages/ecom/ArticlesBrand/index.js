import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';

import ArticlesBrandList from "./ArticlesBrandList";
import ArticlesBrandCreate from "./ArticlesBrandCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ART_MARCA_ECOM_URL} from "constants/routes";

const URL = ART_MARCA_ECOM_URL;

const ArticlesBrand = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesBrandList}></Route>
      <Route path={`${URL}/create`} component={ArticlesBrandCreate}></Route>
      <Route path={`${URL}/:id`} component={ArticlesBrandCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesBrand)
  },
  name: 'COM_MARART',
  icon: <StoreMallDirectoryOutlinedIcon />
}
export default component;