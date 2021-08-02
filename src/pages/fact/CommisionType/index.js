import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CommisionTypeList from "./CommisionTypeList";
import CommisionTypeForm from "./CommisionTypeForm";

import { COMMISION_TYPE_FACT_URL } from "constants/routes";

const URL = COMMISION_TYPE_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const commisionTypeListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(CommisionTypeList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const commisionTypeFormWithUrl = () => (
  <CommisionTypeForm url={API.tipusComissio} />
);

const commisionType = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={commisionTypeListIntl}></Route>
      <Route
        path={`${URL}/create`}
        component={commisionTypeFormWithUrl}
      ></Route>
      <Route path={`${URL}/:id`} component={commisionTypeFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(commisionType),
  },
  name: "FAC_TIPCOM",
  icon: <MonetizationOnOutlinedIcon />,
};
