import Axios from "../Axios";
import {getPlainFrom, setPlainOn} from "./storage";
import jwtDecode from "jwt-decode";

//hack to avoid regenerate toeken manually
export const login = () => {
  // check if token is expired
  const token = getPlainFrom('token');
  if(token) {
    const {exp, iss} = jwtDecode(token);
    if (Date.now() < exp * 1000 && iss === 'ceocloud') return;
  }
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
      setPlainOn('token', data.token);
    })
    .catch(error => {
      window.alert("NO SE PUDO REFRESCAR")
    });
  })
  .catch(error => {
    window.alert("NO SE PUDO OBTENER ADMIN/ADMIN")
  });
}

export const isUserAuthenticated = () => {
  return !!getPlainFrom('token');
}