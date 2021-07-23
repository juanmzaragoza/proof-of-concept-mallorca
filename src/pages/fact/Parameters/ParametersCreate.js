import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ParameterCreate = (props) => {

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      noEditable:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 15),
        ...props.stringValidations.fieldExistsValidation('parametres', 'codi', props.intl.formatMessage({
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
      key: "description",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Parametros.valor",
          defaultMessage: "Valor",
        }),
        type: "input",
        key: "value",
        required: true,
        breakpoints: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
        ],
      },
   
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Parametros.titulo",
        defaultMessage: "Parámetros",
      })}
      formConfiguration={createConfiguration}
      url={API.parametres}
    />
  );
};

export default compose(withValidations, injectIntl)(ParameterCreate);
