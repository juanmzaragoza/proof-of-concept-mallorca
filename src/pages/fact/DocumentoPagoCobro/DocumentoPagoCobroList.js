import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const DocumentoPagoCobroList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "DocumentosPago.titulo",
        defaultMessage: "Documentos pago/cobro"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "DocumentosPago.titulo",
        defaultMessage: "Documentos pago/cobro"
        }), href:"/fact/documentos-pago-cobro"}
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
        name: 'naturalesaPagamentCobrament',
        title: props.intl.formatMessage({
          id: "DocumentosPago.naturaleza",
          defaultMessage: "Naturaleza pago/cobro"
        }),
        getCellValue: row => row.naturalesaPagamentCobrament?.description ?? ""
      },
      { 
        name: 'iva',
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.cantidadIva",
          defaultMessage: "IVA"
        }),
        getCellValue: row => row.iva?.description ?? ""
      },
      { 
        name: 'regimIva',
        title: props.intl.formatMessage({
          id: "Clientes.regimen.iva",
          defaultMessage: "Régimen IVA"
        }),
        getCellValue: row => row.regimIva?.description ?? ""
      },
    ],
    URL: API.documentPagament,
    listKey: 'documentPagamentCobraments'
  };
  return <ReactGrid id="documentPagament" configuration={listConfiguration} />;
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
)(DocumentoPagoCobroList);