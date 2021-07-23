import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const FinalesFacturasCreate = (props) => {

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código", });
  
  const DESCRIPTION = props.intl.formatMessage({ id: "Comun.descripcion", defaultMessage: "Descripción", });

  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre", });

  const ACT = props.intl.formatMessage({ id: "FinalFacturas.activo", defaultMessage: "Activo", });

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
        ...props.stringValidations.fieldExistsValidation('finalFactura', 'codi', CODE)
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
      placeHolder: ACT,
      type: "checkbox",
      key: "actiu",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1000),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "FinalFacturas.titulo",
          defaultMessage: "Finales de facturas",
      })}
      formConfiguration={createConfiguration}
      url={API.finalFactura}
    />
  );
};

export default compose(withValidations, injectIntl)(FinalesFacturasCreate);
