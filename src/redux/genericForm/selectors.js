import { get } from "lodash";

export const getFormErrors = state => get(state, "genericForm.formErrors", {});
export const getFormData = state => get(state, "genericForm.formData", {});