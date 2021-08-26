import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators,compose} from "redux";

import ReactGrid from "modules/ReactGrid";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import * as API from "redux/api";

const ArticlesBrandList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "ArticulosMarca.titulo",
        defaultMessage: "Marca artículos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "ArticulosMarca.titulo",
          defaultMessage: "Modelo artículos"
        }), href:"/ecom/marca-articulos"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        }),
        inlineEditionDisabled: true
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
    ],
    URL: API.articleMarcas,
    listKey: 'articleMarcas',
    enableInlineEdition: true
  };
  return (
    <ReactGrid
      id='articleMarcas'
      configuration={listConfiguration} />
  );
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch)
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(ArticlesBrandList);