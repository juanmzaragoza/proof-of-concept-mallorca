import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import * as API from "redux/api";

const CurrencyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Divisa.titulo",
        defaultMessage: "Divisa",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa",
        }),
        href: "/fact/divisa",
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
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "abreviatura",
        title: props.intl.formatMessage({
          id: "Divisa.abreviatura",
          defaultMessage: "Abreviatura",
        }),
      },
      {
        name: "valorEuros",
        title: props.intl.formatMessage({
          id: "Divisa.valorEuros",
          defaultMessage: "Valor euros",
        }),
      },

      {
        title: props.intl.formatMessage({
          id: "Divisa.decimalesPrecio",
          defaultMessage: "Decimales Precios",
        }),
        name: "decimalsPreus",
      },
      {
        title: props.intl.formatMessage({
          id: "Divisa.decimalesImporte",
          defaultMessage: "Decimales Importe",
        }),
        name: "decimalsImports",
      },
      {
        title: props.intl.formatMessage({
          id: "Divisa.codigoContab",
          defaultMessage: "Código contabilidad",
        }),
        name: "codiComptabilitat",
      },
    ],
    URL: API.divisa,
    listKey: "divisas",
    enableInlineEdition: true,
  };
  return <ReactGrid id="divisa" configuration={listConfiguration} />;
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
)(CurrencyList);
