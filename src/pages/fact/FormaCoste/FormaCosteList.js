import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const FormaCosteList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FormasCoste.titulo",
        defaultMessage: "Formas Coste",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FormasCoste.titulo",
          defaultMessage: "Formas Cost",
        }),
        href: "/fact/forma-coste",
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
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "preuCost",
        title: props.intl.formatMessage({
          id: "FormasCoste.precioCoste",
          defaultMessage: "Precio Coste",
        }),
      },
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) =>
          row.divisa?.description ? row.divisa?.description : "",
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Almacen.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article?.description ? row.article?.description : "",
      },
    ],
    URL: API.formesCost,
    listKey: "formaCosts",
  };
  return <ReactGrid id="formesCost" configuration={listConfiguration} />;
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
)(FormaCosteList);
