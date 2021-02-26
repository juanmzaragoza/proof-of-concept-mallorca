import { combineReducers } from "redux";
import example from "redux/example/index.js";
import advancedFilters from "redux/advancedFilters/index.js";

export default combineReducers({
  example,
  advancedFilters
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}