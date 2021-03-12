import Axios from "Axios";
import * as API from "redux/api";

//Action types
const SUBMIT = "SUBMIT_LOV_FORM";
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
          //TODO() do something with errors
        })
        .finally(() => {
          dispatch(add({ loading: false }));
          dispatch(add({ created: true }));
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

export const reset = () => {
  return {
    type: RESET
  };
}

//Reducers
const initialState = {
  data: false,
  loading: false,
  created: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT:
      return { ...state, ...action.payload };
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
