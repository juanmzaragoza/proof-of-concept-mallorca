//import { config } from "./../base";
import axios from "axios";
import {getPlainFrom,clearAll} from "./helper/storage";
import {TOKEN_LOCALSTORAGE_KEY} from "./constants";
import SnackbarUtils from "./helper/snackbar-function";
import intl from "./helper/intl-function";

const Axios = axios.create();

const authToken = () => 'Bearer ' + getPlainFrom(TOKEN_LOCALSTORAGE_KEY);

//Axios.defaults.baseURL = config.apiRoot;
Axios.defaults.baseURL = 'http://10.35.3.192:8080/'
//'https://10.35.3.44:8083/';

Axios.interceptors.request.use(function (conf) {
  // Do something before request is sent
  conf.headers = {
    "Authorization": authToken(),
    "Content-Type": "application/json",
  }

  return conf;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const errorTypes = {
  401: () => {
    SnackbarUtils.error(intl.formatMessage({
      id: "Comun.error.sin_permisos",
      defaultMessage: "No posee los permisos suficientes ;("
    }));
  },
  403: () => {
    clearAll();
    window.location.href = '/login';
    SnackbarUtils.error(intl.formatMessage({
      id: "Comun.error.sesion_expirada",
      defaultMessage: "Sesión expirada! Vuelva a iniciar sesión."
    }));
  },
  500: () => {
    SnackbarUtils.error(intl.formatMessage({
      id: "Comun.error.error_interno",
      defaultMessage: "Ocurrió un error interno en el servicio X("
    }));
  },
  '_default': () => {
    SnackbarUtils.error(intl.formatMessage({
      id: "Comun.error.error_interno",
      defaultMessage: "Ocurrió un error interno en el servicio X("
    }));
  }
}
const solveError = (status) => {
  return errorTypes[status]? errorTypes[status]():errorTypes['_default']();
}

/** Handle errors */
let key;
Axios.interceptors.response.use(
  (response) => {
    SnackbarUtils.close(key);
    return response;
  },
  (error) => {
  if(error.message === 'Network Error'){
    // if there isn't a snackbar opened
    if(!key) {
      key = SnackbarUtils.error(intl.formatMessage({
        id: "Comun.error.error_de_red",
        defaultMessage: "Sin conexión!"
      }), true);
    }
  } else if(error.response){
    SnackbarUtils.close(key);
    const {status} = error.response;
    solveError(status);
  }
  return Promise.reject(error);
});

export default Axios;