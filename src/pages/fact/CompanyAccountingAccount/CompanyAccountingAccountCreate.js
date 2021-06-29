import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const CompanyAccountingAccountCreate = (props) => {

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM_COMERCIAL = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM_COMERCIAL, name: "nomComercial" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes"
      }),
      type: 'LOV',
      key: 'client',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      noEditable: true,
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: 'codi',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.empresas",
        defaultMessage: "Empresas",
      }),
      type: 'LOV',
      key: 'empresa',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      noEditable: true,
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: 'nomComercial',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuentasContables",
        defaultMessage: "Cuentas contables",
      }),
      type: "input",
      key: "compteComptable",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Retenciones.cuentaVentas",
        defaultMessage: "Cuenta ventas",
      }),
      type: "input",
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },

  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "CuentaContableEmpresa.titulo",
        defaultMessage: "Cuentas Contables Empresas",
      })}
      formConfiguration={createConfiguration}
      url={API.compteComptableEmpresas}
    />
  );
};

export default compose(withValidations, injectIntl)(CompanyAccountingAccountCreate);
