import React from "react";
import { Route, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";

import { injectIntl } from "react-intl";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as API from "redux/api";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";

import ItemBrandList from "./ItemBrandList";
import ItemBrandForm from "./ItemBrandForm";

import { BRAND_FACT_URL } from "constants/routes";

const URL = BRAND_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ArticlesBrandListIntl = compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ItemBrandList);

const ArticlesBrandWithUrl = () => <ItemBrandForm url={API.articlesMarca} />;

const ArticlesBrand = () => (
  <Paper style={{ position: "relative" }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesBrandListIntl}></Route>
      <Route path={`${URL}/create`} component={ArticlesBrandWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ArticlesBrandWithUrl}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(ArticlesBrand),
  },
  name: "FAC_MARART",
  icon: <StoreMallDirectoryOutlinedIcon />,
};
export default component;
