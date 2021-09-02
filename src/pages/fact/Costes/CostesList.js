import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CostesList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Costes.titulo",
        defaultMessage: "Costes",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Costes.titulo",
          defaultMessage: "Costes",
        }),
        href: "/fact/costes",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "tipusCostCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.tipoCoste",
          defaultMessage: "Tipo Coste",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "unitats",
        title: props.intl.formatMessage({
          id: "Costes.unidades",
          defaultMessage: "Unidades",
        }),
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Costes.articulo",
          defaultMessage: "Artículo",
        
        }),
        getCellValue: row => row.article? row.article.description:"",
        inlineEditionDisabled: true
      },
      {
        name: "formaCost",
        title: props.intl.formatMessage({
          id: "Costes.formaCoste",
          defaultMessage: "Forma Coste",
        
        }),
        getCellValue: row => row.formaCost? row.formaCost.description:"",
        inlineEditionDisabled: true
      },
      
      


    ],
    URL: API.costos,
    listKey: "costs",
    enableInlineEdition: true
  };
  return <ReactGrid id="costos" configuration={listConfiguration} />;
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
)(CostesList);
