import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";
import { TIPO_CLASIFICACION_SELECTOR_VALUES } from "constants/selectors";

const ClasificationCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codiClassificacio",
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
        ...props.stringValidations.fieldExistsValidation(
          "classificacions",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
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
        ...props.stringValidations.minMaxValidation(0, 100),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clasificaciones.clasificacion",
        defaultMessage: "Clasificación",
      }),
      type: "select",
      key: "tipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_CLASIFICACION_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clasificaciones.categoria",
        defaultMessage: "categoria",
      }),
      type: "input",
      key: "categoria",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 2),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Clasificaciones.titulo",
        defaultMessage: "Clasificaciones",
      })}
      formConfiguration={createConfiguration}
      url={API.classificacions}
    />
  );
};

export default compose(withValidations, injectIntl)(ClasificationCreate);
