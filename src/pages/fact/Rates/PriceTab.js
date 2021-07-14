import React, { useEffect,useState} from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import ReactGrid from "../../../modules/ReactGrid";
import * as API from "../../../redux/api";

import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { connect } from "react-redux";


const PriceTab = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Articulos.titulo",
        defaultMessage: "Artículos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "Articulos.titulo",
        defaultMessage: "Artículos"
        }), href:"/tarifes"}
    ]);
  },[]);

  const listConfiguration = {
    disabledFiltering: true,
    columns: [
      {
         name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        })
      },
      { 
        name: 'descripcioCurta',
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre"
        })
      },
      { 
        name: 'alies',
        title: props.intl.formatMessage({
          id: "Articulos.alias",
          defaultMessage: "Alias"
        }),
      },
      { 
        name: 'preuCostTeo',
        title: props.intl.formatMessage({
          id: "Articulos.precio",
          defaultMessage: "Precio"
        }),
      },
    ],
    URL: API.articlesFact,
    listKey: 'articles'
  };
  return <ReactGrid id="articlesFact" configuration={listConfiguration} />;
};

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
)(PriceTab);