import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";

const withValidations = (PassedComponent) => {


  const WrappedComponent = (props) => {

    const minMaxValidation = (min, max) => {
      return [
        {
          type: "min",
          params: [min, props.intl.formatMessage({
            id: "Validaciones.numeros.min",
            defaultMessage: "Debe ingresar al menos {min} carácteres"
          },{min: min})]
        },
        {
          type: "max",
          params: [max, props.intl.formatMessage({
            id: "Validaciones.numeros.max",
            defaultMessage: "Debe ingresar como mucho {max} carácteres"
          },{max: max})]
        }
      ]
    }

    const emailValidation = () => {
      return [
        {
          type: "email",
          params: [props.intl.formatMessage({
            id: "Validaciones.string.email",
            defaultMessage: "Ingrese un e-mail válido. Respete el siguiente formato xx@xxx.xxx"
          })]
        }
      ]
    }

    const requiredValidation = () => {
      return [
        {
          type: "required",
          params: [props.intl.formatMessage({
            id: "Validaciones.requerido",
            defaultMessage: "Este campo es obligatorio"
          })]
        },
        {
          type: "nullable",
          params: [true]
        },
      ]
    }

    return <PassedComponent validationsArray={{minMaxValidation, emailValidation, requiredValidation}} {...props} ></PassedComponent>;
  }

  return compose(
    injectIntl
  )(WrappedComponent);
}

export default withValidations;