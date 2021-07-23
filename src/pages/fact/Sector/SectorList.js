import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const SectorList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Sectores.titulo",
        defaultMessage: "Sectores",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Sectores.titulo",
          defaultMessage: "Sectores",
        }),
        href: "/fact/sectores",
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
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
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
        name: "descripcioIdioma",
        title: props.intl.formatMessage({
          id: "Sectores.descripcionIdioma",
          defaultMessage: "Descripción Idioma",
        }),
      },
      {
        name: "idioma",
        title: props.intl.formatMessage({
          id:  "Proveedores.idioma",
          defaultMessage: "Idioma",
        }),
        getCellValue: row => row.idioma?.description ? row.idioma.description : ""
      },

    ],
    URL: API.sectors,
    listKey: "sectors",
  };
  return <ReactGrid id="sectors" configuration={listConfiguration} />;
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
)(SectorList);
