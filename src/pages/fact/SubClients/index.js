import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SubClientsList from "./SubClientsList";
import SubClientsForm from "./SubClientsForm";
import { SUBCLIENTS_FACT_URL } from "constants/routes";

const URL = SUBCLIENTS_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SubClientListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(SubClientsList);

const SubClientFormWithUrl = () => <SubClientsForm url={API.subClients} />;

const SubClient = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={SubClientListIntl}></Route>
      <Route path={`${URL}/create`} component={SubClientFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SubClientFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SubClient),
  },
  name: "FAC_SUBCLI",
  icon: <AccountCircleIcon />,
};
