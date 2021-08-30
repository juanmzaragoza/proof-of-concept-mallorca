import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

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

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true
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
          id: "Clientes.codigoBanco",
          defaultMessage: "Codigo Banco",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "oficinaBancariaCodi",
        title: props.intl.formatMessage({
          id: "Clientes.Contab.oficines",
          defaultMessage: "Oficinas Banco",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "identificadorCcr",
        title: props.intl.formatMessage({
          id: "DocumentosPago.numeroCuentaCorriente",
          defaultMessage: "numero Cuenta Corriente",
        }),
      },
      {
        name: "digitControl",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.dcc",
          defaultMessage: "DCC",
        }),
      },
      {
        name: "sufix",
        title: props.intl.formatMessage({
          id: "CuentasCorrientes.sufijo",
          defaultMessage: "Sufijo",
        }),
      },
    ],
    URL: API.comptesCorrents,
    listKey: "compteCorrents",
    enableInlineEdition: true
  };
  return <ReactGrid id="comptesCorrents" configuration={listConfiguration} />;
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
)(CurrentAccountsList);
