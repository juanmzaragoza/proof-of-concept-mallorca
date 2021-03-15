import { get } from "lodash";

export const getData = state => get(state, "lovForm.data", false);
export const getIsLoading = state => get(state, "lovForm.loading");
export const getIsCreated = state => get(state, "lovForm.created");
export const getErrors = state => get(state, "lovForm.errors", {});