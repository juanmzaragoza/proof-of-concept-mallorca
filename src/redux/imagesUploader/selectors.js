import { get } from "lodash";

export const getData = state => get(state, "imagesUploader.data", []);
export const getIsLoading = state => get(state, "imagesUploader.loading",false);
export const getIsLoadingOne = state => get(state, "imagesUploader.loadingOne",false);
export const getIsCreated = state => get(state, "imagesUploader.created",false);
export const getSelected = state => get(state, "imagesUploader.selected",null);
export const getErrors = state => get(state, "imagesUploader.errors", {});