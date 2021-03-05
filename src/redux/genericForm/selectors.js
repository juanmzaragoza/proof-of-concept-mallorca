import { get } from "lodash";

export const getFormErrors = state => get(state, "genericForm.formErrors", {});
