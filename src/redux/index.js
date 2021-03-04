import { combineReducers } from "redux";
import example from "redux/example/index.js";
import advancedFilters from "redux/advancedFilters/index.js";
import pageHeader from "redux/pageHeader/index.js";

export default combineReducers({
  example,
  advancedFilters,
  pageHeader
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}