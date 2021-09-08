import { get } from "lodash";

export const getRows = (state, gridId) => get(state, `reactGrid[${gridId}].data`, []);
export const getTotalCount = (state, gridId) => get(state, `reactGrid[${gridId}].totalCount`, 0);
export const getLoading = (state, gridId) => get(state, `reactGrid[${gridId}].loading`, false);
export const getPageSize = (state, gridId) => get(state, `reactGrid[${gridId}].pageSize`, 0);
export const getErrors = (state, gridId) => get(state, `reactGrid[${gridId}].errors`, {});