import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import  ProjectsList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";

import {PROJECT_FACT_URL} from "constants/routes";

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const ProjectsistIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ProjectsList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const ProjectsFormWithUrl = () => <ProjectsForm url={API.projectes} />;


const Projects= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${PROJECT_FACT_URL}`} component={ProjectsistIntl}></Route>
      <Route path={`${PROJECT_FACT_URL}/create`} component={ProjectsFormWithUrl}></Route>
      <Route path={`${PROJECT_FACT_URL}/:id`} component={ProjectsFormWithUrl}></Route>
     
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${PROJECT_FACT_URL}`,
    component: withHeaders(Projects)
  },
  name: 'FAC_PROJEC',
  icon: <DeveloperBoardIcon/>
}