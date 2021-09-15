import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ZoneList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Zona.titulo",
        defaultMessage: "Zona",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Zona.titulo",
          defaultMessage: "Zona",
        }),
        href: "/fact/zona",
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
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "radioKm",
        title: props.intl.formatMessage({
          id: "Zona.radioKm",
          defaultMessage: "Radio km",
        }),
      },
      {
        name: "preu",
        title: props.intl.formatMessage({
          id: "Zona.precio",
          defaultMessage: "Precio",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.comentarios",
          defaultMessage: "Comentarios",
        }),
      },
    ],
    URL: API.zona,
    listKey: "zonas",
    enableInlineEdition: true,
  };
  return <ReactGrid id="zona" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(injectIntl, connect(null, mapDispatchToProps))(ZoneList);
