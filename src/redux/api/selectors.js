import { get } from "lodash";

export const getDataLoadingByKey = (state, key) => get(state, `grids[${key}].loading`, false);
export const getRowsByKey = (state, key) => get(state, `grids[${key}].data`, []);