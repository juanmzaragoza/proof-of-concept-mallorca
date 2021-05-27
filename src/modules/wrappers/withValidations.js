import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import {getFormedURL} from "../../redux/common";
import {EXPANDABLE_GRID_LIMIT_PER_PAGE} from "../../constants/config";
import Axios from "../../Axios";

const withValidations = (PassedComponent) => {


  const WrappedComponent = (props) => {

    const strMinMaxValidation = (min, max) => {
      return [
        {
          type: "min",
          params: [min, props.intl.formatMessage({
            id: "Validaciones.string.min",
            defaultMessage: "Debe ingresar al menos {min} carácteres"
          },{min: min})]
        },
        {
          type: "max",
          params: [max, props.intl.formatMessage({
            id: "Validaciones.numeros.max",
            defaultMessage: "Debe string como mucho {max} carácteres"
          },{max: max})]
        }
      ]
    }

    const numRangeValidation = (min, max) => {
      return [
        {
          type: "typeError",
          params: [props.intl.formatMessage({
            id: "Validaciones.numeros.tipo",
            defaultMessage: "Debe ingresar un número"
          })]
        },
        {
          type: "min",
          params: [min, props.intl.formatMessage({
            id: "Validaciones.numeros.min",
            defaultMessage: "Debe ingresar al menos {min} carácteres"
          },{min: min? min:0})]
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

    const numMaxValidation = (max) => {
      return [
        {
          type: "typeError",
          params: [props.intl.formatMessage({
            id: "Validaciones.numeros.tipo",
            defaultMessage: "Debe ingresar un número"
          })]
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

    const fieldExistsValidation = (key, field, name) => {
      return [
        {
          type: "test",
          params: [
            'codi_exists',
            props.intl.formatMessage({
              id: "Validaciones.codi.existente",
              defaultMessage: "{name} ya existe en el sistema"
            },{name: name}),
            async (value) => {
              if(value !== ''){
                const formedURL = () => {
                  return getFormedURL({id: key, size: EXPANDABLE_GRID_LIMIT_PER_PAGE, query: [{columnName: field, value, exact: true }]});
                }
                return Axios.get(formedURL())
                  .then(({data}) => data)
                  .then(({ _embedded }) => {
                    return !_embedded;
                  })
                  .catch(() => {
                    return false
                  });
              } else{
                return true;
              }
            }
          ]
        }
      ]
    }

    return <PassedComponent
      stringValidations={{
        minMaxValidation: strMinMaxValidation,
        emailValidation,
        fieldExistsValidation
      }}
      numberValidations={{
        minMaxValidation: numRangeValidation,
        maxValidation: numMaxValidation
      }}
      commonValidations={{
        requiredValidation,
      }} {...props} ></PassedComponent>;
  }

  return compose(
    injectIntl
  )(WrappedComponent);
}

export default withValidations;