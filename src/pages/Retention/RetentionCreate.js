import CreateUpdateForm from "../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../modules/wrappers";
import * as API from "redux/api";
import { TIPO_CONTABILIZACION_SELECTOR_VALUES } from "constants/selectors";


const RegimeVatCreate = (props) => {

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.tipoContab",
          defaultMessage: "Tipo contabilización"
        }),
        type: 'select',
        key: 'tipusComptabilitzacio',
        required: true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        selector: {
          options: TIPO_CONTABILIZACION_SELECTOR_VALUES
        },
        validationType: "string",
        validations: [
            ...props.commonValidations.requiredValidation(),
          ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.cuentaVentas",
          defaultMessage: "Cuenta Ventas",
        }),
        type: "input",
        key: "compteVentes",
  
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.cuentaCompras",
          defaultMessage: "Cuenta compras",
        }),
        type: "input",
        key: "compteCompres",
  
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1,10),
        ],
      },
   
      {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.tipo1",
          defaultMessage: "Tipo 1",
        }),
        type: "checkbox",
        key: "tipus1",
  
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.tipo2",
          defaultMessage: "Tipo 2",
        }),
        type: "checkbox",
        key: "tipus2",
  
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Retenciones.tipo3",
          defaultMessage: "Tipo 3",
        }),
        type: "checkbox",
        key: "tipus3",
  
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
    
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Retenciones.titulo",
        defaultMessage: "Clases retenciones",
      })}
      formConfiguration={createConfiguration}
      url={API.classeRetencio}
    />
  );
};

export default compose(withValidations, injectIntl)(RegimeVatCreate);
