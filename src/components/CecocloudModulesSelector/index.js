import {compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";

import CecocloudModulesSelector from "./CecocloudModulesSelector";
import {getLoading, getModules} from "../../redux/modules/selectors";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoading(state),
    modules: getModules(state)
  };
};

export default compose(
  connect(mapStateToProps,null),
  injectIntl
)(CecocloudModulesSelector);