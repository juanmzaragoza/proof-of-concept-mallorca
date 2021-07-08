import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import {getFilters, getValueByKey} from "redux/advancedFilters/selectors";
import {bindActionCreators, compose} from "redux";
import {add, reset} from "redux/advancedFilters";

import AdvancedFilters from "./AdvancedFilters";

const mapStateToProps = (state, props) => {
  return {
    filters: getFilters(state),
    getValueByKey: getValueByKey(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFilters: bindActionCreators(add, dispatch),
    resetFilters: bindActionCreators(reset, dispatch)
  };
  return { actions };
};

const component = compose(
  injectIntl,
  connect(mapStateToProps,mapDispatchToProps)
)(AdvancedFilters);

export default component;