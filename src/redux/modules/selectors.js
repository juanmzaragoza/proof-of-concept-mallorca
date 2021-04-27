import { get } from "lodash";

export const getLoading = state => get(state, "modules.loading", false);
export const getModules = state => get(state, "modules.modules", []);
export const getLoadingFunctionalities = state => get(state, "modules.functionalities.loading", false);
export const getAllowedFunctionalities = state => get(state, "modules.functionalities.allowed", []);
export const getSelectedModule = state => get(state, "modules.functionalities.selectedModule", "");