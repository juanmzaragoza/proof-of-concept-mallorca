import React, { useEffect } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";

const StoreOrdersList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PedidosAlmacen.titulo",
        defaultMessage: "Pedidos Almacén",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Pedidos Almacén", href: "fact/pedidos-almacen" },
    ]);
  }, []);


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "PedidosAlmacen.titulo",
      defaultMessage: "Pedidos Almacén",
    }),
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número ",
        }),
      },
      {
        name: "data",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.fecha",
          defaultMessage: "Fecha ",
        }),
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.estado",
          defaultMessage: "Estado ",
        }),
      },

      {
        name: "magatzem.description",
        title: props.intl.formatMessage({
          id: "PedidosAlmacen.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => (row.magatzem ? row.magatzem.description : ""),
      },
      {
        name: "client.description",
        title: props.intl.formatMessage({
          id: "PedidosAlmacen.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) => (row.client ? row.client.description : ""),
      },
      
    ],
    URL: API.comandesMagatzem,
    listKey: "cmgs",
  };

  return (
    <>
      <ReactGrid id="comandesMagatzem" configuration={listConfiguration} />
    </>
  );
};

export default StoreOrdersList;
