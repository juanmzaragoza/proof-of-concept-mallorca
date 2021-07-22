import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const RiskTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoRiesgo.titulo",
        defaultMessage: "Tipo Riesgo",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoRiesgo.titulo",
          defaultMessage: "Tipo Riesgo",
        }),
        href: "/fact/tipo-riesgo",
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
        name: "tri_pensrv",
        title: props.intl.formatMessage({
          id: "TipoRiesgo.pendienteServir",
          defaultMessage: "Pendiente Servir",
        }),
      },
      {
        name: "tri_albnotfac",
        title: props.intl.formatMessage({
          id: "TipoRiesgo.pendienteFacturar",
          defaultMessage: "Pendiente Facturar",
        }),
      },

    ],
    URL: API.tipusRisc,
    listKey: "tipusRiscs",
  };
  return <ReactGrid id="tipusRisc" configuration={listConfiguration} />;
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
)(RiskTypeList);
