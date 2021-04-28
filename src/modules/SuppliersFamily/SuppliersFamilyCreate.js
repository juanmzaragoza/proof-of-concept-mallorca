import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";
import {injectIntl} from "react-intl";
import React from "react";
import {compose} from "redux";
import {withValidations} from "../wrappers";

const SuppliersFamilyCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.validationsArray.requiredValidation(),
        ...props.validationsArray.minMaxValidation(1,4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"FamiliaProveedores.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.validationsArray.requiredValidation(),
        ...props.validationsArray.minMaxValidation(1,30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Cuenta Compras"
      }),
      type: 'input',
      key: 'ctaprcmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: props.validationsArray.minMaxValidation(1,10)
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones"
      }),
      type: 'input',
      key: 'observacions',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.tipasicmp",
        defaultMessage: "Tipo Asig. Fac"
      }),
      type: 'input',
      key: 'tipasicmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: props.validationsArray.minMaxValidation(1,2)
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.dricmp",
        defaultMessage: "Diario Fac"
      }),
      type: 'input',
      key: 'dricmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: props.validationsArray.minMaxValidation(1,2)
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.driprfcmp",
        defaultMessage: "Driprfcmp"
      }),
      type: 'input',
      key: 'Diario Prof.',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: props.validationsArray.minMaxValidation(1,2)
    }
  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "FamiliaProveedores.titulo",
                        defaultMessage: "Familias proveedor"
                      })}
                      formConfiguration={createConfiguration}
                      url={'api/fact/familiesProveidor'} />
  )
};

export default compose(
  withValidations,
  injectIntl
)(SuppliersFamilyCreate);