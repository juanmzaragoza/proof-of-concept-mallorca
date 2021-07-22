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
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
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

    ],
    URL: API.classeRetencio,
    listKey: "classeRetencios",
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
