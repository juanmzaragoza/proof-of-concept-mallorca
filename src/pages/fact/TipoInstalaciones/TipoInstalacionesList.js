import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";

const TipoInstalacionesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoInstalaciones.titulo",
        defaultMessage: "Tipo Instalaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Tipo Instalaciones", href: "fact/tipo-instalaciones" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "TipoInstalaciones.titulo",
      defaultMessage: "Tipo Instalaciones",
    }),
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
          defaultMessage: "descripcion",
        }),
      },
    ],
    URL: API.tipusInstalacions,
    listKey: "tipusInstalacios",
    enableInlineEdition: true,
  };

  return <ReactGrid id="tipusInstalacions" configuration={listConfiguration} />;
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
)(TipoInstalacionesList);
