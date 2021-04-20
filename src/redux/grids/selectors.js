import { get } from "lodash";

export const getRowsByKey = (state, key) => get(state, `grids[${key}].data`, []);
export const getTotalCountByKey = (state, key) => get(state, `grids[${key}].totalCount`, 0);
export const getLoadingByKey = (state, key) => get(state, `grids[${key}].loading`, false);
export const getPageSizeByKey = (state, key) => get(state, `grids[${key}].pageSize`, 0);
export const getRefreshByKey = (state, key) => get(state, `grids[${key}].refresh`, false);
export const getIsCreatedByKey = (state, key) => get(state, `grids[${key}].created`, false);
export const getIsUpdatedByKey = (state, key) => get(state, `grids[${key}].updated`, false);
export const getErrorsByKey = (state, key) => get(state, `grids[${key}].errors`, {});