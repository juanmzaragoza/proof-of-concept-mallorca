import React, {useEffect} from "react";
import * as API from "../../../redux/api";
import ReactGrid from "modules/ReactGrid";


const CustomerBudgetList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuestos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Presupuestos", href:"/fact/presupuestos"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Presupuestos.titulo",
      defaultMessage: "Presupuestos"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
     
      {
        name: 'data',
        title: props.intl.formatMessage({
          id: "Presupuestos.fecha",
          defaultMessage: "Fecha"
        }),
        getCellValue: row => row.data ? new Date(row.data).toLocaleDateString() : ""
      },
      {
        name: 'estat',
        title: props.intl.formatMessage({
          id: "Presupuestos.estado",
          defaultMessage: "estado"
        }),
      },
      {
        name: 'nomClient',
        title: props.intl.formatMessage({
          id: "Presupuestos.nombreCliente",
          defaultMessage: "Nombre Cliente"
        })
      },
    ],
    URL: API.pressupost,
    listKey: 'pressuposts'
  };

 
  return (
    <>
      <ReactGrid id='pressupost'
                 configuration={listConfiguration} />
    </>
  )
};

export default CustomerBudgetList;