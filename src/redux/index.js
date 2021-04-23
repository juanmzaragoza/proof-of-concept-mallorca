import { combineReducers } from "redux";
import example from "redux/example/index.js";
import advancedFilters from "redux/advancedFilters/index.js";
import pageHeader from "redux/pageHeader/index.js";
import genericForm from "redux/genericForm/index.js";
import app from "redux/app/index.js";
import lovForm from "redux/lovForm/index.js";
import grids from "redux/grids/index";
import enterpriseGroup from "redux/enterpriseGroup/index";
import modules from "redux/modules/index";

export default combineReducers({
  app,
  example,
  advancedFilters,
  pageHeader,
  genericForm,
  lovForm,
  grids,
  enterpriseGroup,
  modules
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}