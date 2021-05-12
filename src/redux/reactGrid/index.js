import {remove as removeFrom} from 'lodash';
import Axios from "Axios";
import * as API from "redux/api";
import {REACT_GRID_LIMIT_PER_PAGE} from "../../constants/config";

//Action types
const ADD = "ADD_TO_REACT_GRID";
const REMOVE = "REMOVE_TO_REACT_GRID";
const RESET = "RESET_REACT_GRID";

//Functions
export const searchData = ({ apiId, key, page, query = [], sorting = [] }) => {
  return async dispatch => {
    const formedURL = () => {
      const pagination = `&page=${page !== null ? page : 0}`;
      const queryFilter = query.length > 0 ? `&query=${query.map(({ columnName, value }) => `${columnName}=ic=*${value.trim()}*`).join(';')}` : "";
      const sort = `&sort=${sorting.length > 0? sorting.map(({ columnName, direction }) => `${columnName},${direction}`).join(';'):"codi"}`;
      const URL = `${API[apiId]}?size=${REACT_GRID_LIMIT_PER_PAGE}${pagination}${queryFilter}${sort}`;
      return URL;
    }
    try {
      dispatch(add({ loading: true }));
      Axios
        .get(formedURL())
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch(add({ data: _embedded? _embedded[key]:[] }));
          dispatch(add({ totalCount: page.totalElements }));
          dispatch(add({ loading: false }));
          dispatch(add({ pageSize: REACT_GRID_LIMIT_PER_PAGE }));
        })
        .catch(error => {
          dispatch(add({ loading: false }));
          error.response && handlePersistError(error.response)(dispatch);
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
      dispatch(add({ errors: error }));
    }
  };
};

export const deleteData = ({ key, id }) => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      const queryString = `${API[key]}/${id}`;
      Axios.delete(queryString)
        .then(({status, data, ...rest}) => {
          dispatch(remove({ id }));
          dispatch(add({ loading: false }));
        })
        .catch(error => {
          dispatch(add({ loading: false }));
          error.response && handlePersistError(error.response)(dispatch);
        });
    } catch (error) {
      dispatch(add({ loading: false }));
      dispatch(add({ errors: error }));
    }
  }
}

const handlePersistError = ({status, data}) => {
  return async dispatch => {
    if (status === 400 && data.errors) {
      const errors = {};
      for (const err of data.errors) {
        errors[err.field] = {message: err.defaultMessage};
      }
      dispatch(add({ errors }));
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

export const reset = () => {
  return {
    type: RESET
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
  data: [],
  page: 0,
  pageSize: REACT_GRID_LIMIT_PER_PAGE,
  totalCount: 10,
  loading: false,
  errors: {},
};


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case REMOVE:
      const { id } = action.payload;
      return {
        ...state,
        totalCount: state.totalCount-1,
        data: removeFrom(state.data, (row) => row.id !== id)
      };
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};