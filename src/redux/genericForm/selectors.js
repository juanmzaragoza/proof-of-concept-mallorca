import { get } from "lodash";

export const getFormErrors = state => get(state, "genericForm.formErrors", {});
export const getFormData = state => get(state, "genericForm.formData", {});
export const getFormDataByKey = (state) => (key) => get(state, `genericForm.formData[${key}]`);
export const getFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}]`, {});
export const getLoadingFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].loading`, false);
export const getDataFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].data`, []);
export const getPageFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].page.number`, null);
export const getTotalPagesFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].page.totalPages`, null);
export const getQuerySearchFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].querySearch`, null);
export const getRefreshFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].refresh`, false);
export const getQueryFormSelectorById = (state, id) => get(state, `genericForm.formSelectors[${id}].query`, []);
export const getIsDataLoaded = state => get(state, "genericForm.loaded", false);