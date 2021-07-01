import Axios from "Axios";
import * as API from "redux/api";
import {EXPANDABLE_GRID_LIMIT_PER_PAGE} from "../../constants/config";

//Action types
const ADD = "ADD_IMAGES_UPLOADER";
const SELECT_IMAGE = "SELECT_IMAGE";
const ADD_TO_SELECTED_IMAGE = "ADD_TO_SELECTED_IMAGE";
const RESET = "RESET_IMAGES_UPLOADER";
const ADD_ERROR_LOV_FORM = "ADD_ERROR_LOV_FORM";
const SET_STATUS_ERROR_LOV_FORM = "SET_STATUS_ERROR_LOV_FORM";

//Functions
export const loadImages = ({ key, id, data }) => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      Axios
        .get(`api/ecom/articlesInformacio`)
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch(add({ data: _embedded.articleInformacios }));
          dispatch(add({ totalCount: page.totalElements }));
          dispatch(add({ loading: false }));
          dispatch(add({ pageSize: EXPANDABLE_GRID_LIMIT_PER_PAGE }));
        })
        .catch(error => {
          dispatch(add({ loading: false }));
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
    }
  };
};

export const uploadImage = ({ file, id }) => {
  return async dispatch => {
    dispatch(add({ loading: true }));
    try {
      const formData = new FormData();
      formData.append('image', file);
      Axios.post(`api/ecom/articlesInformacio/saveImage/${id}`, formData, {
        headers: new Headers({
          'enctype': "multipart/form-data",
          'responseType': 'blob'
        }),
      })
        .then(({status, data, ...rest}) => {
          dispatch(add({ loading: false }));
        })
        .catch(error => {
          console.log(error);
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(add({loading: false}));
    }
  }
}

export const loadImage = ({ key, rutaInforme }) => {
  return async dispatch => {
    try {
      Axios
        .get(`api/ecom/articlesInformacio/loadImage/${rutaInforme}`,{
          responseType: 'blob'
        })
        .then(({data}) => {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            dispatch(addToSelected({ file: reader.result }));
          }, false);
          if (data) {
            reader.readAsDataURL(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteImage = ({ key, id }) => {
  return async dispatch => {
    dispatch(add({ loading: true }));
    try {
      Axios.get(`api/ecom/articlesInformacio/deleteRow/${id}`)
        .then(({status, data, ...rest}) => {
          dispatch(add({ loading: false }));
        })
        .catch(error => {
          console.log(error);
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
      dispatch(add({ errors: error }));
    }
  }
}

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

export const selectImage = (payload) => {
  return {
    type: SELECT_IMAGE,
    payload
  }
}

export const addToSelected = (payload) => {
  return {
    type: ADD_TO_SELECTED_IMAGE,
    payload
  }
}

export const addError = (payload) => {
  return {
    type: ADD_ERROR_LOV_FORM,
    payload
  };
}

export const setStatusError = (payload) => {
  return {
    type: SET_STATUS_ERROR_LOV_FORM,
    payload
  };
}

export const reset = () => {
  return {
    type: RESET
  };
}

//Reducers
const initialState = {
  data: [],
  loading: false,
  created: false,
  selected: null,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case SELECT_IMAGE:
      const selected = action.payload?.id === state.selected?.id? null:action.payload;
      return {...state, selected};
    case ADD_ERROR_LOV_FORM:
      return { ...state, errors: {...state.errors, data: {...state.errors.data, ...action.payload}}};
    case SET_STATUS_ERROR_LOV_FORM:
      return { ...state, errors: {...state.errors, status: action.payload}};
    case ADD_TO_SELECTED_IMAGE:
      const {file} = action.payload;
      return { ...state, selected: {...state.selected, file } };
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
