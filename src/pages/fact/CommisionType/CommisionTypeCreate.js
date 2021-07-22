import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const CommisionTypeCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripcion",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('tipusComissio', 'codi', CODE)
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
      placeHolder: DESCRIPCIO,

      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1000),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoComision.porcentaje",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatge",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoComision.minimo",
        defaultMessage: "Mínimo",
      }),
      type: "numeric",
      key: "minim",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoComision.titulo",
        defaultMessage: "Tipos de Comisión",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusComissio}
    />
  );
};

export default compose(withValidations, injectIntl)(CommisionTypeCreate);
