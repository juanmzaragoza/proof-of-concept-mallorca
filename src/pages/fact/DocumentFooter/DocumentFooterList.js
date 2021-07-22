import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const DocumentFooterList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PieDocumento.titulo",
        defaultMessage: "Piés Documentos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "PieDocumento.titulo",
        defaultMessage: "Piés Documentos"
        }), href:"/fact/pies-documento"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      { name: 'serieCompraCodi',
        title: props.intl.formatMessage({
          id: "PieDocumento.serieCompra",
          defaultMessage: "Series de Compra"
        })
      },
      { name: 'empresa2',
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa"
        })
      },
    ],
    URL: API.peusDocument,
    listKey: 'peuDocuments'
  };
  return <ReactGrid id="peusDocument" configuration={listConfiguration} />;
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
)(DocumentFooterList);