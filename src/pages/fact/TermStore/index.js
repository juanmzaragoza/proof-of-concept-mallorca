import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ScheduleIcon from '@material-ui/icons/Schedule';

import TermStoreList from "./TermStoreList";
import TermStoreCreate from "./TermStoreCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {PERIOD_STORE_FACT_URL} from "constants/routes";

const URL = PERIOD_STORE_FACT_URL;

const TermStore = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={TermStoreList}></Route>
      <Route path={`${URL}/create`} component={TermStoreCreate}></Route>
      <Route path={`${URL}/:id`} component={TermStoreCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(TermStore)
  },
  name: 'FAC_MAGPER',
  icon: <ScheduleIcon />
}
export default component;