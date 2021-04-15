import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import ExpandableGrid from "./ExpandableGrid";
import {deleteData, searchData} from "redux/grids";
import {
  getRowsByKey,
  getTotalCountByKey,
  getLoadingByKey,
  getPageSizeByKey,
  getRefreshByKey
} from "redux/grids/selectors";

const mapStateToProps = (state, props) => {
  return {
    rows: getRowsByKey(state, props.id),
    totalCount: getTotalCountByKey(state, props.id),
    loading: getLoadingByKey(state, props.id),
    pageSize: getPageSizeByKey(state, props.id),
    refreshData: getRefreshByKey(state, props.id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(searchData, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch),
  };
  return { actions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandableGrid);
