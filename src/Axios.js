//import { config } from "./../base";
import axios from "axios";
//import { getPlainFrom } from "../helpers/storage";

const Axios = axios.create();

//const authToken = () => 'Bearer ' + getPlainFrom('token');
const authToken = () => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjZWNvY2xvdWQiLCJhdWQiOiJhdXRoIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MTQ4Nzg0MzksIm5hbWUiOiJBZG1pbmlzdHJhZG9yIEFkbWluIiwiZW1haWwiOiJhZG1pbkBsaW1pdC5lcyIsInJleHAiOjE2MTc0NjY4MzksInJvbCI6WyJBRE1JTiJdLCJzZXNzaW9uIjp7ImkiOjQ0MywiZSI6OTg1fX0.huD63zbSPnPpzPs7C6FtyFUjrJ5tyVV6FhZqP7l3IA5NSriZIlTxh4XJovMgO8AFZxmQthoVylPHQ1f-RtLXAA';

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
// is an idea about how we can handle of a more generic and independent way the error handled
/*Axios.interceptors.response.use(undefined, function (error) {
  const status = error.response.status;
  if(status === 401) {
    window.alert("UNAUTHORIZED");
  } else if(status === 500) {
    window.alert("INTERVAL SERVER ERROR");
  } else if(status === 403){
    window.alert("FORBIDDEN")
  }
  return Promise.reject(error);
});*/

export default Axios;