import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import RegimeVatList from "./RegimeVatList";
import RegimeVatCreate from "./RegimeVatCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {REGIME_VAT_ECOM_URL} from "constants/routes";

const URL = REGIME_VAT_ECOM_URL;

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
  name: 'COM_RGI',
  icon: <AddBoxOutlinedIcon />
}
export default component;