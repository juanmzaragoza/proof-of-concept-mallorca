import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";

import CecocloudModulesSelector from "./CecocloudModulesSelector";
import {getLoading, getModules} from "../../redux/modules/selectors";
import {loadModule} from "../../redux/modules";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoading(state),
    modules: getModules(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    selectModule: bindActionCreators(loadModule,dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(CecocloudModulesSelector);