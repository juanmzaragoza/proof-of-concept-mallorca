import React, { useEffect } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";

const SuppliersOrdersList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PedidosProveedoes.titulo",
        defaultMessage: "Pedidos Proveedores",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Pedidos Proveedores", href: "fact/pedidos-proveedores" },
    ]);
  }, []);


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "PedidosProveedores.titulo",
      defaultMessage: "Pedidos Proveedores",
    }),
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PedidosProveedores.numero",
          defaultMessage: "Número ",
        }),
      },
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "PedidosProveedores.fecha",
          defaultMessage: "Fecha ",
        }),
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "PedidosProveedores.estado",
          defaultMessage: "Estado ",
        }),
      },

      {
        name: "divisa.description",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Familia",
        }),
        getCellValue: (row) => (row.divisa ? row.divisa.description : ""),
      },
      {
        name: "projecte.description",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => (row.projecte ? row.projecte.description : ""),
      },
      
    ],
    URL: API.comandesProveidor,
    listKey: "comandaProveidors",
  };

  return (
    <>
      <ReactGrid id="comandesProveidor" configuration={listConfiguration} />
    </>
  );
};

export default SuppliersOrdersList;
