import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import SectionCompanyList from "./SectionCompanyList";
import SectionCompanyCreate from "./SectionCompanyCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {SECTION_COMPANY_FACT_URL} from "constants/routes";

const URL = SECTION_COMPANY_FACT_URL;

const SectionCompany = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SectionCompanyList}></Route>
      {/* <Route path={`${URL}/create`} component={SectionCompanyCreate}></Route>
      <Route path={`${URL}/:id`} component={SectionCompanyCreate}></Route> */}
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(SectionCompany)
  },
  name: 'FAC_SECEMP',
  icon: <FeaturedPlayListIcon />
}
export default component;