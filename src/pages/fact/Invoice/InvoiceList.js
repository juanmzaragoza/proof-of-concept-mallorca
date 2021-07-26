import React, {useEffect} from "react";
import * as API from "../../../redux/api";

import ReactGrid from "../../../modules/ReactGrid";

const InvoiceList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Facturas.titulo",
        defaultMessage: "Facturas"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Facturas", href:"/fact/facturas"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Facturas.titulo",
      defaultMessage: "Facturas"
    }),
    columns: [
      {
        name: 'nombreFactura',
        title: CODE
      },
      {
        name: 'client.id',
        title: props.intl.formatMessage({
          id: "Facturas.cliente",
          defaultMessage: "Cliente"
        }),
        getCellValue: row => row.client? row.client.description:""
      },
      {
        name: 'importFactura',
        title: props.intl.formatMessage({
          id: "Facturas.importe",
          defaultMessage: "Importe"
        })
      },
      {
        name: 'diaFactura',
        title: props.intl.formatMessage({
          id: "Facturas.fecha",
          defaultMessage: "Fecha"
        }),
        getCellValue: row => row.diaFactura ? new Date(row.diaFactura).toLocaleDateString() : ""
      },
      {
        name: 'formaPago',
        title: props.intl.formatMessage({
          id: "Facturas.formaPago",
          defaultMessage: "Forma Pago"
        })
      },
    ],
    URL: API.facturas,
    listKey: 'facturas'
  };

 

  return (
    <>
      <ReactGrid id='facturas'
        
                 configuration={listConfiguration} />
    </>
  )
};

export default InvoiceList;