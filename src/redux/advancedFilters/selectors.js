import { get } from "lodash";

export const getFilters = state => get(state, "advancedFilters.filters", {});
export const getValueByKey = state => (key) => get(state, `advancedFilters.filters[${key}]`);
