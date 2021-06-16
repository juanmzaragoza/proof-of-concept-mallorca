
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

const URL = '/proyectos';


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
const ProjectsFormWithUrl = () => < ProjectsForm url={API.clientes} />;


const Projects= () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ProjectsistIntl}></Route>
      <Route path={`${URL}/create`} component={ProjectsFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={ProjectsFormWithUrl}></Route>
     
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Projects)
  },
  name: 'FAC_PROJEC',
  icon: <DeveloperBoardIcon/>
}