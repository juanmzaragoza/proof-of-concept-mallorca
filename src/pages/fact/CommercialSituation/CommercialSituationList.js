import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CommercialSituationList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "SituacionesComerciales.titulo",
        defaultMessage: "Situaciones Comerciales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "SituacionesComerciales.titulo",
          defaultMessage: "Situaciones Comerciales",
        }),
        href: "/fact/situaciones-comerciales",
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
    ],
    URL: API.situacionsComercial,
    listKey: "situacioComercials",
    enableInlineEdition: true
  };
  return <ReactGrid id="situacionsComercial" configuration={listConfiguration} />;
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
)(CommercialSituationList);
