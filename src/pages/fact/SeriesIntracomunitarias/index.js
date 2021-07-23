import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AssignmentIcon from '@material-ui/icons/Assignment';
import SeriesIntracomunitariasList from "./SeriesIntracomunitariasList";
import SeriesIntracomunitariasCreate from "./SeriesIntracomunitariasCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {SERIES_INTRACOMUNITARIAS_FACT_URL} from "constants/routes";

const SeriesIntracomunitarias = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${SERIES_INTRACOMUNITARIAS_FACT_URL}`} component={SeriesIntracomunitariasList}></Route>
      <Route path={`${SERIES_INTRACOMUNITARIAS_FACT_URL}/create`} component={SeriesIntracomunitariasCreate}></Route>
      <Route path={`${SERIES_INTRACOMUNITARIAS_FACT_URL}/:id`} component={SeriesIntracomunitariasCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${SERIES_INTRACOMUNITARIAS_FACT_URL}`,
    component: withHeaders(SeriesIntracomunitarias)
  },
  name: 'FAC_SERINT',
  icon: <AssignmentIcon />
}
export default component;