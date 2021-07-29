import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";

const WorkShopList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Talleres.titulo",
        defaultMessage: "Talleres",
      }),
    });
    actions.setBreadcrumbHeader([{ title: "Talleres", href: "fact/talleres" }]);
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
      id: "Talleres.titulo",
      defaultMessage: "Talleres",
    }),
    columns: [
      {
        name: "codi",
        title: CODE,
      },
      {
        name: "nom",
        title: NOM,
      },
      {
        name: "direccio",
        title: props.intl.formatMessage({
          id: "Comun.direccion",
          defaultMessage: "Dirección",
        }),
      },
      {
        name: "magatzem.id",
        title: props.intl.formatMessage({
          id: "Presupuestos.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => (row.magatzem ? row.magatzem.description : ""),
      },
      {
        name: "projecte.id",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => (row.projecte ? row.projecte.description : ""),
      },
      {
        name: "col",
        title: props.intl.formatMessage({
          id: "Talleres.color",
          defaultMessage: "Color",
        }),
      },
    ],
    URL: API.tallers,
    listKey: "tallers",
  };

  return <ReactGrid id="tallers" configuration={listConfiguration} />;
};

export default WorkShopList;
