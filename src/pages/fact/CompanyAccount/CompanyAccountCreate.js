import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const CompanyAccountCreate = (props) => {
  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM_COMERCIAL = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });

  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });

  const OBV = props.intl.formatMessage({
    id: "Clientes.observaciones",
    defaultMessage: "Observaciones",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM_COMERCIAL, name: "nomComercial" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes",
      }),
      type: "LOV",
      key: "client",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      noEditable: true,
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.empresas",
        defaultMessage: "Empresas",
      }),
      type: "LOV",
      key: "empresa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      noEditable: true,
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.banco",
        defaultMessage: "Banco",
      }),
      type: "LOV",
      key: "bancCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        relatedWith: [{
          name: "oficinaBancaria",
          filterBy: "banc.id",
          keyValue: "id",
        },],
        transform: {
          apply: (bancs) => bancs && bancs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.Contab.oficines",
        defaultMessage: "Oficina Bancaria",
      }),
      type: "LOV",
      key: "oficinaBancaria",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "oficinaBancarias",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "domicili",
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
        cannotCreate: true,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.controlDigitos",
        defaultMessage: "Control Digitos",
      }),
      type: "input",
      key: "digitControl",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 2),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta",
        defaultMessage: "Cuenta",
      }),
      type: "input",
      key: "numeroCompteCorrent",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 10),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.paisIban",
        defaultMessage: "Pais Iban",
      }),
      type: "input",
      key: "paisIban",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.digitosIban",
        defaultMessage: "Digitos Iban",
      }),
      type: "input",
      key: "digitControlIban",

      breakpoints: {
        xs: 12,
        md: 2,
      },

      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.bicIban",
        defaultMessage: "Bic Iban",
      }),
      type: "input",
      key: "bicIban",

      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "CuentaCorrienteEmpresa.titulo",
        defaultMessage: "Cuentas Corriente Empresas",
      })}
      formConfiguration={createConfiguration}
      url={API.compteCorrentEmpresas}
    />
  );
};

export default compose(withValidations, injectIntl)(CompanyAccountCreate);
