import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const SubvencionesCreate = (props) => {
  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre" });
  const ORIGEN = props.intl.formatMessage({ id: "Subvencion.origen", defaultMessage: "Origen" });
  const PESO = props.intl.formatMessage({ id: "Subvencion.precioPorKilo", defaultMessage: "Precio por kilo" });

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
        ...props.stringValidations.fieldExistsValidation('subvencions', 'codi', CODE)
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: ORIGEN,
      type: "input",
      key: "origen",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: PESO,
      type: "numeric",
      key: "preuPerKilo",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Subvenciones.titulo",
        defaultMessage: "Subvenciones",
      })}
      formConfiguration={createConfiguration}
      url={API.subvencions}
    />
  );
};

export default compose(withValidations, injectIntl)(SubvencionesCreate);
