import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
//import {default as ReactGrid2} from "modules/ReactGrid2";

const SupplierRatesList = ({ actions, ...props }) => {
  const [filters, setFilters] = useState([]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  useEffect(() => {
    if (query.get("proveedor") === null) {
      setFilters(false);
    } else {
      setFilters(true);
    }

    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TarifasProveedores.titulo",
        defaultMessage: "Tarifas Proveedores",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Tarifas Proveedores", href: "fact/tarifas-proveedor" },
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
      id: "TarifasProveedores.titulo",
      defaultMessage: "Tarifas Proveedores",
    }),
    columns: [
      {
        name: "codi",
        title: CODE,
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "tipusTarifa",
        title: props.intl.formatMessage({
          id: "TarifasProveedores.tipoTarifa",
          defaultMessage: "NIF",
        }),
      },
      {
        name: "proveidor",
        title: props.intl.formatMessage({
          id: "TarifasProveedores.proveedor",
          defaultMessage: "Proveedor",
        }),
        getCellValue: (row) => (row.proveidor ? row.proveidor.description : ""),
        inlineEditionDisabled: true,
      },
    ],
    URL: API.tarifaProveidor,
    listKey: "tarifaProveidors",
    enableInlineEdition: true,
  };

  const filterSupplier = [
    { columnName: "proveidor.codi", value: query.get("proveedor") },
  ];

  return (
    <>
      {filters ? (
        <ReactGrid
          id="tarifaProveidor"
          extraQuery={filterSupplier}
          configuration={listConfiguration}
        />
      ) : (
        <ReactGrid id="tarifaProveidor" configuration={listConfiguration} />
      )}
    </>
  );
};

export default SupplierRatesList;
