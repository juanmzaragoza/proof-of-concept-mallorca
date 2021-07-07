import React, {useEffect, useState} from "react";
import * as API from "redux/api";
import AdvancedFilters from "modules/AdvancedFilters";
import ReactGrid from "modules/ReactGrid";

const ProjectsList = ({actions, ...props}) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proyectos.titulo",
        defaultMessage: "Proyectos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Proyectos", href:"/proyectos"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Proyectos.titulo",
      defaultMessage: "Proyectos"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
      {
        name: 'nom',
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre"
        })
      },
      {
        name: 'responsable',
        title: props.intl.formatMessage({
          id: "Proyectos.responsable",
          defaultMessage: "Responsable"
        }),
      },
      {
        name: 'valorEstimat',
        title: props.intl.formatMessage({
          id: "Proyectos.valorEstimado",
          defaultMessage: "Valor Estimado"
        })
      },
    ],
    URL: API.projectes,
    listKey: 'projectes'
  };

  const advancedFilters = [
    {
      placeHolder: CODE,
      type: 'input',
      key: 'codi',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: NOM,
      type: 'input',
      key: 'nom',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.clientes",
          defaultMessage: "Clientes"
        }),
        type: 'LOV',
        key: 'client',
        breakpoints: {
          xs: 12,
          md: 3
        },
        variant: 'outlined',
        selector: {
          key: 'clients',
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: 'nom',
          cannotCreate: true,
          advancedSearchColumns: [{title: CODE, name: 'codi'},{title: NOM, name: 'nomComercial'}]
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.tipoProyecto",
          defaultMessage: "Tipo proyecto"
        }),
        type: 'LOV',
        key: 'projecteTipus',
        breakpoints: {
          xs: 12,
          md: 3
        },
        variant: 'outlined',
        selector: {
          key: 'projecteTipuses',
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: 'nom',
          cannotCreate: true,
          advancedSearchColumns: [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}]
        },
      },
 
  ];

  return (
    <>
      <AdvancedFilters fields={advancedFilters} handleSearch={setFilters} />
      <ReactGrid id='projectes'
                 extraQuery={filters}
                 configuration={listConfiguration} />
    </>
  )
};

export default ProjectsList;