import { get } from "lodash";

export const getListingConfig = state => get(state, "pageHeader.listingConfig", false);
export const getFormConfig = state => get(state, "pageHeader.formConfig");
export const getBreadcrumbs = state => get(state, "pageHeader.breadcrumbs");
export const getFireSave = state => get(state, "pageHeader.fireSave");
