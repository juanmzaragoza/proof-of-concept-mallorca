import {compose} from "redux";
import {withSnackbar} from "notistack";
import {injectIntl} from "react-intl";
import React from "react";
import Axios from "../../Axios";
import {clearAll} from "../../helper/storage";

const withAxios = (PassedComponent) => {

  const WrappedComponent = (props) => {

    const defaultConfig = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    };

    const get = (url, config) => {
      return new Promise((resolve, reject) => {
        Axios.get(url, config? config:defaultConfig).then(data => {
          return resolve(data);
        }).catch(error => {
          handleGenericError(error);
          return reject(error);
        })
      });
    }

    const post = (url, body, config) => {
      return new Promise((resolve, reject) => {
        Axios.post(url, body, config? config:defaultConfig).then(data => {
          return resolve(data);
        }).catch(error => {
          handleGenericError(error);
          return reject(error);
        })
      })
    }

    const put = (url, body, config) => {
      return new Promise((resolve, reject) => {
        Axios.put(url, body, config? config:defaultConfig).then(data => {
          return resolve(data);
        }).catch(error => {
          handleGenericError(error);
          return reject(error);
        })
      })
    }

    const handleGenericError = (error) => {
      const {status, message} = error;
      if(message === 'Network Error'){
        props.enqueueSnackbar(props.intl.formatMessage({
          id: "Comun.error.error_de_red",
          defaultMessage: "Ocurrió un problema con la red X("
        }), {variant: 'error'});
      } else if (status === 500) {
        props.enqueueSnackbar(props.intl.formatMessage({
          id: "Comun.error.error_interno",
          defaultMessage: "Ocurrió un error interno en el servicio X("
        }), {variant: 'error'});
      } else if(status === 403){
        clearAll();
        window.location.href = '/login';
        props.enqueueSnackbar(props.intl.formatMessage({
          id: "Comun.error.sesion_expirada",
          defaultMessage: "Sesión expirada! Vuelva a iniciar sesión."
        }), {variant: 'error'});
      }
    }

    return <PassedComponent Axios={{get,post,put}} {...props} ></PassedComponent>;
  }

  return compose(
    withSnackbar,
    injectIntl
  )(WrappedComponent);
}

export default withAxios;