import React, { useEffect } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";

const AreasNegocioList = ({ actions, ...props }) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "AreasNegocio.titulo",
        defaultMessage: "Areas Negocio",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Areas Negocio", href: "fact/areas-negocio" },
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
      id: "AreasNegocio.titulo",
      defaultMessage: "Areas Negocio",
    }),
    columns: [
      {
        name: "codi",
        title: CODE,
      },
      {
        name: "nom",
        title: NOM
      },
      {
        name: "comptabilitatCompteExistencies",
        title: props.intl.formatMessage({
          id: "AreasNegocio.cuentaExistencias",
          defaultMessage: "Cuenta Existencias",
        }),
      },
      {
        name: "compteMagatzem",
        title: props.intl.formatMessage({
          id: "AreasNegocio.cuentaAlmacen",
          defaultMessage: "Cuenta Almacén",
        }),
      },
      {
        name: "compteObraExecutada",
        title: props.intl.formatMessage({
          id: "AreasNegocio.cuentaObraEjecutada",
          defaultMessage: "Cuenta obra ejecutada pendiente certificar",
        }),
      },
      {
        name: "comptabilitatCompteCostos",
        title: props.intl.formatMessage({
          id: "AreasNegocio.cuentaCostes",
          defaultMessage: "Cuenta Costes",
        }),
      },
    //   {
    //     name: "comptabilitatCompteClients",
    //     title: props.intl.formatMessage({
    //       id: "AreasNegocio.cuentaCliente",
    //       defaultMessage: "Cuenta Cliente",
    //     }),
    //   },
    //   {
    //     name: "comptabilitatCompteProveidors",
    //     title: props.intl.formatMessage({
    //       id: "AreasNegocio.cuentaProveedor",
    //       defaultMessage: "Cuenta Proveedor",
    //     }),
    //   },
    //   {
    //     name: "comptabilitatCodi",
    //     title: props.intl.formatMessage({
    //       id: "AreasNegocio.codigoContable",
    //       defaultMessage: "Código contable",
    //     }),
    //   },
    ],
    URL: API.areaNegocis,
    listKey: "areaNegocis",
  };

  return <ReactGrid id="areaNegocis" configuration={listConfiguration} />;
};

export default AreasNegocioList;
