import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const MaturityTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento"
        }), href:"/fact/tipo-vencimiento"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { 
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      { 
        name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      { 
        name: 'tipus',
        title: props.intl.formatMessage({
          id: "Clientes.tipo",
          defaultMessage: "tipo"
        })
      },
      { 
        name: 'importTermini',
        title: props.intl.formatMessage({
          id: "TiposVencimiento.importeTerminio",
          defaultMessage: "Importe Terminio"
        })
      },
    ],
    URL: API.tipusVenciment,
    listKey: 'tipusVenciments'
  };
  return <ReactGrid id="tipusVenciment" configuration={listConfiguration} />;
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
)(MaturityTypeList);