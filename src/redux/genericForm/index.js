//Action types
import Axios from "../../Axios";
import * as API from "redux/api";

const SET_ERROR_TO_GENERIC_FORM = "SET_ERROR_TO_GENERIC_FORM";
const ADD_ERROR_TO_GENERIC_FORM = "ADD_ERROR_TO_GENERIC_FORM";
const RESET_ERRORS_GENERIC_FORM = "RESET_ERRORS_GENERIC_FORM";
const SET_FORM_DATA_TO_GENERIC_FORM = "SET_FORM_DATA_TO_GENERIC_FORM";
const RESET_FORM_DATA_GENERIC_FORM = "RESET_FORM_DATA_GENERIC_FORM";
const ADD_DATA_TO_FORM_SELECTOR = "ADD_DATA_TO_FORM_SELECTOR";

//Functions
export const getFormSelectorData = (id, key) => {
  return async dispatch => {
    try {
      dispatch(addToFormSelector({ name: id, loading: true }));
      Axios.get(API[id])
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(addToFormSelector({ name: id, loading: false, data: _embedded[key] }));
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
    case "RESET":
      return initialState;
    default:
      return state;
  }
};