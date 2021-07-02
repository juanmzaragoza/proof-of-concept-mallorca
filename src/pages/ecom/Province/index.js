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
import {PROVINCE_ECOM_URL} from "constants/routes";

const URL = PROVINCE_ECOM_URL;




const Province = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ ProvinceList }></Route>
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
  name: 'COM_PRV',
  icon: <LocationCity />
}
export default component;