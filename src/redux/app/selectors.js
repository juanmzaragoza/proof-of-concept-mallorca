import { get } from "lodash";

export const getLoading = state => get(state, "app.loading", {});
export const getAuthenticated = state => get(state, "app.authenticated", false);
export const getAuthenticationError = state => get(state, "app.authenticationError", {});
export const getLoggedInUserToken = state => get(state, "app.token", {});