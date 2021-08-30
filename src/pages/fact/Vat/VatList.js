import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const VatList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "Iva",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Iva.titulo",
          defaultMessage: "Iva",
        }),
        href: "/fact/iva",
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
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "percentatgeIva",
        title: props.intl.formatMessage({
          id: "Iva.porcentajeIva",
          defaultMessage: "Porcentaje Iva",
        }),
      },
      {
        name: "text",
        title: props.intl.formatMessage({
          id: "Iva.texto",
          defaultMessage: "Texto",
        }),
      },

    ],
    URL: API.ives,
    listKey: "ivas", 
    enableInlineEdition: true
  };
  return <ReactGrid id="ives" configuration={listConfiguration} />;
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
)(VatList);
