import React from 'react';
import {Route, Switch} from "react-router-dom";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";
import {LocationCity} from "@material-ui/icons";

import ProvinceList from "./ProvinceList";
import ProvinceCreate from "./ProvinceCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import {PROVINCE_FACT_URL} from "constants/routes";

const URL = PROVINCE_FACT_URL;

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ProvListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ProvinceList);

const Province = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ ProvListIntl }></Route>
      <Route path={`${URL}/create`} component={ProvinceCreate}></Route>
      <Route path={`${URL}/:id`} component={ProvinceCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Province)
  },
  name: 'FAC_PROVIN',
  icon: <LocationCity />
}
export default component;