import React, { useEffect } from "react";
import ReactGrid from "modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const ArticlesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaArticulos.titulo",
        defaultMessage: "Familia Artículos",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.titulo",
          defaultMessage: "Familia Artículos",
        }),
        href: "/ecom/familia-articulos",
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
        name: "artExportables",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.artExportables",
          defaultMessage: "Artiículos exportables",
        }),
        getCellValue: row => row.artExportables === true ?  "SI" : "NO"
      },
     
    ],
    URL: API.articleFamilias,
    listKey: "articleFamilias",
  };
  return <ReactGrid id="articleFamilias" configuration={listConfiguration} />;
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
)(ArticlesList);
