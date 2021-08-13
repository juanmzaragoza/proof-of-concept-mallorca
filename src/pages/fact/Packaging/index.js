
import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import PagesIcon from '@material-ui/icons/Pages';
import PackagingList from "./PackagingList";
import PackagingCreate from "./PackagingCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {PACKAGING_TYPE_FACT_URL} from "constants/routes";

const URL = PACKAGING_TYPE_FACT_URL;

const Packaging = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={PackagingList}></Route>
      <Route path={`${URL}/create`} component={PackagingCreate}></Route>
      <Route path={`${URL}/:id`} component={PackagingCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Packaging)
  },
  name: 'FAC_ENVAS',
  icon: <PagesIcon />
}
export default component;