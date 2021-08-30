import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const AplicadoresList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Aplicadores.titulo",
        defaultMessage: "Aplicadores",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Aplicadores.titulo",
          defaultMessage: "Aplicadores",
        }),
        href: "/fact/aplicadores",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "contracte",
        title: props.intl.formatMessage({
          id: "Aplicadores.contrato",
          defaultMessage: "Contrato",
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
        name: "cognoms",
        title: props.intl.formatMessage({
          id: "Aplicadores.apellidos",
          defaultMessage: "Apellidos",
        }),
      },
      {
        name: "nif",
        title: props.intl.formatMessage({
          id: "Aplicadores.nif",
          defaultMessage: "NIF",
        }),
      },
      {
        name: "categoria",
        title: props.intl.formatMessage({
          id: "Aplicadores.categoria",
          defaultMessage: "Categoria",
        }),
        inlineEditionDisabled: true
      },
    ],
    URL: API.aplicador,
    listKey: "aplicadors",
    enableInlineEdition: true
  };
  return <ReactGrid id="aplicador" configuration={listConfiguration} />;
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
)(AplicadoresList);
