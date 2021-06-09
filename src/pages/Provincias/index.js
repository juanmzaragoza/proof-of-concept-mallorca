import React from 'react';
import {Route, Switch} from "react-router-dom";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {LocationCity} from "@material-ui/icons";

import ProvinciasList from "./ProvinciasList";
import ProvinciasCreate from "./ProvinciasCreate";
import withHeaders from "../../modules/wrappers/withHeaders";
import {bindActionCreators, compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";


const URL = '/provincias';

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
)(ProvinciasList);


const Provincias = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ ProvListIntl }></Route>
      <Route path={`${URL}/create`} component={ProvinciasCreate}></Route>
      <Route path={`${URL}/:id`} component={ProvinciasCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Provincias)
  },
  name: 'FAC_PROVIN',
  icon: <LocationCity />
}
export default component;