import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const VatCreate = (props) => {

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

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
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1,4),
        ...(!props.editMode? props.stringValidations.fieldExistsValidation('iva', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),):[])
      ])
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
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Iva.porcentajeIva",
          defaultMessage: "Porcentaje IVA",
        }),
        type: "numeric",
        key: "percentatgeIva",
        required: true,
        suffix: '%',
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1,99),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.porcentajeRecargo",
          defaultMessage: "Porcentaje recargo equivalencia",
        }),
        type: "numeric",
        key: "percentatgeRecarrecEquivalencia",
        required: true,
        suffix: '%',
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 99),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.codigoCont",
          defaultMessage: "Código Contabilidad",
        }),
        type: "input",
        key: "codiComptabilitat",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 4),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.codigoRecCont",
          defaultMessage: "Código recargo contabilidad",
        }),
        type: "input",
        key: "codiRecarrecComptabilitat",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 4),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.texto",
          defaultMessage: "Texto",
        }),
        type: "input",
        key: "text",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 6),
        ],
      },

  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "IVA",
      })}
      formConfiguration={createConfiguration}
      url={API.iva}
    />
  );
};

export default compose(withValidations, injectIntl)(VatCreate);
