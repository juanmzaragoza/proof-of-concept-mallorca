import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import PaymentNatureList from "./PaymentNatureList";
import PaymentNatureCreate from "./PaymentNatureCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { NATURALEZA_PAGO_FACT_URL } from "constants/routes";
import PaymentIcon from "@material-ui/icons/Payment";

const URL = NATURALEZA_PAGO_FACT_URL;

const PaymentNature = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={PaymentNatureList}></Route>
      <Route path={`${URL}/create`} component={PaymentNatureCreate}></Route>
      <Route path={`${URL}/:id`} component={PaymentNatureCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(PaymentNature),
  },
  name: "FAC_NATP-C",
  icon: <PaymentIcon />,
};
export default component;
