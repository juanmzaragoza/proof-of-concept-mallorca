import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import ImagesUploader from "./ImagesUploader";
import {deleteData, searchData} from "redux/grids";

import {
  loadImage,
  loadImages,
  selectImage,
  uploadImage
} from "redux/imagesUploader";
import {
  getData,
  getIsLoading,
  getSelected
} from "redux/imagesUploader/selectors";

const mapStateToProps = (state, props) => {
  return {
    rows: getData(state),
    selected: getSelected(state),
    loading: getIsLoading(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(loadImages, dispatch),
    setImage: bindActionCreators(selectImage, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch),
    loadImage: bindActionCreators(loadImage, dispatch),
  };
  return { actions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesUploader);