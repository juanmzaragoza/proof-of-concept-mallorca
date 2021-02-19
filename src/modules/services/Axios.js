//import { config } from "./../base";
import axios from "axios";
//import { getPlainFrom } from "../helpers/storage";

const Axios = axios.create();

//const authToken = () => 'Bearer ' + getPlainFrom('token');
const authToken = () => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjZWNvY2xvdWQiLCJhdWQiOiJhdXRoIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MTM3NDI4NjYsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIEFkbWluIiwiZW1haWwiOiJhZG1pbkBsaW1pdC5lcyIsInJleHAiOjE2MTYzMzEyNjYsInJvbCI6WyJBRE1JTiJdLCJzZXNzaW9uIjp7ImkiOjQ0MywiZSI6OTg3fX0.RDt8ulFsmfw6Kgl_ILW3p1MhkbaLmLIsusg29jRmVcaeldwXl7wVdkkJF7G17PAbMSlRi4JHwBr3WgpfnGjL2g';

//Axios.defaults.baseURL = config.apiRoot;
Axios.defaults.baseURL = 'http://10.35.3.44:8083/';

Axios.interceptors.request.use(function (conf) {
  // Do something before request is sent
  conf.headers = {
    Authorization: authToken(),
    "Content-Type": "application/json",
  }

  return conf;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export default Axios;