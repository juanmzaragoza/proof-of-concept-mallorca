import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import InvoiceComplementList from "./InvoiceComplementList";
import InvoiceComplementCreate from "./InvoiceComplementCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { INVOICE_COMPL_FACT_URL } from "constants/routes";

const URL = INVOICE_COMPL_FACT_URL;

const InvoiceComplement = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={InvoiceComplementList}></Route>
      <Route path={`${URL}/create`} component={InvoiceComplementCreate}></Route>
      <Route path={`${URL}/:id`} component={InvoiceComplementCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(InvoiceComplement),
  },
  name: "FAC_COMFAC",
  icon: <FileCopyIcon />,
};
export default component;
