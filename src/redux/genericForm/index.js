//Action types
import Axios from "../../Axios";
import * as API from "redux/api";
import {LOV_LIMIT_PER_PAGE} from "constants/config";

const SET_ERROR_TO_GENERIC_FORM = "SET_ERROR_TO_GENERIC_FORM";
const ADD_ERROR_TO_GENERIC_FORM = "ADD_ERROR_TO_GENERIC_FORM";
const RESET_ERRORS_GENERIC_FORM = "RESET_ERRORS_GENERIC_FORM";
const SET_FORM_DATA_TO_GENERIC_FORM = "SET_FORM_DATA_TO_GENERIC_FORM";
const RESET_FORM_DATA_GENERIC_FORM = "RESET_FORM_DATA_GENERIC_FORM";
const ADD_DATA_TO_FORM_SELECTOR = "ADD_DATA_TO_FORM_SELECTOR";
const INCREMENT_PAGE_TO_FORM_SELECTOR = "INCREMENT_PAGE_TO_FORM_SELECTOR";
const DECREMENT_PAGE_TO_FORM_SELECTOR = "DECREMENT_PAGE_TO_FORM_SELECTOR";
const RESET_ALL_GENERIC_FORM = "RESET_ALL_GENERIC_FORM";

//Functions
export const getFormSelectorData = (id, key, page, sort) => {
  return async dispatch => {
    try {
      dispatch(addToFormSelector({ name: id, loading: true }));
      Axios.get(`${API[id]}?size=${LOV_LIMIT_PER_PAGE}&page=${page !== null? page:0}${sort? `&sort=${sort}`:""}`)
        .then(({data}) => data)
        .then(({ page, _embedded }) => {
          dispatch(addToFormSelector({
            name: id,
            loading: false,
            data: _embedded[key],
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

export function addToFormSelector(payload) {
  return {
    type: ADD_DATA_TO_FORM_SELECTOR,
    payload
  };
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

export function resetAllGenericForm() {
  return {
    type: RESET_ALL_GENERIC_FORM
  }
}

//Reducers
const initialState = {
  formErrors: {},
  formData: {},
  formSelectors: {}
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
    case ADD_DATA_TO_FORM_SELECTOR: {
      const {name, ...rest} = action.payload;
      return { ...state, formSelectors: {
        ...state.formSelectors,
        [name]: {...state.formSelectors[name], ...rest}
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
    case RESET_ALL_GENERIC_FORM:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};