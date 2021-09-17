import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { Public } from "@material-ui/icons";

import CountryList from "./CountryList";
import CountryForm from "./CountryForm";
import withHeaders from "modules/wrappers/withHeaders";
import { COUNTRY_FACT_URL } from "constants/routes";

import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";

const URL = COUNTRY_FACT_URL;

// suppliers list
const mapStateToProps = (state, props) => {
  return {
    detailedComponent: CountryForm,
    url: API.pais,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CountryListIntl = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(CountryList);

const CountryFormUrl = () => <CountryForm url={API.pais} />;

const Country = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CountryListIntl}></Route>
      <Route path={`${URL}/create`} component={CountryFormUrl}></Route>
      <Route path={`${URL}/:id`} component={CountryFormUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Country),
  },
  name: "FAC_PAIS",
  icon: <Public />,
};
