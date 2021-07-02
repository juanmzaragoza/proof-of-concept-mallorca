import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators,compose} from "redux";

import ReactGrid from "modules/ReactGrid";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import * as API from "redux/api";

const ExpirationTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TiposVencimiento.titulo",
        defaultMessage: "Tipos Vencimiento"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "TiposVencimiento.titulo",
          defaultMessage: "Tipos Vencimiento "
        }), href:"/ecom/tipos-vencimiento"}
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
      { name: 'tipus',
        title: props.intl.formatMessage({
          id: "TiposVencimiento.tipo",
          defaultMessage: "Tipo"
        }),
      },
    
    ],
    URL: API.tipusVenciments,
    listKey: 'tipusVenciments'
  };
  return (
    <ReactGrid
      id='tipusVenciments'
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
)(ExpirationTypeList);