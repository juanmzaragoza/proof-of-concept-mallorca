import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import ClientsFamilyList from "./ClientsFamilyList";
import ClientsFamilyForm from "./ClientsFamilyForm";

import { CLIENT_FAMILY_URL } from "constants/routes";

const URL = CLIENT_FAMILY_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ClientsFamilyListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ClientsFamilyList);

// TODO(): maybe we can create a state for the page and set the url there
const ClientsFamilyFormWithUrl = () => (
  <ClientsFamilyForm url={API.familiaClient} />
);

const ClientsFamily = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ClientsFamilyListIntl}></Route>
      <Route
        path={`${URL}/create`}
        component={ClientsFamilyFormWithUrl}
      ></Route>
      <Route path={`${URL}/:id`} component={ClientsFamilyFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ClientsFamily),
  },
  name: "FAC_FAMCLI",
  icon: <SupervisorAccountIcon />,
};
