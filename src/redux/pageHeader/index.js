//Action types
const SET_LISTING_CONFIG = "SET_LISTING_CONFIG";
const SET_FORM_CONFIG = "SET_FORM_CONFIG";
const RESET_FILTERS = "RESET_ADVANCED_FILTERS";

//Functions

//Action creators
export function setListingConfig(payload) {
  return {
    type: SET_LISTING_CONFIG,
    payload
  }
}

export function setFormConfig(payload) {
  return {
    type: SET_FORM_CONFIG,
    payload
  }
}

//Reducers
const initialState = {
  listingConfig: false,
  formConfig: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING_CONFIG:
      return { ...state, formConfig: false, listingConfig: {...action.payload} };
    case SET_FORM_CONFIG:
      return { ...state, formConfig: {...action.payload}, listingConfig: false };
    case RESET_FILTERS:
      return { filters: {} };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};