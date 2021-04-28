import {compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import DrawerMenu from "./DrawerMenu";
import {getAllowedFunctionalities, getLoadingFunctionalities, getSelectedModule} from "../../redux/modules/selectors";
import { withConstants } from "../../modules/wrappers";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingFunctionalities(state),
    functionalities: getAllowedFunctionalities(state),
    selectedModule: getSelectedModule(state),
  };
};

export default compose(
  withConstants,
  connect(mapStateToProps),
  injectIntl
)(DrawerMenu);