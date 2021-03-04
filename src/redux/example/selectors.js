import { get } from "lodash";

export const getData = state => get(state, "email.data", false);
export const getIsLoading = state => get(state, "email.loading");
export const getIsLoaded = state => get(state, "email.loaded");
