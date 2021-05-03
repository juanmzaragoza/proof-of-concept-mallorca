import { get } from "lodash";

export const getRows = (state) => get(state, `reactGrid.data`, []);
export const getTotalCount = (state) => get(state, `reactGrid.totalCount`, 0);
export const getLoading = (state) => get(state, `reactGrid.loading`, false);
export const getPageSize = (state) => get(state, `reactGrid.pageSize`, 0);
export const getErrors = (state) => get(state, `reactGrid.errors`, {});