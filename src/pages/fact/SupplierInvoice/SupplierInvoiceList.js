import React, { useEffect } from "react";
import * as API from "../../../redux/api";

import ReactGrid from "../../../modules/ReactGrid";

const SupplierInvoiceList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FacturasProveedor.titulo",
        defaultMessage: "Facturas Proveedor",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Facturas Proveedor", href: "/fact/facturas-proveedores" },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.titulo",
      defaultMessage: "Facturas Proveedor",
    }),
    columns: [
      {
        name: "numero",
        title:  props.intl.formatMessage({
            id: "FacturasProveedor.numero",
            defaultMessage: "Número",
          }),
      },
      {
        name: "proveidor.id",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.proveedor",
          defaultMessage: "Proveedor",
        }),
        getCellValue: (row) => (row.proveidor ? row.proveidor.description : ""),
      },
     
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "Facturas.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },
      {
        name: "facturaBruto",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.bruto",
          defaultMessage: "Importe Bruto",
        }),
      },
      {
        name: "baseImposable",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.base",
          defaultMessage: "Base Imponible",
        }),
      },

      {
        name: "facturaTotal",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.total",
          defaultMessage: "Total",
        }),
      },
     
    ],
    URL: API.facturesProveidor,
    listKey: "facturaProveidors",
  };

  return (
    <>
      <ReactGrid id="facturesProveidor" configuration={listConfiguration} />
    </>
  );
};

export default SupplierInvoiceList;
