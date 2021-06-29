import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';
import ItemModelList from "./ItemModelList";
import ItemModelCreate from "./ItemModelCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {MODEL_FACT_URL} from "constants/routes";

const model = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${MODEL_FACT_URL}`} component={ItemModelList}></Route>
      <Route path={`${MODEL_FACT_URL}/create`} component={ItemModelCreate}></Route>
      <Route path={`${MODEL_FACT_URL}/:id`} component={ItemModelCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${MODEL_FACT_URL}`,
    component: withHeaders(model)
  },
  name: 'FAC_MODART',
  icon: <AdjustOutlinedIcon />
}
export default component;