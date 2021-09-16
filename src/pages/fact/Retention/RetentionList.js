import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const RetentionList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Retenciones.titulo",
        defaultMessage: "Retenciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Retenciones.titulo",
          defaultMessage: "Retenciones",
        }),
        href: "/fact/retenciones",
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
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "tipusComptabilitzacio",
        title: props.intl.formatMessage({
          id: "Retenciones.tipoContab",
          defaultMessage: "Tipo contabilización",
        }),
      },
      {
        name: "compteVentes",
        title: props.intl.formatMessage({
          id: "Retenciones.cuentaVentas",
          defaultMessage: "Cuenta Ventas",
        }),
      },

      {
        name: "compteCompres",
        title: props.intl.formatMessage({
          id: "Retenciones.cuentaCompras",
          defaultMessage: "Cuenta compras",
        }),
      },

      {
        name: "tipus1",
        title: props.intl.formatMessage({
          id: "Retenciones.tipo1",
          defaultMessage: "Tipo 1",
        }),
      },
      {
        name: "tipus2",
        title: props.intl.formatMessage({
          id: "Retenciones.tipo2",
          defaultMessage: "Tipo 2",
        }),
      },
      {
        name: "tipus3",
        title: props.intl.formatMessage({
          id: "Retenciones.tipo3",
          defaultMessage: "Tipo 3",
        }),
      },
    ],
    URL: API.classeRetencio,
    listKey: "classeRetencios",
    enableInlineEdition: true,
  };
  return <ReactGrid id="classeRetencio" configuration={listConfiguration} />;
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
)(RetentionList);
