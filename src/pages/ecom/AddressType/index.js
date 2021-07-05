import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import PinDropIcon from '@material-ui/icons/PinDrop';
import AdressTypeList from "./AddressTypeList";
import AdressTypeCreate from "./AddressTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ADRESS_TYPE_ECOM_URL} from "constants/routes";

const URL = ADRESS_TYPE_ECOM_URL;

const AddressType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={AdressTypeList}></Route>
      <Route path={`${URL}/create`} component={AdressTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={AdressTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(AddressType)
  },
  name: 'COM_TIPADR',
  icon: <PinDropIcon />
}
export default component;