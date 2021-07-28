import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import FactoringLineList from "./FactoringLineList";
import FactoringLineForm from "./FactoringLineForm";
import ListIcon from "@material-ui/icons/List";
import { FACTORING_LINE_FACT_URL } from "constants/routes";

const URL = FACTORING_LINE_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ClientsListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(FactoringLineList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ClientsFormWithUrl = () => <FactoringLineForm url={API.liniaFactoring} />;

const FactoringLine = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ClientsListIntl}></Route>
      <Route path={`${URL}/create`} component={ClientsFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ClientsFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(FactoringLine),
  },
  name: "FAC_LINFAC",
  icon: <ListIcon />,
};
