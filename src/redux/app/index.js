//Action types
import Axios from "Axios";
import * as API from "../api";
import {clearAll, getPlainFrom, removeKey, setObjectOn, setPlainOn} from "../../helper/storage";
import {isUserAuthenticated} from "../../helper/login-helper";
import {SESSION_TO_REFRESH_LOCALSTORAGE_KEY, TOKEN_LOCALSTORAGE_KEY} from "../../constants";

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
          dispatch(add({ token: data.token }));
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
      clearAll();
      dispatch(add({ token: "" }));
      dispatch(add({ authenticated: false }));
    } catch (error) {
      dispatch(add({ token: "" }));
      dispatch(add({ authenticated: false }));
    }
  };
}

export const refresh = ({id, enterprise}) => {
  // session
  let session = {};
  if(id) session.i = id;
  if(enterprise) session.e = enterprise;
  // token
  const token = getPlainFrom(TOKEN_LOCALSTORAGE_KEY);
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      dispatch(add({ tokenRefreshed: false }));
      Axios.post(`${API.refresh}?timestamp=${new Date().getTime()}`,JSON.stringify({token, session}))
        .then(({data}) => {
          setPlainOn(TOKEN_LOCALSTORAGE_KEY,data.token);
          setObjectOn(SESSION_TO_REFRESH_LOCALSTORAGE_KEY, session);
          dispatch(add({ token: data.token }));
          dispatch(add({ loading: false }));
          dispatch(add({ authenticated: true }));
          dispatch(add({ tokenRefreshed: true }));
        })
        .catch(error => {
          dispatch(add({ authenticationError: true }));
          logout()(dispatch);
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    }catch (error) {
      removeKey(TOKEN_LOCALSTORAGE_KEY);
      dispatch(add({ loading: false }));
      dispatch(add({ authenticated: false }));
    }
  }
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
  token: getPlainFrom(TOKEN_LOCALSTORAGE_KEY),
  tokenRefreshed: false,
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