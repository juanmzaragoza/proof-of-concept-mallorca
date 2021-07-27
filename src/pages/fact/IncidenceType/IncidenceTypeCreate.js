import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const IncidenceTypeCreate = (props) => {
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
        ...props.stringValidations.fieldExistsValidation(
          "tipusIncidenciesFactura",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoIncidenciasFatura.titulo",
        defaultMessage: "Tipo Incidencias Fatura",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusIncidenciesFactura}
    />
  );
};

export default compose(withValidations, injectIntl)(IncidenceTypeCreate);
