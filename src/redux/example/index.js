import axios from "axios";
import * as API from "redux/api";

//Action types
const SUBMIT = "SUBMIT_EMAIL";

//Functions
export const submit = ({ name, mail, phone, offerPostLogSetId }) => {
  return async dispatch => {
    try {
      dispatch(add({ loading: true }));
      axios
        .post(API.suppliersFamily, {
          Email: mail,
          OfferPostLogSetId: offerPostLogSetId,
          Phone: phone,
          Name: name
        })
        .then(response => {
          dispatch(add({ data: response.data }));
          dispatch(add({ loading: false }));
          dispatch(add({ loaded: true }));
        })
        .catch(error => {})
        .finally(() => {
          dispatch(add({ loading: false }));
          dispatch(add({ loaded: true }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
    }
  };
};

//Action creators
export function add(payload) {
  return {
    type: SUBMIT,
    payload
  };
}

//Reducers
const initialState = {
  data: false,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT:
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
