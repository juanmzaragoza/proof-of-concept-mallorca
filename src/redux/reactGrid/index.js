import { remove as removeFrom } from "lodash";
import Axios from "Axios";
import * as API from "redux/api";
import { REACT_GRID_LIMIT_PER_PAGE } from "../../constants/config";
import { getFormedURL } from "../common";

//Action types
const ADD = "ADD_TO_REACT_GRID";
const REPLACE = "REPLACE_DATA_TO_REACT_GRID";
const REMOVE = "REMOVE_TO_REACT_GRID";
const APPEND = "APPEND_TO_REACT_GRID";
const RESET = "RESET_REACT_GRID";
const RESET_SPECIFIC_REACT_GRID = "RESET_SPECIFIC_REACT_GRID";

//Functions
export const searchData = ({
  apiId,
  method,
  body,
  key,
  page,
  query = [],
  sorting = [],
}) => {
  return async (dispatch) => {
    const formedURL = () => {
      return getFormedURL({
        id: apiId,
        size: REACT_GRID_LIMIT_PER_PAGE,
        page,
        sorting,
        query,
      });
    };
    const apiCall = () => {
      if (method && body) {
        return Axios[method](formedURL(), body);
      } else {
        return Axios.get(formedURL());
      }
    };
    const gridId = apiId;
    try {
      dispatch(add({ gridId, loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded, page }) => {
          dispatch(add({ gridId, data: _embedded ? _embedded[key] : [] }));
          dispatch(add({ gridId, totalCount: page.totalElements }));
          dispatch(add({ gridId, loading: false }));
          dispatch(add({ gridId, pageSize: REACT_GRID_LIMIT_PER_PAGE }));
        })
        .catch((error) => {
          dispatch(add({ gridId, loading: false }));
          error.response && handlePersistError({gridId,...error.response})(dispatch);
        })
        .finally(() => {
          dispatch(add({ gridId, loading: false }));
        });
    } catch (error) {
      dispatch(add({ gridId, loading: false }));
      dispatch(add({ gridId, errors: error }));
    }
  };
};

export const deleteData = ({ key, id }) => {
  const gridId = key;
  return async (dispatch) => {
    try {
      dispatch(add({ gridId, loading: true }));
      const queryString = `${API[key]}/${id}`;
      Axios.delete(queryString)
        .then(({ status, data, ...rest }) => {
          dispatch(remove({ gridId, id }));
          dispatch(add({ gridId, loading: false }));
        })
        .catch((error) => {
          dispatch(add({ gridId, loading: false }));
          error.response && handlePersistError({ gridId, ...error.response})(dispatch);
        });
    } catch (error) {
      dispatch(add({ gridId, loading: false }));
      dispatch(add({ gridId, errors: error }));
    }
  };
};

export const updateData = ({ key, id, data }) => {
  const gridId = key;
  return async (dispatch) => {
    try {
      dispatch(add({ gridId, loading: true }));
      const queryString = `${API[key]}/${id}`;
      Axios.put(queryString, JSON.stringify(data))
        .then(({ status, data, ...rest }) => {
          dispatch(replace({ gridId, id, ...data }));
          dispatch(add({ gridId, loading: false }));
        })
        .catch((error) => {
          dispatch(add({ loading: false }));
          error.response && handlePersistError({gridId, ...error.response})(dispatch);
        });
    } catch (error) {
      dispatch(add({ gridId, loading: false }));
      dispatch(add({ gridId, errors: error }));
    }
  };
};

export const createData = ({ key, data }) => {
  const gridId = key;
  return async (dispatch) => {
    try {
      dispatch(add({ gridId, loading: true }));
      const queryString = API[key];
      Axios.post(queryString, JSON.stringify(data))
        .then(({ status, data, ...rest }) => {
          dispatch(append({ gridId, ...data }));
          dispatch(add({ gridId, loading: false }));
        })
        .catch((error) => {
          dispatch(add({ gridId, loading: false }));
          error.response && handlePersistError({gridId, ...error.response})(dispatch);
        });
    } catch (error) {
      dispatch(add({ gridId, loading: false }));
      dispatch(add({ gridId, errors: error }));
    }
  };
}

const handlePersistError = ({ gridId, status, data }) => {
  return async (dispatch) => {
    if (status === 400 && data.errors) {
      const errors = {};
      for (const err of data.errors) {
        errors[err.field] = { message: err.defaultMessage };
      }
      dispatch(add({ gridId, errors }));
    }
  };
};

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload,
  };
};

export const replace = (payload) => {
  return {
    type: REPLACE,
    payload
  }
}

export const reset = () => {
  return {
    type: RESET,
  };
};

export const resetGrid = (payload) => {
  return {
    type: RESET_SPECIFIC_REACT_GRID,
    payload
  };
}

export const remove = (payload) => {
  return {
    type: REMOVE,
    payload,
  };
};

export const append = (payload) => {
  return {
    type: APPEND,
    payload,
  };
};

//Reducers
const oneInitialState = {
  data: [],
  page: 0,
  pageSize: REACT_GRID_LIMIT_PER_PAGE,
  totalCount: 10,
  loading: false,
  errors: {},
};
const initialState = {
  ['__default']: oneInitialState
}

export default (state = initialState, action) => {
  const { gridId = '__default', ...rest } = action.payload?? {};
  switch (action.type) {
    case ADD:
      return { ...state,
        [gridId]: {
          ...state[gridId],
          ...rest
        }};
    case REPLACE:
      const changedRows = state[gridId].data.map(row => row.id === rest.id? rest:row)
      return { ...state,
        [gridId]: {
          ...state[gridId],
          data: changedRows
        }};
    case REMOVE:
      const { id } = rest;
      return {
        ...state,
        [gridId]: {
          ...state[gridId],
          totalCount: state[gridId].totalCount - 1,
          data: removeFrom(state[gridId].data, (row) => row.id !== id),
      }};
    case APPEND:
      state[gridId].data.pop();
      const data = [rest].concat(state[gridId].data);
      return { ...state,
        [gridId]: {
          ...state[gridId],
          data: data
        }};
    case RESET_SPECIFIC_REACT_GRID:
      gridId && delete state[gridId];
      return state;
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
