import Axios from "Axios";
import * as API from "redux/api";

//Action types
const SUBMIT = "SUBMIT_LOV_FORM";
const ADD_ERROR_LOV_FORM = "ADD_ERROR_LOV_FORM";
const SET_STATUS_ERROR_LOV_FORM = "SET_STATUS_ERROR_LOV_FORM";
const RESET = "RESET_LOV_FORM";

//Functions
export const submit = ({ id, data }) => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      Axios
        .post(`${API[id]}`, data)
        .then(response => {
          dispatch(add({ data: response.data }));
          dispatch(add({ loading: false }));
          dispatch(add({ created: true }));
        })
        .catch(error => {
          const {response} = error;
          if(response && response.data && response.data.message){
            const {status, data} = response;
            if (status === 400 && data.errors) {
              for (const err of data.errors) {
                dispatch(addError({[err.field]: {message: err.defaultMessage}}));
              }
            }
            dispatch(setStatusError(status));
          }
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
    }
  };
};

//Action creators
export const add = (payload) => {
  return {
    type: SUBMIT,
    payload
  };
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
  data: false,
  loading: false,
  created: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT:
      return { ...state, ...action.payload };
    case ADD_ERROR_LOV_FORM:
      return { ...state, errors: {...state.errors, data: {...state.errors.data, ...action.payload}}};
    case SET_STATUS_ERROR_LOV_FORM:
      return { ...state, errors: {...state.errors, status: action.payload}};
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
