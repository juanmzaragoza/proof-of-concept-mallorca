import React, {useEffect} from "react";
import * as API from "../../../redux/api";

import ReactGrid from "../../../modules/ReactGrid";

const CompanyList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Empresas.titulo",
        defaultMessage: "Empresas"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Empresas", href:"/fact/empresas"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Empresas.titulo",
      defaultMessage: "Empresas"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
      {
        name: 'nomComercial',
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_comercial",
          defaultMessage: "Nombre Comercial"
        })
      },
      {
        name: 'nif',
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "NIF"
        })
      },
      {
        name: 'familiaProveidor.id',
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa"
        }),
        getCellValue: row => row.divisa? row.divisa.description:""
      },
    
    ],
    URL: API.empresa,
    listKey: 'empresas'
  };


  return (
    <>
      <ReactGrid id='empresa'
                 configuration={listConfiguration} />
    </>
  )
};

export default CompanyList;