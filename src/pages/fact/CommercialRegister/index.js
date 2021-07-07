import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ContactsSharpIcon from '@material-ui/icons/ContactsSharp';
import CommercialRegisterList from "./CommercialRegisterList";
import CommercialRegisterCreate from "./CommercialRegisterCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COMMERCIAL_REGISTER_FACT_URL} from "constants/routes";

const URL = COMMERCIAL_REGISTER_FACT_URL;

const CommercialRegister = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CommercialRegisterList}></Route>
      <Route path={`${URL}/create`} component={CommercialRegisterCreate}></Route>
      <Route path={`${URL}/:id`} component={CommercialRegisterCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CommercialRegister)
  },
  name: 'FAC_REGCOM',
  icon: <ContactsSharpIcon />
}
export default component;