import { get } from "lodash";

export const getListingConfig = state => get(state, "pageHeader.listingConfig", false);
export const getFormConfig = state => get(state, "pageHeader.formConfig");
