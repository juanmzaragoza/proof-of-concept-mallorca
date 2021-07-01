import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import ImagesUploader from "./ImagesUploader";

import {
  changeImage,
  deleteImage,
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
    loadImage: bindActionCreators(loadImage, dispatch),
    deleteImage: bindActionCreators(deleteImage, dispatch),
    changeImage: bindActionCreators(changeImage, dispatch),
  };
  return { actions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesUploader);