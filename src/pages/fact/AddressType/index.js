import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import AddressTypeList from "./AddressTypeList";
import AddressTypeCreate from "./AddressTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ADDRESS_TYPE_FACT_URL} from "constants/routes";

const addressType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${ADDRESS_TYPE_FACT_URL}`} component={AddressTypeList}></Route>
      <Route path={`${ADDRESS_TYPE_FACT_URL}/create`} component={AddressTypeCreate}></Route>
      <Route path={`${ADDRESS_TYPE_FACT_URL}/:id`} component={AddressTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${ADDRESS_TYPE_FACT_URL}`,
    component: withHeaders(addressType)
  },
  name: 'FAC_TIPADR',
  icon: <ContactsOutlinedIcon />
}
export default component;