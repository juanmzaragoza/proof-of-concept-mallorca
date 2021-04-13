import { get } from "lodash";

export const getDataLoadingByKey = (state, key) => get(state, `grids[${key}].loading`, false);
export const getRowsByKey = (state, key) => get(state, `grids[${key}].data`, []);
export const getTotalCountByKey = (state, key) => get(state, `grids[${key}].totalCount`, 0);
export const getLoadingByKey = (state, key) => get(state, `grids[${key}].loading`, false);
export const getPageSizeByKey = (state, key) => get(state, `grids[${key}].pageSize`, 0);