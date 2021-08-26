import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { Chip } from "@material-ui/core";
const SubClientList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Subclientes.titulo",
        defaultMessage: "Subclientes",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Subclientes.titulo",
          defaultMessage: "Subclientes",
        }),
        href: "/fact/subclientes",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },

      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) =>
          row.client?.description ? row.client.description : "",
      },
      {
        name: "bloquejat",
        title: props.intl.formatMessage({
          id: "Clientes.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        getCellValue: (row) =>
          row.bloquejat && row.bloquejat === true
            ? `${props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}`
            : `${props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}`,
      },
    ],
    URL: API.subClients,
    listKey: "subClients",
  };
  return <ReactGrid id="subClients" configuration={listConfiguration} />;
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
)(SubClientList);
