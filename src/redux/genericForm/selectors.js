import { get } from "lodash";

export const getErrors = state => get(state, "genericForm.formErrors", {});
