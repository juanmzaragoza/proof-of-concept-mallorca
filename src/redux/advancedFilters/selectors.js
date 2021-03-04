import { get } from "lodash";

export const getFilters = state => get(state, "advancedFilters.filters", {});
