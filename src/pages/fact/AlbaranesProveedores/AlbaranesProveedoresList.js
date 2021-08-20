import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { Chip } from "@material-ui/core";

const AlbaranesProveedoresList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "AlbaranesProveedor.titulo",
        defaultMessage: "Albaranes Proveedor",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Albaranes Proveedor", href: "fact/albaranes-proveedores" },
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
      id: "AlbaranesProveedor.titulo",
      defaultMessage: "Albaranes Proveedor",
    }),
    columns: [
   
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "AlbaranesCliente.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },
      {
        name: "proveidor.id",
        title: props.intl.formatMessage({
          id: "AlbaranesProveedor.proveedor",
          defaultMessage: "Proveedor",
        }),
        getCellValue: (row) => (row.proveidor ? row.proveidor.description : ""),
      },
      {
        name: "conformat",
        title: props.intl.formatMessage({
          id: "AlbaranesProveedor.conformado",
          defaultMessage: "Conformado",
        }),
        getCellValue: (row) =>
          row.conformat && row.conformat === "S" ? (
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
    URL: API.albaransProveidor,
    listKey: "albaraProveidors",
  };

  return (
    <>
      <ReactGrid id="albaransProveidor" configuration={listConfiguration} />
    </>
  );
};

export default AlbaranesProveedoresList;
