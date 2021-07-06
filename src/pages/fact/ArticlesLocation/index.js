import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import ArticlesLocationList from "./ArticlesLocationList";
import ArticlesLocationCreate from "./ArticlesLocationCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ARTICLES_LOCATION_FACT_URL} from "constants/routes";

const articlesLocation = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${ARTICLES_LOCATION_FACT_URL}`} component={ArticlesLocationList}></Route>
      <Route path={`${ARTICLES_LOCATION_FACT_URL}/create`} component={ArticlesLocationCreate}></Route>
      <Route path={`${ARTICLES_LOCATION_FACT_URL}/:id`} component={ArticlesLocationCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${ARTICLES_LOCATION_FACT_URL}`,
    component: withHeaders(articlesLocation)
  },
  name: 'FAC_UBIART',
  icon: <PinDropOutlinedIcon />
}
export default component;