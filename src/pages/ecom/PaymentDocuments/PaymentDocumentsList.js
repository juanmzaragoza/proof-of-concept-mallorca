import React, {useEffect} from "react";
import * as API from "../../../redux/api";
import ReactGrid from "modules/ReactGrid";


const PaymentDocumentList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "DocumentosPago.titulo",
        defaultMessage: "Documentos pago/cobro"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Documentos pago/cobro", href:"/ecom/documentos-pago"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "DocumentosPago.titulo",
      defaultMessage: "Documentos Pago/Cobro"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
     
      {
        name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        }),
       
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
          id: "Iva.titulo",
          defaultMessage: "IVA"
        }),
        getCellValue: row => row.iva?.description ?? ""
      },

      {
        name: 'regimIva',
        title: props.intl.formatMessage({
          id: "RegimenIva.titulo",
          defaultMessage: "Reǵimen IVA"
        }),
        getCellValue: row => row.regimIva?.description ?? ""
      },
    ],
    URL: API.documentPagamentCobraments,
    listKey: 'documentPagamentCobraments'
  };

 
  return (
    <>
      <ReactGrid id='documentPagamentCobraments'
                 configuration={listConfiguration} />
    </>
  )
};

export default PaymentDocumentList;