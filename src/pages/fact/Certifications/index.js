import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CertificationsList from "./CertificationsList";
import CertificationsForm from "./CertificationsForm";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";

import { CERTIFIACTION_FACT_URL } from "constants/routes";

const URL = CERTIFIACTION_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CertificationListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(CertificationsList);

// TODO(): maybe we can create a state for the page and set the url there
const CertificationFormWithUrl = () => (
  <CertificationsForm url={API.certificacio} />
);

const Certification = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CertificationListIntl}></Route>
      <Route
        path={`${URL}/create`}
        component={CertificationFormWithUrl}
      ></Route>
      <Route path={`${URL}/:id`} component={CertificationFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Certification),
  },
  name: "FAC_CERTIFI",
  icon: <VerifiedUserOutlinedIcon />,
};
