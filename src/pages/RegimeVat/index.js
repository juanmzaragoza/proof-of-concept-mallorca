import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import RegimeVatList from "./RegimeVatList";
import RegimeVatCreate from "./RegimeVatCreate";
import withHeaders from "modules/wrappers/withHeaders";

const URL = '/regimen-iva';

const RegimeVat = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={RegimeVatList}></Route>
      <Route path={`${URL}/create`} component={RegimeVatCreate}></Route>
      <Route path={`${URL}/:id`} component={RegimeVatCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(RegimeVat)
  },
  name: 'FAC_REGIVA',
  icon: <AddBoxOutlinedIcon />
}
export default component;