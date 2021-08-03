import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";
import { getObjectFrom } from "helper/storage";
import { ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY } from "../../../constants";

const CurrentAccountsCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "DepartamentosCliente.observaciones",
    defaultMessage: "Observaciones",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripcion",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });

  const enterpriseGroup = getObjectFrom(
    ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY
  );
  console.log(enterpriseGroup.title);

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "numeric",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(1, 9999999999),
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.banco",
        defaultMessage: "Banco",
      }),
      type: "LOV",
      key: "bancCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        relatedWith: {
          name: "oficinaBancariaCodi",
          filterBy: "banc.id",
          keyValue: "id",
        },
        transform: {
          apply: (bancs) => bancs && bancs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.Contab.oficines",
        defaultMessage: "Oficina Bancaria",
      }),
      type: "LOV",
      key: "oficinaBancariaCodi",
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
        transform: {
          apply: (oficinaBancarias) =>
            oficinaBancarias && oficinaBancarias.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        cannotCreate: true,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta",
        defaultMessage: "Cuenta",
      }),
      type: "input",
      key: "identificadorCcr",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 11)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CuentasCorrientes.dcc",
        defaultMessage: "DCC",
      }),
      type: "input",
      key: "digitControl",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CuentasCorrientes.sufijo",
        defaultMessage: "Sufijo",
      }),
      type: "input",
      key: "sufix",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.cajas",
        defaultMessage: "Cajas",
      }),
      type: "LOV",
      key: "caixa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "caixas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: codeAndDescription(),
        advancedSearchColumns: aSCodeAndDescription,
      },
      extraQuery: [
        {
          columnName: "empresa.codi",
          value: `"${enterpriseGroup.value.codi}"`,
          exact: true,
        },
      ],
      validationType: "object",
      ...withRequiredValidation(),
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
        md: 1,
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
        md: 1,
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
      key: "codiIdentificadorBanc",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 11)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CuentaCorriente.emisor",
        defaultMessage: "Emisor",
      }),
      type: "input",
      key: "bancEmpresaCodi",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 11)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.bloqueado",
        defaultMessage: "Bloqueado",
      }),
      type: "checkbox",
      key: "bloquejat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      text: {
        multiline: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 1000)],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "CuentasCorrientes.titulo",
        defaultMessage: "Cuentas Corrientes",
      })}
      formConfiguration={createConfiguration}
      url={API.comptesCorrents}
    />
  );
};

export default compose(withValidations, injectIntl)(CurrentAccountsCreate);
