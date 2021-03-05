import { get } from "lodash";

export const getLoading = state => get(state, "app.loading", {});
