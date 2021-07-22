import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ApplicationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Aplicaciones.titulo",
        defaultMessage: "Aplicaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Aplicaciones.titulo",
          defaultMessage: "Aplicaciones",
        }),
        href: "/fact/aplicaciones",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [

      {
        name: "referencia",
        title: props.intl.formatMessage({
          id:  "Proyectos.referencia",
          defaultMessage: "Referencia",
        }),
      },
      {
        name: "client.description",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        getCellValue: (row) => row.client?.description ?? "",
      },
      {
        name: "producte.description",
        title: props.intl.formatMessage({
          id: "Proyectos.producto",
          defaultMessage: "Producto",
        }),
        getCellValue: (row) => row.producte?.description ?? "",
      },
      {
        name: "tipusManteniment",
        title: props.intl.formatMessage({
          id:  "Aplicaciones.tipoMantenimiento",
          defaultMessage: "Tipo Mantenimiento",
        }),
      },
      {
        name: "idf",
        title: props.intl.formatMessage({
          id:"Aplicaciones.identificador",
          defaultMessage: "Identificador",
        }),
      },
      {
        name: "servidor",
        title: props.intl.formatMessage({
          id:  "Aplicaciones.servidor",
          defaultMessage: "Servidor",
        }),
      },
   
    ],
    URL: API.aplicacions,
    listKey: "aplicacios",
  };
  return <ReactGrid id="aplicacions" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ApplicationList);
