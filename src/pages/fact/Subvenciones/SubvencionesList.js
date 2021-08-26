import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const SubvencionesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Subvenciones.titulo",
        defaultMessage: "Subvenciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Subvenciones.titulo",
          defaultMessage: "Subvenciones",
        }),
        href: "/fact/subvenciones",
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
        name: "origen",
        title: props.intl.formatMessage({
          id: "Subvencion.origen",
          defaultMessage: "Origen",
        }),
      },
      {
        name: "preuPerKilo",
        title: props.intl.formatMessage({
          id: "Subvencion.precioPorKilo",
          defaultMessage: "Precio Por Kilo",
        }),
      },
    ],
    URL: API.subvencions,
    listKey: "subvencios",
    enableInlineEdition: true
  };
  return <ReactGrid id="subvencions" configuration={listConfiguration} />;
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
)(SubvencionesList);
