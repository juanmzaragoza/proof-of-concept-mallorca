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
