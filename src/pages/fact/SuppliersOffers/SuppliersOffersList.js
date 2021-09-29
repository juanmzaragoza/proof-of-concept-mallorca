import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";

const SuppliersOffersList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "OfertaProveedores.titulo",
        defaultMessage: "Ofertas Proveedores",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Ofertas Proveedores", href: "fact/ofertas-proveedores" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "OfertaProveedores.titulo",
      defaultMessage: "Oferta Proveedores",
    }),
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "OfertaProveedores.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "OfertaProveedores.fecha",
          defaultMessage: "Fecha",
        }),
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "OfertaProveedores.estat",
          defaultMessage: "NIF",
        }),
        getCellValue: (row) => {
          if (row.estat) {
            if (row.estat === "ANULADA") {
              return props.intl.formatMessage({
                id: "Selector.anulada",
                defaultMessage: "Anulada",
              });
            } else if (row.estat === "PENDENT") {
              return props.intl.formatMessage({
                id: "Selector.pendiente",
                defaultMessage: "Pendiente",
              });
            } else {
              return props.intl.formatMessage({
                id: "Selector.asignada",
                defaultMessage: "Asignada",
              });
            }
          }
        },
      },
      {
        name: "divisa.description",
        title: props.intl.formatMessage({
          id: "OfertaProveedores.divisa",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => (row.divisa ? row.divisa?.description : ""),
      },
      {
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "OfertaProveedores.valorDivisa",
          defaultMessage: "Valor Divisa",
        }),
      },
    ],
    URL: API.ofertesProveidor,
    listKey: "ofertaProveidors",
  };

  return (
    <>
      <ReactGrid id="ofertesProveidor" configuration={listConfiguration} />
    </>
  );
};

export default SuppliersOffersList;
