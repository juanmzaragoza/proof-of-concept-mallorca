import React, {useEffect, useState} from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { Chip } from "@material-ui/core";

const ProductsList = ({actions, ...props}) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Productos.titulo",
        defaultMessage: "Productos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Productos", href:"/fact/productos"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Productos.titulo",
      defaultMessage: "Productos"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
      {
        name: 'nom',
        title: NOM,
      },
      {
        name: 'abreviatura',
        title: props.intl.formatMessage({
          id: "Productos.abrv",
          defaultMessage: "Abreviatura"
        }),
      },
      {
        name: 'referencia',
        title: props.intl.formatMessage({
          id: "Productos.referencia",
          defaultMessage: "Referencia"
        }),
      },
      {
        name: "actiu",
        title: props.intl.formatMessage({
          id: "Productos.activo",
          defaultMessage: "Activo"
        }),
        getCellValue: row => (row.actiu && row.actiu === true)?
          <Chip label={props.intl.formatMessage({id: "Comun.SI", defaultMessage: "SI"})} />
          :
          <Chip label={props.intl.formatMessage({id: "Comun.NO", defaultMessage: "NO"})} />
      },
      {
        name: "visible",
        title: props.intl.formatMessage({
          id: "Productos.visible",
          defaultMessage: "Visible"
        }),
        getCellValue: row => (row.visible && row.visible === true)?
          <Chip label={props.intl.formatMessage({id: "Comun.SI", defaultMessage: "SI"})} />
          :
          <Chip label={props.intl.formatMessage({id: "Comun.NO", defaultMessage: "NO"})} />
      },

      
    ],
    URL: API.productes,
    listKey: 'productes'
  };


  return (
    <>
      <ReactGrid id='productes'
                 configuration={listConfiguration} />
    </>
  )
};

export default ProductsList;