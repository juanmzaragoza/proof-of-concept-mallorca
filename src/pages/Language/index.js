import React from 'react';
import {Route, Switch} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {Language} from "@material-ui/icons";

import LanguageList from "./LanguageList";
import LanguageCreate from "./LanguageCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {LANGUAGE_FACT_URL} from "constants/routes";

const URL = LANGUAGE_FACT_URL;

const Languages = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={LanguageList}></Route>
      <Route path={`${URL}/create`} component={LanguageCreate}></Route>
      <Route path={`${URL}/:id`} component={LanguageCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Languages)
  },
  name: 'FAC_IDIOMA',
  icon: <Language />
}
export default component;