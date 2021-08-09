import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const SuppliersFamilyCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.codigo",
        defaultMessage: "Código",
      }),
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
        ...props.stringValidations.fieldExistsValidation(
          "familiaProveidor",
          "codi",
          props.intl.formatMessage({
            id: "FamiliaProveedores.codigo",
            defaultMessage: "Código",
          })
        ),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.nombre",
        defaultMessage: "Nombre",
      }),
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
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Cuenta Compras",
      }),
      type: "input",
      key: "ctacprcmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 10),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.tipasicmp",
        defaultMessage: "Tipo Asig. Fac",
      }),
      type: "input",
      key: "tipasicmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.dricmp",
        defaultMessage: "Diario Fac",
      }),
      type: "input",
      key: "dricmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.driprfcmp",
        defaultMessage: "Diario Prof.",
      }),
      type: "input",
      key: "driprfcmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 4,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "FamiliaProveedores.titulo",
        defaultMessage: "Familias proveedor",
      })}
      formConfiguration={createConfiguration}
      url={API.familiaProveidor}
    />
  );
};

export default compose(withValidations, injectIntl)(SuppliersFamilyCreate);
