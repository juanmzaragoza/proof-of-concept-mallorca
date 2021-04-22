import { get } from "lodash";

export const getLoading = state => get(state, "enterpriseGroup.loading", false);
export const getTree = state => get(state, "enterpriseGroup.tree", []);