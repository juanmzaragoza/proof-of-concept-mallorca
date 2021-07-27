//Action types
const SET_LISTING_CONFIG = "SET_LISTING_CONFIG";
const SET_FORM_CONFIG = "SET_FORM_CONFIG";
const RESET_ALL_HEADER = "RESET_ALL_HEADER";
const SET_BREADCRUMB_HEADER = "SET_BREADCRUMB_HEADER";
export const SET_FIRE_SAVE_FROM_HEADER = "SET_FIRE_SAVE_FROM_HEADER";

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

export function setBreadcrumbHeader(payload){
  return {
    type: SET_BREADCRUMB_HEADER,
    payload
  }
}

export function setFireSaveFromHeader(payload){
  return {
    type: SET_FIRE_SAVE_FROM_HEADER,
    payload
  }
}

export function resetHeaders() {
  return {
    type: RESET_ALL_HEADER
  }
}

//Reducers
const initialState = {
  listingConfig: false,
  formConfig: false,
  fireSave: false,
  breadcrumbs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING_CONFIG:
      return { ...state, formConfig: false, listingConfig: {...action.payload} };
    case SET_FORM_CONFIG:
      return { ...state, formConfig: {...action.payload}, listingConfig: false };
    case SET_BREADCRUMB_HEADER:
      return { ...state, breadcrumbs: action.payload };
    case SET_FIRE_SAVE_FROM_HEADER:
      return { ...state, fireSave: action.payload };
    case RESET_ALL_HEADER:
      return initialState;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};