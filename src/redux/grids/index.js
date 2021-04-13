import {remove as removeFrom} from 'lodash';
import Axios from "Axios";
import * as API from "redux/api";
import {EXPANDABLE_GRID_LIMIT_PER_PAGE} from "../../constants/config";

//Action types
const ADD = "ADD_TO_GRID";
const REMOVE = "REMOVE_TO_GRID";
const RESET = "RESET_GRID";

//Functions
export const searchData = ({ key, page }) => {
  return async dispatch => {
    const formedURL = () => {
      const pagination = `&page=${page !== null ? page : 0}`;
      const URL = `${API[key]}&size=${EXPANDABLE_GRID_LIMIT_PER_PAGE}${pagination}`;
      return URL;
    }
    try {
      dispatch(add({ key, loading: true }));
      Axios
        .get(formedURL())
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch(add({ key, page }));
          dispatch(add({ key, data: _embedded[key] }));
          dispatch(add({ key, totalCount: page.totalElements }));
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, pageSize: EXPANDABLE_GRID_LIMIT_PER_PAGE }));
        })
        .catch(error => {
          dispatch(add({ key, loading: false }));
        })
        .finally(() => {
          dispatch(add({ key, loading: false }));
        });
    } catch (error) {
      dispatch(add({ key, loading: false }));
    }
  };
};

export const deleteData = ({ key, id }) => {
  return async dispatch => {
    try {
      dispatch(add({ key, loading: true }));
      //TODO() do delete from API
      setTimeout(()=>{
        dispatch(remove({key, id}));
        dispatch(add({ key, loading: false }));
      },2000);
    } catch (error) {
      dispatch(add({ key, loading: false }));
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

export const reset = (key) => {
  return {
    type: RESET,
    payload: key
  };
}

export const remove = (payload) => {
  return {
    type: REMOVE,
    payload
  };
}

//Reducers
const initialState = {
  __default: {
    data: false,
    page: 0,
    pageSize: EXPANDABLE_GRID_LIMIT_PER_PAGE,
    totalCount: 10,
    loading: false,
    errors: {},
  }
};


export default (state = initialState, action) => {
  const addAction = () => {
    const {key, ...rest} = action.payload;
    return { ...state, [key]: {...state[key],...rest} };
  };
  const removeAction = () => {
    const {key, id} = action.payload;
    const {data} = state[key];
    return { ...state, [key]: {
      ...state[key],
      totalCount: state[key].totalCount-1,
      data: removeFrom(data, (row) => row.id !== id),
    }};
  }
  switch (action.type) {
    case ADD:
      return addAction();
    case REMOVE:
      return removeAction();
    case RESET:
      return {...state, [action.payload]: state.__default};
    case "RESET":
      return initialState;
    default:
      return state;
  }
};