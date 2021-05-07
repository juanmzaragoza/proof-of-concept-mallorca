import {unionWith, isEqual} from "lodash";
import Axios from "../../Axios";
import * as API from "redux/api";
import {LOV_LIMIT_PER_PAGE} from "constants/config";

//Action types
const SET_ERROR_TO_GENERIC_FORM = "SET_ERROR_TO_GENERIC_FORM";
const ADD_ERROR_TO_GENERIC_FORM = "ADD_ERROR_TO_GENERIC_FORM";
const RESET_ERRORS_GENERIC_FORM = "RESET_ERRORS_GENERIC_FORM";
const SET_FORM_DATA_TO_GENERIC_FORM = "SET_FORM_DATA_TO_GENERIC_FORM";
const ADD_FORM_DATA_TO_GENERIC_FORM = "ADD_FORM_DATA_TO_GENERIC_FORM";
const SET_DATA_LOADED = "SET_DATA_LOADED";
const RESET_FORM_DATA_GENERIC_FORM = "RESET_FORM_DATA_GENERIC_FORM";
const ADD_DATA_TO_FORM_SELECTOR = "ADD_DATA_TO_FORM_SELECTOR";
const APPEND_DATA_TO_FORM_SELECTOR = "APPEND_DATA_TO_FORM_SELECTOR";
const INCREMENT_PAGE_TO_FORM_SELECTOR = "INCREMENT_PAGE_TO_FORM_SELECTOR";
const DECREMENT_PAGE_TO_FORM_SELECTOR = "DECREMENT_PAGE_TO_FORM_SELECTOR";
const SEARCH_BY_TERM_FORM_FORM_SELECTOR = "SEARCH_BY_TERM_FORM_FORM_SELECTOR";
const RESET_ALL_GENERIC_FORM = "RESET_ALL_GENERIC_FORM";
const REFRESH_A_FORM_SELECTOR = "REFRESH_A_FORM_SELECTOR";
const SET_QUERY_FORM_SELECTOR = "SET_QUERY_FORM_SELECTOR";

//Functions
export const getFormSelectorData = ({id, key, page, sort, search, query = []}) => {
  return async dispatch => {
    const formedURL = () => {
      const pagination = `&page=${page !== null ? page : 0}`;
      const sorting = sort ? `&sort=${sort}` : "";
      const quickFilter = search && search !== "" ? `&quickFilter=${search}` : "";
      const searchQuery = query.length > 0 ? `&query=${query.map(({ columnName, value }) => `${columnName}=ic=*${value}*`).join(';')}` : "";
      const URL = `${API[id]}?size=${LOV_LIMIT_PER_PAGE}${pagination}${sorting}${quickFilter}${searchQuery}`;
      return URL;
    }
    try {
      dispatch(addToFormSelector({ name: id, loading: true }));
      const URL = formedURL();
      Axios.get(URL)
        .then(({data}) => data)
        .then(({ page, _embedded }) => {
          dispatch(addToFormSelector({
            name: id,
            loading: false,
            data: _embedded? _embedded[key]:[],
            page
          }));
        })
        .catch(() => {
          dispatch(addToFormSelector({ name: id, loading: false }));
        });
    } catch (error) {
      dispatch(addToFormSelector({ loading: false }));
    }
  };
};

export const getFormSelectorDataById = ({id, identifier}) => {
  return async dispatch => {
    try {
      const URL = `${API[id]}/${identifier}`;
      dispatch(addToFormSelector({ name: id, loading: true }));
      Axios.get(URL)
        .then(({data}) => data)
        .then((data) => {
          dispatch(appendDataToFormSelector({name: id, data}));
          dispatch(addToFormSelector({name: id, loading: false}));
        })
        .catch(() => {
          dispatch(addToFormSelector({ name: id, loading: false }));
        });
    } catch (error) {
      dispatch(addToFormSelector({ loading: false }));
    }
  }
}

//Action creators
export function addError(payload) {
  return {
    type: ADD_ERROR_TO_GENERIC_FORM,
    payload
  };
}

export function resetError() {
  return {
    type: RESET_ERRORS_GENERIC_FORM
  };
}

export function setFormData(payload) {
  return {
    type: SET_FORM_DATA_TO_GENERIC_FORM,
    payload
  };
}

export function setFormDataByKey(payload) {
  return {
    type: ADD_FORM_DATA_TO_GENERIC_FORM,
    payload
  };
}

export function addToFormSelector(payload) {
  return {
    type: ADD_DATA_TO_FORM_SELECTOR,
    payload
  };
}

export function appendDataToFormSelector(payload) {
  return {
    type: APPEND_DATA_TO_FORM_SELECTOR,
    payload
  }
}

export function incrementPageToFormSelector(payload) {
  return {
    type: INCREMENT_PAGE_TO_FORM_SELECTOR,
    payload
  };
}

export function decrementPageToFormSelector(payload) {
  return {
    type: DECREMENT_PAGE_TO_FORM_SELECTOR,
    payload
  };
}

export function searchByQueryTerm(payload){
  return {
    type: SEARCH_BY_TERM_FORM_FORM_SELECTOR,
    payload
  };
}

export function refreshAFormSelector(payload){
  return {
    type: REFRESH_A_FORM_SELECTOR,
    payload
  };
}

export function setQueryFromSelector(payload){
  return {
    type: SET_QUERY_FORM_SELECTOR,
    payload
  }
}

export function resetAllGenericForm() {
  return {
    type: RESET_ALL_GENERIC_FORM
  }
}

export function setDataLoaded() {
  return {
    type: SET_DATA_LOADED
  }
}

//Reducers
const initialState = {
  formErrors: {},
  formData: {},
  formSelectors: {},
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR_TO_GENERIC_FORM:
      return { ...state, formErrors: {...state.formErrors, ...action.payload} };
    case SET_ERROR_TO_GENERIC_FORM:
      return { ...state, formErrors: {...action.payload} };
    case RESET_ERRORS_GENERIC_FORM:
      return { ...state, formErrors: {} };
    case SET_FORM_DATA_TO_GENERIC_FORM:
      return { ...state, formData: action.payload };
    case RESET_FORM_DATA_GENERIC_FORM: {
      return {...state, formData: {}};
    }
    case ADD_FORM_DATA_TO_GENERIC_FORM:
      const {key, value} = action.payload;
      return { ...state, formData: {...state.formData,[key]: value }};
    case SET_DATA_LOADED:
      return { ...state, loaded: true};
    case ADD_DATA_TO_FORM_SELECTOR: {
      const {name, ...rest} = action.payload;
      return { ...state, formSelectors: {
        ...state.formSelectors,
        [name]: {...state.formSelectors[name], ...rest}
      }};
    }
    case APPEND_DATA_TO_FORM_SELECTOR: {
      const {name, data} = action.payload;
      return { ...state, formSelectors: {
        ...state.formSelectors,
        [name]: {...state.formSelectors[name], data: unionWith(state.formSelectors[name].data, [data], isEqual)}
      }};
    }
    case INCREMENT_PAGE_TO_FORM_SELECTOR: {
      const name = action.payload;
      return { ...state, formSelectors: {
          ...state.formSelectors,
          [name]: {...state.formSelectors[name], page: {...state.formSelectors[name].page, number: state.formSelectors[name].page.number+1}}
        }};
    }
    case DECREMENT_PAGE_TO_FORM_SELECTOR: {
      const name = action.payload;
      return { ...state, formSelectors: {
          ...state.formSelectors,
          [name]: {...state.formSelectors[name], page: {...state.formSelectors[name].page, number: state.formSelectors[name].page.number-1}}
        }};
    }
    case SEARCH_BY_TERM_FORM_FORM_SELECTOR: {
      const {name, text} = action.payload;
      return { ...state, formSelectors: {
          ...state.formSelectors,
          [name]: {...state.formSelectors[name], querySearch: text}
        }};
    }
    case REFRESH_A_FORM_SELECTOR: {
      const {name, refresh} = action.payload;
      return { ...state, formSelectors: {
          ...state.formSelectors,
          [name]: {...state.formSelectors[name], refresh}
        }};
    }
    case SET_QUERY_FORM_SELECTOR: {
      const {name, query} = action.payload;
      return { ...state, formSelectors: {
          ...state.formSelectors,
          [name]: {...state.formSelectors[name], query}
        }};
    }
    case RESET_ALL_GENERIC_FORM:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};