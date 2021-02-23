import { combineReducers } from "redux";
import example from "redux/example/index.js";

export default combineReducers({
  example
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}