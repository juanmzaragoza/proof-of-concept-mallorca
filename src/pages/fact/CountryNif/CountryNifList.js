import React, { useEffect } from "react";
import { bindActionCreators, compose } from "redux";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import * as API from "redux/api";

const CountryNifList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PaisNif.titulo",
        defaultMessage: "País NIF",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "PaisNif.titulo",
          defaultMessage: "País NIF",
        }),
        href: "/fact/paises-nif",
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
        name: "tipusNif",
        title: props.intl.formatMessage({
          id: "PaisNif.tipusNif",
          defaultMessage: "Tipo Nif",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "tamanyNif",
        title: props.intl.formatMessage({
          id: "PaisNif.tamanyNif",
          defaultMessage: "Tamaño NIF",
        }),
      },
    ],
    URL: API.paisNif,
    listKey: "paisNifs",
    enableInlineEdition: true
  };
  return <ReactGrid id="paisNif" configuration={listConfiguration} />;
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
)(CountryNifList);
