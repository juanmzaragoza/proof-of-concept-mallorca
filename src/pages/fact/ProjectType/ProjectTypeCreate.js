import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ProjectTypeCreate = (props) => {
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
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation('projectesTipo', 'codi', CODE)
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
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
      placeHolder: DESCRIPCIO,

      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 30),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoProyecto.titulo",
        defaultMessage: "Tipo de Proyecto",
      })}
      formConfiguration={createConfiguration}
      url={API.projectesTipo}
    />
  );
};

export default compose(withValidations, injectIntl)(ProjectTypeCreate);
