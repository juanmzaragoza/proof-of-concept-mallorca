import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import EnterpriseGroupSelect from "./EnterpriseGroupSelect";
import {getLoading, getTree} from "../../redux/enterpriseGroup/selectors";
import {searchTree} from "../../redux/enterpriseGroup";
import {refresh} from "../../redux/app";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoading(state),
    tree: getTree(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadTree: bindActionCreators(searchTree,dispatch),
    loadModules: bindActionCreators(refresh,dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(EnterpriseGroupSelect);