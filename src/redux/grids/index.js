import {remove as removeFrom} from 'lodash';
import Axios from "Axios";
import * as API from "redux/api";
import {EXPANDABLE_GRID_LIMIT_PER_PAGE} from "../../constants/config";

//Action types
const ADD = "ADD_TO_GRID";
const REMOVE = "REMOVE_TO_GRID";
const RESET = "RESET_GRID";
const UPDATE_ROW = "UPDATE_ROW_GRID";
const ADD_ROW = "ADD_ROW_GRID";

//Functions
export const searchData = ({ key, page, query = [], sorting = [] }) => {
  return async dispatch => {
    const formedURL = () => {
      const pagination = `&page=${page !== null ? page : 0}`;
      const queryFilter = query.length > 0 ? `&query=${query.map(({ columnName, value }) => `${columnName}==${value}`).join(';')}` : "";
      const sort = `&sort=${sorting.length > 0? sorting.map(({ columnName, direction }) => `${columnName},${direction}`).join(';'):"codi"}`;
      const URL = `${API[key]}?size=${EXPANDABLE_GRID_LIMIT_PER_PAGE}${pagination}${queryFilter}${sort}`;
      return URL;
    }
    try {
      dispatch(add({ key, loading: true }));
      Axios
        .get(formedURL())
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch(add({ key, data: _embedded? _embedded[key]:[] }));
          dispatch(add({ key, totalCount: page.totalElements }));
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, pageSize: EXPANDABLE_GRID_LIMIT_PER_PAGE }));
          dispatch(add({ key, refresh: false }));
        })
        .catch(error => {
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, errors: error.response? error.response:error }));
        })
        .finally(() => {
          dispatch(add({ key, loading: false }));
        });
    } catch (error) {
      dispatch(add({ key, loading: false }));
      dispatch(add({ key, errors: error }));
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
      dispatch(add({ key, errors: error }));
    }
  }
}

export const updateData = ({ key, id, data }) => {
  return async dispatch => {
    try {
      dispatch(add({ key, loading: true }));
      const URL = `${API[key]}/${id}`;
      Axios.put(URL,JSON.stringify(data))
        .then(({status, data, ...rest}) => {
          dispatch(update({key, data}));
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, updated: true }));
        })
        .catch(error => {
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, updated: false }));
          handlePersistError(key,error.response)(dispatch);
        })
        .finally(() => dispatch(add({ key, loading: false })));
    }catch (error) {
      dispatch(add({ key, loading: false }));
      dispatch(add({ key, updated: false }));
      dispatch(add({ key, errors: error }));
    }
  }
}

export const addData = ({ key, data }) => {
  return async dispatch => {
    try {
      dispatch(add({ key, loading: true }));
      Axios.post(API[key],JSON.stringify(data))
        .then(({status, data, ...rest}) => {
          dispatch(append({key, data}));
          dispatch(add({ key, loading: false }));
          dispatch(add({ key, created: true }));
      })
      .catch(error => {
        dispatch(add({ key, loading: false }));
        dispatch(add({ key, created: false }));
        handlePersistError(key,error.response)(dispatch);
      })
      .finally(() => dispatch(add({ key, loading: false })));
    }catch (error) {
      dispatch(add({ key, loading: false }));
      dispatch(add({ key, created: false }));
      dispatch(add({ key, errors: error }));
    }
  }
}

export const successfullyEdited = ({key}) => {
  return async dispatch => {
    dispatch(add({key, updated: false}));
    dispatch(add({key, created: false}));
    dispatch(add({key, errors: {}}));
  }
}

//TODO() refactor withAbmServices
const handlePersistError = (key,{status, data}) => {
  return async dispatch => {
    if (status === 400 && data.errors) {
      const errors = {};
      for (const err of data.errors) {
        errors[err.field] = {message: err.defaultMessage};
      }
      dispatch(add({key, errors}));
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

export const update = (payload) => {
  return {
    type: UPDATE_ROW,
    payload
  };
}

export const append = (payload) => {
  return {
    type: ADD_ROW,
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
    refresh: false, // when is true, it indicates that data is not updated
    created: false, // it's true when the data is successfully created -> both must be put to false before to start to editing
    updated: false // it's true when the data is successfully update
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
  const updateAction = () => {
    const {key} = action.payload;
    const updatedData = action.payload.data;
    const {data} = state[key];
    const changedRows = data.map(row => (updatedData.id === row.id ? { ...row, ...updatedData } : row));
    return {...state, [key]: {
      ...state[key],
      data: changedRows
    }};
  };
  const appendAction = () => {
    const {key, data} = action.payload;
    return {...state, [key]: {
        ...state[key],
        refresh: true
      }};
  };
  switch (action.type) {
    case ADD:
      return addAction();
    case REMOVE:
      return removeAction();
    case UPDATE_ROW:
      return updateAction();
    case ADD_ROW:
      return appendAction();
    case RESET:
      return {...state, [action.payload]: state.__default};
    case "RESET":
      return initialState;
    default:
      return state;
  }
};