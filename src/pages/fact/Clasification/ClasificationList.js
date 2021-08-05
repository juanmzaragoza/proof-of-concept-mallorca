import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ClasificationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Clasificaciones.titulo",
        defaultMessage: "Clasificaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Clasificaciones.titulo",
          defaultMessage: "Clasificaciones",
        }),
        href: "/fact/clasificaciones",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
      },
      {
        name: "codiClassificacio",
        title: props.intl.formatMessage({
          id: "Clasificaciones.codigoClas",
          defaultMessage: "Código Clasificación",
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
        name: "tipus",
        title: props.intl.formatMessage({
          id: "Clasificaciones.clasificacion",
          defaultMessage: "Clasificación",
        }),
      },
      {
        name: "categoria",
        title: props.intl.formatMessage({
          id: "Clasificaciones.categoria",
          defaultMessage: "Categoria",
        }),
      },
    ],
    URL: API.classificacions,
    listKey: "classificacios",
  };
  return <ReactGrid id="classificacions" configuration={listConfiguration} />;
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
)(ClasificationList);
