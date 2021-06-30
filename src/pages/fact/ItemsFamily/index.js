import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import ItemsFamilyList from "./ItemsFamilyList";
import ItemsFamilyForm from "./ItemsFamilyForm";
import {ITEM_FAMILY_FACT_URL} from "constants/routes";

const URL = ITEM_FAMILY_FACT_URL;

// Document-Footer list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ItemsFamilyListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ItemsFamilyList);

// Document-Footer form
// TODO(): maybe we can create a state for the page and set the url there
const ItemsFamilyFormWithUrl = () => <ItemsFamilyForm url={API.familiaArticle} />;

const ItemsFamily = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ItemsFamilyListIntl}></Route>
      <Route path={`${URL}/create`} component={ItemsFamilyFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ItemsFamilyFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ItemsFamily)
  },
  name: 'FAC_FAMART',
  icon: <AssignmentIcon />
}