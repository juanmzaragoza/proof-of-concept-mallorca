import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ArticleLocationList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "ArticulosUbicacion.titulo",
        defaultMessage: "Articulos ubicación",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "ArticulosUbicacion.titulo",
          defaultMessage: "Articulos ubicación",
        }),
        href: "/articulo-ubicacion",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "unitat",
        title: props.intl.formatMessage({
          id: "ArticulosUbicacion.unidad",
          defaultMessage: "Unidad",
        }),
      },
      {
        name: "ubicacio",
        title: props.intl.formatMessage({
          id: "Ubicacion.titulo",
          defaultMessage: "Ubicación",
        }),
        getCellValue: row => row.ubicacio?.description ?? ""
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "ArticulosUbicacion.articulo.titulo",
          defaultMessage: "Articulo",
        }),
        getCellValue: row => row.article?.description ?? ""
      },
    ],
    URL: API.ubicacioArticles,
    listKey: "ubicacioArticles",
  };
  return <ReactGrid id="ubicacioArticles" configuration={listConfiguration} />;
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
)(ArticleLocationList);
