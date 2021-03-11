//Action types
const START_LOADING = "START_LOADING";
const FINISH_LOADING = "FINISH_LOADING";

//Functions

//Action creators
export function startLoading() {
  return {
    type: START_LOADING
  };
}

export function finishLoading() {
  return {
    type: FINISH_LOADING
  };
}

//Reducers
const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};