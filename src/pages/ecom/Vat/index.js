import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AddBoxIcon from '@material-ui/icons/AddBox';

import VatList from "./VatList";
import VatCreate from "./VatCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {IVA_ECOM_URL} from "constants/routes";

const URL = IVA_ECOM_URL;

const Vat = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={VatList}></Route>
      <Route path={`${URL}/create`} component={VatCreate}></Route>
      <Route path={`${URL}/:id`} component={VatCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Vat)
  },
  name: 'COM_IVA',
  icon: <AddBoxIcon />
}
export default component;