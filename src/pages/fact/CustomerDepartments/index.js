import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CustomerDepartmentsList from "./CustomerDepartmentsList";
import CustomerDepartmentsCreate from "./CustomerDepartmentsCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {CUSTOMER_DEPARTMENT_FACT_URL} from "constants/routes";

const customerDepartments = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${CUSTOMER_DEPARTMENT_FACT_URL}`} component={CustomerDepartmentsList}></Route>
      <Route path={`${CUSTOMER_DEPARTMENT_FACT_URL}/create`} component={CustomerDepartmentsCreate}></Route>
      <Route path={`${CUSTOMER_DEPARTMENT_FACT_URL}/:id`} component={CustomerDepartmentsCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${CUSTOMER_DEPARTMENT_FACT_URL}`,
    component: withHeaders(customerDepartments)
  },
  name: 'FAC_DEPCLI',
  icon: <PeopleAltOutlinedIcon />
}
export default component;