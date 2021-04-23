//Action types
import Axios from "Axios";
import * as API from "../api";

const ADD = "ADD_TO_MODULE";

//Functions
export const searchModules = () => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      Axios.get(`${API.moduleUrl}`)
        .then(({status, data}) => {
          dispatch(add({ loading: false }));
          dispatch(add({ modules: data }));
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
}

//Action creators
export function add(payload) {
  return {
    type: ADD,
    payload
  };
}

//Reducers
const initialState = {
  loading: false,
  modules: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};