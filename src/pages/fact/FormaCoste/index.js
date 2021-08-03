import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FormaCosteList from "./FormaCosteList";
import FormaCosteForm from "./FormaCosteForm";

import { FORMA_COST_FACT_URL } from "constants/routes";

const URL = FORMA_COST_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const FormaCosteListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(FormaCosteList);

const FormaCosteWithUrl = () => <FormaCosteForm url={API.formesCost} />;

const FormaCoste = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={FormaCosteListIntl}></Route>
      <Route path={`${URL}/create`} component={FormaCosteWithUrl}></Route>
      <Route path={`${URL}/:id`} component={FormaCosteWithUrl}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(FormaCoste),
  },
  name: "FAC_FORCOS",
  icon: <LocalAtmIcon />,
};
export default component;
