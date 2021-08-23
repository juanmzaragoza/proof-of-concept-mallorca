import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { Chip } from "@material-ui/core";

const AlbaranesClientesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "AlbaranesCliente.titulo",
        defaultMessage: "Albaranes Cliente",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Albaranes Cliente", href: "fact/albaranes-clientes" },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "AlbaranesCliente.titulo",
      defaultMessage: "Albaranes Cliente",
    }),
    columns: [
      {
        name: "serieVenda.description",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.serieVenta",
          defaultMessage: "Serie Ventas",
        }),
        getCellValue: (row) =>
          row.serieVenda ? row.serieVenda.description : "",
      },
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "data",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.data ? new Date(row.data).toLocaleDateString() : "",
      },
      {
        name: "client.id",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) => (row.client ? row.client.description : ""),
      },
      {
        name: "facturable",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.facturable",
          defaultMessage: "facturable",
        }),
        getCellValue: (row) =>
          row.facturable && row.facturable === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
    ],
    URL: API.albarans,
    listKey: "albaras",
  };

  return (
    <>
      <ReactGrid id="albarans" configuration={listConfiguration} />
    </>
  );
};

export default AlbaranesClientesList;
