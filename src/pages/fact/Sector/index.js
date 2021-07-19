import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import PieChartIcon from '@material-ui/icons/PieChart';

import SectorList from "./SectorList";
import SectorCreate from "./SectorCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {SECTOR_FACT_URL} from "constants/routes";

const URL = SECTOR_FACT_URL;

const Sector = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SectorList}></Route>
      <Route path={`${URL}/create`} component={SectorCreate}></Route>
      <Route path={`${URL}/:id`} component={SectorCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Sector)
  },
  name: 'FAC_SEC',
  icon: <PieChartIcon />
}
export default component;