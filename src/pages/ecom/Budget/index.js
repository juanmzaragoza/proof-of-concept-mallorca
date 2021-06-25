import React from 'react';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";
import {BUDGET_ECOM_URL} from "constants/routes";
import * as API from "../../../redux/api";

const URL = BUDGET_ECOM_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const BudgetListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(BudgetList);


// TODO(): maybe we can create a state for the page and set the url there
const BudgetFormWithUrl = () => <BudgetForm url={API.pressupostos} />;

const Budget = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={BudgetListIntl}></Route>
      <Route path={`${URL}/create`} component={BudgetFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={BudgetFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Budget)
  },
  name: 'COM_PRE',
  icon: <AssignmentOutlinedIcon />
}