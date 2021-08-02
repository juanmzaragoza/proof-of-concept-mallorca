import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import ClosedCaptionIcon from "@material-ui/icons/ClosedCaption";
import CurrentAccountsList from "./CurrentAccountsList";
import CurrentAccountsCreate from "./CurrentAccountsCreate";
import withHeaders from "modules/wrappers/withHeaders";
import { CURRENT_ACCOUNT_FACT_URL } from "constants/routes";

const URL = CURRENT_ACCOUNT_FACT_URL;

const CurrentAccounts = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CurrentAccountsList}></Route>
      <Route path={`${URL}/create`} component={CurrentAccountsCreate}></Route>
      <Route path={`${URL}/:id`} component={CurrentAccountsCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CurrentAccounts),
  },
  name: "FAC_CCR",
  icon: <ClosedCaptionIcon />,
};
export default component;
