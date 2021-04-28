import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";

import EnterpriseGroupSelect from "./EnterpriseGroupSelect";
import {getLoading, getTree} from "redux/enterpriseGroup/selectors";
import {getLoggedInUserTokenIsRefreshed} from "redux/app/selectors";
import {searchTree} from "redux/enterpriseGroup";
import {refresh} from "redux/app";
import {searchModules} from "redux/modules";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoading(state),
    tree: getTree(state),
    isTokenRefreshed: getLoggedInUserTokenIsRefreshed(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadTree: bindActionCreators(searchTree,dispatch),
    refreshSession: bindActionCreators(refresh,dispatch),
    loadModules: bindActionCreators(searchModules,dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(EnterpriseGroupSelect);