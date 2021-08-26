import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import CustomerBudgetList from "./CustomerBudgetList";
import CustomerBudgetForm from "./CustomerBudgetForm";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import {BUDGET_FACT_URL} from "constants/routes";

const URL = BUDGET_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const CustomerBudgetListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(CustomerBudgetList);


// TODO(): maybe we can create a state for the page and set the url there
const CustomerBudgetFormWithUrl = () => <CustomerBudgetForm url={API.pressupost} />;

const CustomerBudget = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={CustomerBudgetListIntl}></Route>
      <Route path={`${URL}/create`} component={CustomerBudgetFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={CustomerBudgetFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(CustomerBudget)
  },
  name: 'FAC_PRESSU',
  icon: <AssignmentOutlinedIcon />
}