import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const UnitTypeCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('tipusUnitats', 'codi', CODE)
      ],
    },
    {
      placeHolder: DESCRIPCIO,

      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoUnidad.factor",
        defaultMessage: "Factor de Conversión",
      }),
      type: "input",
      key: "factorConversio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoUnidad.titulo",
        defaultMessage: "Tipo de Unidades",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusUnitats}
    />
  );
};

export default compose(withValidations, injectIntl)(UnitTypeCreate);
