import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CustomerAppList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "AplicacionesCliente.titulo",
        defaultMessage: "Aplicaciones Cliente",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "AplicacionesCliente.titulo",
          defaultMessage: "Aplicaciones Cliente",
        }),
        href: "/fact/aplicaciones-cliente",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "aplicacioCodi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: row => row.client?.description ?? ""
      },
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa",
        }),
        getCellValue: row => row.empresa?.description ?? ""
      },
    ],
    URL: API.altresAplicacionsClient,
    listKey: "altraAplicacioClients",
  };
  return <ReactGrid id="altresAplicacionsClient" configuration={listConfiguration} />;
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
)(CustomerAppList);
