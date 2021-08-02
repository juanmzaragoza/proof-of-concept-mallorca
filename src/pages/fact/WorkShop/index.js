import React from "react";

import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import WorkShopList from "./WorkShopList";
import WorkShopForm from "./WorkShopForm";
import { WORKSHOP_FACT_URL } from "constants/routes";

const URL = WORKSHOP_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const WorkShopListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(WorkShopList);

const WorkShopFormWithUrl = () => <WorkShopForm url={API.tallers} />;

const WorkShop = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={WorkShopListIntl}></Route>
      <Route path={`${URL}/create`} component={WorkShopFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={WorkShopFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(WorkShop),
  },
  name: "FAC_TAL",
  icon: <SettingsApplicationsIcon />,
};
