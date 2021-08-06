import React from "react";
import { injectIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Paper from "@material-ui/core/Paper";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CompanyGroupList from "./CompanyGroupList";
import CompanyGroupForm from "./CompanyGroupForm";
import { COMPANY_GROUP_FACT_URL } from "constants/routes";

const URL = COMPANY_GROUP_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CompanyGroupListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(CompanyGroupList);

const CompanyGroupFormWithUrl = () => (
  <CompanyGroupForm url={API.empresesGrup} />
);

const CompanyGroup = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={CompanyGroupListIntl}></Route>
      <Route path={`${URL}/create`} component={CompanyGroupFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CompanyGroupFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CompanyGroup),
  },
  name: "FAC_BUSGRO",
  icon: <GroupWorkIcon />,
};
