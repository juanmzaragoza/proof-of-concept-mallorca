import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withValidations } from "modules/wrappers";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { getObjectFrom } from "helper/storage";
import { ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY } from "../../../constants";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";

const CurrentAccountsList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CuentasCorrientes.titulo",
        defaultMessage: "Cuentas Corrientes",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.titulo",
          defaultMessage: "Cuentas Corrientes",
        }),
        href: "/fact/cuentas-corrientes",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });


  const OBS = props.intl.formatMessage({
    id: "DepartamentosCliente.observaciones",
    defaultMessage: "Observaciones",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripcion",
  });


  const enterpriseGroup = getObjectFrom(
    ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY
  );

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

  const caixa = {
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
    validations: [...props.commonValidations.requiredValidation()],
  };

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
        width: 200,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "bancCodi",
        title: props.intl.formatMessage({
          id: "Clientes.entidad",
          defaultMessage: "Entidad",
        }),
        inlineEditionDisabled: true,
        width: 120,
      },
      {
        name: "oficinaBancariaCodi",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.oficina",
          defaultMessage: "Oficinas",
        }),
        inlineEditionDisabled: true,
        width: 120,
      },
      {
        name: "identificadorCcr",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.cuentaCorriente",
          defaultMessage: "Cuenta Corriente",
        }),
        width: 150,
      },
      {
        name: "digitControl",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.dcc",
          defaultMessage: "DCC",
        }),
        width: 80,
      },
      {
        name: "sufix",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.sufijo",
          defaultMessage: "Sufijo",
        }),
        width: 80,
      },
      {
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.identificador",
          defaultMessage: "Identificador",
        }),
        name: "codiIdentificadorBanc",
        width: 150,
      },
      {
        name: "caixa",
        title: props.intl.formatMessage({
          id: "Proveedores.cajas",
          defaultMessage: "Cajas",
        }),
        getCellValue: (row) => row.caixa?.description,
        field: caixa,
        width: 300,
      },
    ],
    URL: API.comptesCorrents,
    listKey: "compteCorrents",
    enableInlineEdition: true,
    enableExpandableContent: true,
  };


  const formComponents = [
   
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
    <ReactGrid id="comptesCorrents" configuration={listConfiguration}>
      {(props) => (
        <MasterDetailedForm
          url={API.comptesCorrents}
          formComponents={formComponents}
          {...props}
        />
      )}
    </ReactGrid>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  withValidations,
  injectIntl,
  connect(null, mapDispatchToProps)
)(CurrentAccountsList);
