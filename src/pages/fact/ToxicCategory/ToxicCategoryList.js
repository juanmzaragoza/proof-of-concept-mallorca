import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ToxicCategoryList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CategoriaTox.titulo",
        defaultMessage: "Categorías Toxicológicas",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CategoriaTox.titulo",
          defaultMessage: "Categorías Toxicológicas",
        }),
        href: "/fact/categorias-toxicologicas",
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
        name: "empresaCodi",
        title: props.intl.formatMessage({
          id: "CategoriaTox.empresaCodigo",
          defaultMessage: "Código Empresa",
        }),
      },
      {
        name: "peuDocument",
        title: props.intl.formatMessage({
          id: "CategoriaTox.pieDocumento",
          defaultMessage: "Pie Documento",
        }),
        getCellValue: (row) => row.peuDocument?.description ?? "",
      },
    ],
    URL: API.categoriaToxicologica,
    listKey: "categoriaToxicologicas",
  };
  return (
    <ReactGrid id="categoriaToxicologica" configuration={listConfiguration} />
  );
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
)(ToxicCategoryList);
