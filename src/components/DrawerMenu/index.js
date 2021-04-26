import {compose} from "redux";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import DrawerMenu from "./DrawerMenu";
import {getAllowedFunctionalities, getLoadingFunctionalities} from "../../redux/modules/selectors";

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingFunctionalities(state),
    functionalities: getAllowedFunctionalities(state),
  };
};

export default compose(
  connect(mapStateToProps),
  injectIntl
)(DrawerMenu);