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
        })
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      { name: 'concedimCredit',
        title: props.intl.formatMessage({
          id: "TiposFacturacion.concedemosCredito",
          defaultMessage: "Concedemos Crédito"
        }),
        getCellValue: row => row.concedimCredit ? (
          <FormattedMessage id={"Comun.si"} defaultMessage={"Si"} />
        ) : (
          <FormattedMessage id={"Comun.no"} defaultMessage={"No"} />
        ),
      },
    
    ],
    URL: API.tipusFacturacions,
    listKey: 'tipusFacturacios'
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