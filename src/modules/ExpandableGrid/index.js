import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import ExpandableGrid from "./expandableGrid";
import {searchData} from "redux/grids";
import {
  getRowsByKey,
  getDataLoadingByKey
} from "redux/api/selectors";

const mapStateToProps = (state, props) => {
  return {
    dataLoading: getDataLoadingByKey(state, props.id),
    rows: getRowsByKey(state, props.id)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(searchData, dispatch)
  };
  return { actions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandableGrid);
