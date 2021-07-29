import React from "react";
import { injectIntl } from "react-intl";
import ReactGrid from "../../../modules/ReactGrid";

import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { connect } from "react-redux";

const PriceTab = ({ actions, getFormData, ...props }) => {

  const listConfiguration = {
    disabledFiltering: true,
    disabledActions: true,
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
    method: 'post',
    body: {
      "tarifaTipus": getFormData('tarifaTipus'),
      "formaCalcul": getFormData('formaCalcul'),
      "percentatgeMaterial": getFormData('percentatgeMaterial'),
      "percentatgeMaObra": getFormData('percentatgeMaObra')
    },
    listKey: 'articles'
  };
  return <ReactGrid id="articlesFactByTarifa" configuration={listConfiguration} />;
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