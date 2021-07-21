import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CompanyAccountList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CuentaCorrienteEmpresa.titulo",
        defaultMessage: "Cuentas Corrientes Empresas",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CuentaCorrienteEmpresa.titulo",
          defaultMessage: "Cuentas Corriente Empresas",
        }),
        href: "/fact/cuentas-corrientes-empresas",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "client.description",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        getCellValue: (row) => row.client?.description ?? "",
      },
      {
        name: "empresa.description",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        getCellValue: (row) => row.empresa?.description ?? "",
      },
      {
        name: "bancCodi",
        title: props.intl.formatMessage({
          id: "Clientes.banco",
          defaultMessage: "Banco",
        }),
      },
      {
        name: "oficinaBancaria.description",
        title: props.intl.formatMessage({
          id: "Clientes.Contab.oficines",
          defaultMessage: "Oficina Bancaria",
        }),
        getCellValue: (row) => row.oficinaBancaria?.description ?? "",
      },
      {
        name: "digitControl",
        title: props.intl.formatMessage({
          id: "Clientes.controlDigitos",
          defaultMessage: "Dígitos control",
        }),
      },
      {
        name: "numeroCompteCorrent",
        title: props.intl.formatMessage({
          id: "Clientes.cuenta",
          defaultMessage: "Cuenta Corriente",
        }),
      },
      {
        name: "paisIban",
        title: props.intl.formatMessage({
          id: "Clientes.paisIban",
          defaultMessage: "País IBAN",
        }),
      },
      {
        name: "digitControlIban",
        title: props.intl.formatMessage({
          id: "Clientes.digitosIban",
          defaultMessage: "Dígitos IBAN",
        }),
      },
      {
        name: "bic",
        title: props.intl.formatMessage({
          id: "Clientes.bicIban",
          defaultMessage: "BIC IBAN",
        }),
      },
    ],
    URL: API.compteCorrentEmpresas,
    listKey: "compteCorrentEmpresas",
  };
  return (
    <ReactGrid id="compteCorrentEmpresas" configuration={listConfiguration} />
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
  injectIntl,
  connect(null, mapDispatchToProps)
)(CompanyAccountList);
