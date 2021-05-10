//import { config } from "./../base";
import axios from "axios";
import {getPlainFrom,clearAll} from "./helper/storage";
import {TOKEN_LOCALSTORAGE_KEY} from "./constants";

const Axios = axios.create();

const authToken = () => 'Bearer ' + getPlainFrom(TOKEN_LOCALSTORAGE_KEY);

//Axios.defaults.baseURL = config.apiRoot;
Axios.defaults.baseURL = 'https://10.35.3.44:8083/';

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
//TODO(): check this https://medium.com/neyasistechnology/react-handling-errors-with-axios-interceptor-and-redux-6e523fda3706

export default Axios;