//Action types
import Axios from "Axios";
import * as API from "../api";
import {removeKey, setPlainOn} from "../../helper/storage";
import {SELECTED_MODULE_LOCALSTORAGE_KEY} from "../../constants";

const ADD = "ADD_TO_MODULE";
const ADD_FUNCTIONALITIES = "ADD_TO_FUNCTIONALITIES";
const RESET_FUNCTIONALITIES = "RESET_FUNCTIONALITIES";

//Functions
export const searchModules = () => {
  removeKey(SELECTED_MODULE_LOCALSTORAGE_KEY);
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      Axios.get(`${API.moduleUrl}`)
        .then(({status, data}) => {
          dispatch(add({ loading: false }));
          dispatch(add({ modules: data }));
          dispatch(clearFunctionalities());
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

export const loadModule = (name) => {
  return async dispatch => {
    try {
      dispatch(addFunctionalities({ selectedModule: name}));
      dispatch(addFunctionalities({ loading: true }));
      Axios.get(`${API.functionalities}/${name}`)
        .then(({status, data}) => {
          dispatch(addFunctionalities({ loading: false }));
          dispatch(addFunctionalities({ allowed: data }));
          setPlainOn(SELECTED_MODULE_LOCALSTORAGE_KEY,name);
        })
        .catch(error => {
          dispatch(addFunctionalities({ loading: false }));
        })
        .finally(() => {
          dispatch(addFunctionalities({ loading: false }));
        });
    } catch (error) {
      dispatch(addFunctionalities({ loading: false }));
    }
  }
}

//Action creators
export function add(payload) {
  return {
    type: ADD,
    payload
  };
}

export function addFunctionalities(payload) {
  return {
    type: ADD_FUNCTIONALITIES,
    payload
  };
}

export function clearFunctionalities() {
  return {
    type: RESET_FUNCTIONALITIES
  }
}

//Reducers
const initialState = {
  loading: false,
  modules: [],
  functionalities: {
    loading: false,
    selectedModule: "",
    allowed: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case ADD_FUNCTIONALITIES:
      return { ...state, functionalities: {...state.functionalities, ...action.payload }};
    case RESET_FUNCTIONALITIES:
      return { ...state, functionalities: initialState.functionalities };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};