import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";
import { TIPO_COSTES_SELECTOR_VALUES } from "constants/selectors";

const CostsTypeCreate = (props) => {

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
        ...props.stringValidations.minMaxValidation(0, 4),
        ...props.stringValidations.fieldExistsValidation('tipusCost', 'codi', props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          }),)
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
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 30),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id:  "TipoCostes.tipo",
          defaultMessage: "Tipo"
        }),
        type: 'select',
        key: 'tipus',
        required:true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        selector:{
            options: TIPO_COSTES_SELECTOR_VALUES
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
        ],
      },
    {
        placeHolder: props.intl.formatMessage({
          id: "TipoCostes.secuenciaAutomatica",
          defaultMessage: "Secuencia de Alta Automática",
        }),
        type: "numeric",
        key: "sequenciaAltaAutomatica",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999)
        ],
      },
     
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoCostes.titulo",
        defaultMessage: "Tipo Costes",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusCost}
    />
  );
};

export default compose(withValidations, injectIntl)(CostsTypeCreate);
