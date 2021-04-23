import { get } from "lodash";

export const getLoading = state => get(state, "modules.loading", false);
export const getModules = state => get(state, "modules.modules", []);