import { get } from "lodash";

export const getFormErrors = state => get(state, "genericForm.formErrors", {});
export const getFormData = state => get(state, "genericForm.formData", {});
export const getFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}]`, {});
export const getLoadingFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].loading`, false);
export const getDataFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].data`, []);