import { get } from "lodash";

export const getLoading = state => get(state, "modules.loading", false);
export const getTree = state => get(state, "modules.tree", []);