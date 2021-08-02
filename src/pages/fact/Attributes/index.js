import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CodeIcon from '@material-ui/icons/Code';
import AttributesList from "./AttributesList";
import AttributesCreate from "./AttributesCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {ATR_TYPE_FACT_URL} from "constants/routes";

const Attributes = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${ATR_TYPE_FACT_URL}`} component={AttributesList}></Route>
      <Route path={`${ATR_TYPE_FACT_URL}/create`} component={AttributesCreate}></Route>
      <Route path={`${ATR_TYPE_FACT_URL}/:id`} component={AttributesCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${ATR_TYPE_FACT_URL}`,
    component: withHeaders(Attributes)
  },
  name: 'FAC_ATR',
  icon: <CodeIcon />
}
export default component;