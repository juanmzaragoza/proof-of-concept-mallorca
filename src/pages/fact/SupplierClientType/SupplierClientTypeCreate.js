import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const SupplierClientsTypeCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESC = props.intl.formatMessage({
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
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.fieldExistsValidation(
          "tipusProveidorClient",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: DESC,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 10,
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
        id: "TipoProveedoresCliente.titulo",
        defaultMessage: "Tipo Proveedor/Cliente",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusProveidorClient}
    />
  );
};

export default compose(withValidations, injectIntl)(SupplierClientsTypeCreate);