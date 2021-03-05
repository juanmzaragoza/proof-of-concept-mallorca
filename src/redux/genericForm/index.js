//Action types
const SET_ERROR_TO_GENERIC_FORM = "SET_ERROR_TO_GENERIC_FORM";
const ADD_ERROR_TO_GENERIC_FORM = "ADD_ERROR_TO_GENERIC_FORM";
const RESET_ERRORS_GENERIC_FORM = "RESET_ERRORS_GENERIC_FORM";
const SET_FORM_DATA_TO_GENERIC_FORM = "SET_FORM_DATA_TO_GENERIC_FORM";
const RESET_FORM_DATA_GENERIC_FORM = "RESET_FORM_DATA_GENERIC_FORM";

//Functions

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

//Reducers
const initialState = {
  formErrors: {},
  formData: {}
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
      return { ...state, formData: {} };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};