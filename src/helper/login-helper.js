import Axios from "../Axios";
import {getPlainFrom, setPlainOn} from "./storage";
import jwtDecode from "jwt-decode";
import {TOKEN_LOCALSTORAGE_KEY} from "../constants";

//hack to avoid regenerate toeken manually
export const login = () => {
  // check if token is expired
  if(tokenIsValid()) return;
  // generate token
  Axios.get('api/auth?user=admin&pass=admin',{
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  }).then(({status, data, ...rest}) => {
    Axios.post('api/auth/refresh', {token: data.token, session:{"i":443,"e":987}}, {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${data.token}'
      }),
    })
    .then(({status, data, ...rest}) => {
      setPlainOn(TOKEN_LOCALSTORAGE_KEY, data.token);
    })
    .catch(error => {
      window.alert("NO SE PUDO REFRESCAR")
    });
  })
  .catch(error => {
    window.alert("NO SE PUDO OBTENER ADMIN/ADMIN")
  });
}

export const tokenIsValid = () => {
  const token = getPlainFrom(TOKEN_LOCALSTORAGE_KEY);
  if(token) {
    const {exp, iss} = jwtDecode(token);
    return (Date.now() < exp * 1000 && iss === 'ceocloud');
  } else{
    return false;
  }
}

export const isUserAuthenticated = () => {
  return !!getPlainFrom(TOKEN_LOCALSTORAGE_KEY);
}