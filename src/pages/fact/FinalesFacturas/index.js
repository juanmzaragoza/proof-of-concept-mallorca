import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ReceiptIcon from '@material-ui/icons/Receipt';
import FinalesFacturasList from "./FinalesFacturasList";
import FinalesFacturasCreate from "./FinalesFacturasCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {FINALES_FACTURAS_FACT_URL} from "constants/routes";

const finalesFacturas = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${FINALES_FACTURAS_FACT_URL}`} component={FinalesFacturasList}></Route>
      <Route path={`${FINALES_FACTURAS_FACT_URL}/create`} component={FinalesFacturasCreate}></Route>
      <Route path={`${FINALES_FACTURAS_FACT_URL}/:id`} component={FinalesFacturasCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${FINALES_FACTURAS_FACT_URL}`,
    component: withHeaders(finalesFacturas)
  },
  name: 'FAC_FINFAC',
  icon: <ReceiptIcon />
}
export default component;