//Action types
import Axios from "Axios";
import * as API from "../api";
import {removeKey, setPlainOn} from "../../helper/storage";
import {isUserAuthenticated} from "../../helper/login-helper";
import {TOKEN_LOCALSTORAGE_KEY} from "../../constants";

const ADD = "ADD_TO_APP";
const START_LOADING = "START_LOADING";
const FINISH_LOADING = "FINISH_LOADING";
const CLEAR_AFTER_AUTHENTICATION = "CLEAR_AFTER_AUTHENTICATION";

//Functions
export const authenticate = ({user, password}) => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      const URL = `${API.auth}?user=${user}&pass=${password}`;
      Axios.get(URL)
        .then(({status, data}) => {
          setPlainOn(TOKEN_LOCALSTORAGE_KEY,data.token);
          dispatch(add({ loading: false }));
          dispatch(add({ authenticated: true }));
        })
        .catch(error => {
          dispatch(add({ authenticationError: true }));
          dispatch(add({ authenticated: false }));
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
      dispatch(add({ authenticated: false }));
    }
  };
}

export const logout = () => {
  return async dispatch => {
    try {
      removeKey(TOKEN_LOCALSTORAGE_KEY);
      dispatch(add({ authenticated: false }));
    } catch (error) {
      dispatch(add({ authenticated: false }));
    }
  };
}

//Action creators
export function startLoading() {
  return {
    type: START_LOADING
  };
}

export function finishLoading() {
  return {
    type: FINISH_LOADING
  };
}

export function add(payload) {
  return {
    type: ADD,
    payload
  };
}

export function clearAfterAuthentication() {
  return {
    type: CLEAR_AFTER_AUTHENTICATION
  }
}

//Reducers
const initialState = {
  loading: false,
  authenticated: !!isUserAuthenticated(),
  authenticationError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case CLEAR_AFTER_AUTHENTICATION:
      return { ...state, authenticationError: false };
    case START_LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};