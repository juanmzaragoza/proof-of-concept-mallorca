import React, {useEffect} from "react";
import {FormattedMessage,injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators,compose} from "redux";

import ReactGrid from "modules/ReactGrid";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import * as API from "redux/api";

const BillingTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TiposFacturacion.titulo",
        defaultMessage: "Tipos Facturacion"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "TiposFacturacion.titulo",
          defaultMessage: "Tipos facturación "
        }), href:"/ecom/tipos-facturacion"}
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
      {
        name: "concedimCredit",
        title: props.intl.formatMessage({
          id:  "TiposFacturacion.obligarFacturar",
          defaultMessage: "Obligar a Facturar los Albranes"
        }),
        getCellValue: (row) =>
          row.concedimCredit && row.concedimCredit === true ? (
            `${props.intl.formatMessage({
              id: "Comun.SI",
              defaultMessage: "SI",
            })}`
          ) : (
            `${props.intl.formatMessage({
              id: "Comun.NO",
              defaultMessage: "NO",
            })}`
           
          ),
          inlineEditionDisabled: true
      },
    
    
    ],
    URL: API.tipusFacturacions,
    listKey: 'tipusFacturacios',
    enableInlineEdition: true
  };
  return (
    <ReactGrid
      id='tipusFacturacions'
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
)(BillingTypeList);