import React, {useEffect} from "react";
import * as API from "../../../redux/api";
import ReactGrid from "modules/ReactGrid";


const BudgetList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Articulos.titulo",
        defaultMessage: "Artículos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Artículos", href:"/ecom/articulos"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Artículos"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
     
      {
        name: 'descripcioCurta',
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre"
        }),
      
      },
      {
        name: 'familia',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.titulo",
          defaultMessage: "Familia"
        }),
        getCellValue: row => row.familia?.description ?? ""
      },
      {
        name: 'pvp',
        title: props.intl.formatMessage({
          id: "Articulos.precio",
          defaultMessage: "Precio"
        })
      },
      {
        name: 'iva',
        title: props.intl.formatMessage({
          id: "Iva.titulo",
          defaultMessage: "IVA"
        }),
        getCellValue: row => row.iva?.description ?? ""
      },
    ],
    URL: API.articles,
    listKey: 'articles'
  };

 
  return (
    <>
      <ReactGrid id='articles'
                 configuration={listConfiguration} />
    </>
  )
};

export default BudgetList;