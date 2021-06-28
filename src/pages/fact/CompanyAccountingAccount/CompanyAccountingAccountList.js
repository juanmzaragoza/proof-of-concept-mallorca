import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CompanyAccountingAccountList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CuentaContableEmpresa.titulo",
        defaultMessage: "Cuentas Contables Empresas",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CuentaContableEmpresa.titulo",
        defaultMessage: "Cuentas Contables Empresas",
        }),
        href: "/cuentasContablesEmpresas",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: 'client.description',
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes"
        }),
        getCellValue: row => row.client?.description ?? ""
      },
      {
        name: 'empresa.description',
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas"
        }),
        getCellValue: row => row.empresa?.description ?? ""
      },
    ],
    URL: API.compteComptableEmpresas,
    listKey: "compteComptableEmpresas",
  };
  return <ReactGrid id="compteComptableEmpresas" configuration={listConfiguration} />;
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
)(CompanyAccountingAccountList);
