import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CommisionTypeList from "./CommisionTypeList";
import CommisionTypeCreate from "./CommisionTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {COMMISION_TYPE_FACT_URL} from "constants/routes";

const commisionType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${COMMISION_TYPE_FACT_URL}`} component={CommisionTypeList}></Route>
      <Route path={`${COMMISION_TYPE_FACT_URL}/create`} component={CommisionTypeCreate}></Route>
      <Route path={`${COMMISION_TYPE_FACT_URL}/:id`} component={CommisionTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${COMMISION_TYPE_FACT_URL}`,
    component: withHeaders(commisionType)
  },
  name: 'FAC_TIPCOM',
  icon: <MonetizationOnOutlinedIcon />
}
export default component;