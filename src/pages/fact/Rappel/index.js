import React from "react";
import { Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RappelList from "./RappelList";
import RappelForm from "./RappelForm";
import withHeaders from "modules/wrappers/withHeaders";
import { RAPPEL_FACT_URL } from "constants/routes";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";


const URL = RAPPEL_FACT_URL;

// suppliers list
const mapStateToProps = (state, props) => {
  return {
    detailedComponent: RappelFormUrl,
    url: API.rappel
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const RappelListIntl = compose(
  injectIntl,
  connect(mapStateToProps,mapDispatchToProps)
)(RappelList);


const RappelFormUrl = () => <RappelForm url={API.rappel} />;

const Rappel = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={RappelListIntl}></Route>
      <Route path={`${URL}/create`} component={RappelFormUrl}></Route>
      <Route path={`${URL}/:id`} component={RappelFormUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Rappel)
  },
  name: 'FAC_RAPPEL',
  icon: <StarBorderIcon />
}