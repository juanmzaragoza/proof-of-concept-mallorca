import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const StoreList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PuntoVenta.titulo",
        defaultMessage: " Punto Venta"
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Punto Venta", href: "/ecom/punto-ventas" }
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "PuntoVenta.titulo",
      defaultMessage: "Punto Venta"
    }),
    columns: [
      {
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      {
        name: 'nom',
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre"
        })
      },

      {
        name: 'divisa.description',
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa"
        }),
        getCellValue: row => row.divisa?.description ? row.divisa.description : ""
      },
      {
        name: 'client.description',
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes "
        }),
        getCellValue: row => row.client?.description ? row.client.description : ""
      },
      {
        name: 'documentPagamentCobrament.description',
        title: props.intl.formatMessage({
          id: "DocumentosPago.titulo",
          defaultMessage: "Documento Pagos "
        }),
        getCellValue: row => row.documentPagamentCobrament?.description ? row.documentPagamentCobrament.description : ""
      },
    ],
    URL: API.puntVenda,
    listKey: 'puntVendas'
  };


  return (
    <>
      <ReactGrid id='puntVenda'
                 configuration={listConfiguration} />
    </>
  )
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
  connect(null, mapDispatchToProps)
)(StoreList);
