import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const CurrencyCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('divises', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },


    {
      placeHolder: props.intl.formatMessage({
        id: "Divisa.abreviatura",
        defaultMessage: "Abreviatura",
      }),
      type: "input",
      key: "abreviatura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
        placeHolder: props.intl.formatMessage({
          id: "Divisa.valorEuros",
          defaultMessage: "Valor euros"
        }),
        type: 'numeric',
        key: 'valorEuros',
        required: true,
        breakpoints: {
          xs: 12,
          md: 2
        },
        suffix: '€',
        validationType: "number",
        validations: [
        ...props.commonValidations.requiredValidation(),
     
        ]
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Divisa.decimalesPrecio",
          defaultMessage: "Decimales Precios"
        }),
        type: 'numeric',
        key: 'decimalsPreus',
        required: true,
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
        validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0,5),
    
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Divisa.decimalesImporte",
          defaultMessage: "Decimales Importe"
        }),
        type: 'numeric',
        key: 'decimalsImports',
        required: true,
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
        
        validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 5),

        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Divisa.codigoContab",
          defaultMessage: "Código contabilidad",
        }),
        type: "input",
        key: "codiComptabilitat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Divisa.iso",
          defaultMessage: "ISO",
        }),
        type: "input",
        key: "iso",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Divisa.titulo",
        defaultMessage: "Divisa",
      })}
      formConfiguration={createConfiguration}
      url={API.divises}
    />
  );
};

export default compose(withValidations, injectIntl)(CurrencyCreate);
