import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const BillingTypeCreate = (props) => {

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código", });
  
  const DESCRIPTION = props.intl.formatMessage({ id: "Comun.descripcion", defaultMessage: "Descripción", });

  const CONCEDER = props.intl.formatMessage({ id: "tiposFacturacion.conceder", defaultMessage: "Conceder Crédito", });

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
        ...props.stringValidations.fieldExistsValidation('tipusFacturacio', 'codi', CODE)
      ],
    },
    {
      placeHolder: DESCRIPTION,

      type: "input",
      key: "descripcio",
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
    {
      placeHolder: CONCEDER,
      type: "checkbox",
      key: "concedimCredit",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "tiposFacturacion.titulo",
          defaultMessage: "Tipos de Facturación",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusFacturacio}
    />
  );
};

export default compose(withValidations, injectIntl)(BillingTypeCreate);
