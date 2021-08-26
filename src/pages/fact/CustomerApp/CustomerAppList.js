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

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const COMERCIALNAME = props.intl.formatMessage({
    id: "Presupuestos.nombreComercialCliente",
    defaultMessage: "Nombre Comercial",
  });
  const EMPRESA = props.intl.formatMessage({
    id: "PieDocumento.empresa",
    defaultMessage: "Empresa",
  });

  const empresa = {
    placeHolder: EMPRESA,
    type: "LOV",
    key: "empresa",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "empresas",
      labelKey: (data) => `${data.nomComercial} (${data.codi})`,
      sort: "nomComercial",
      cannotCreate: true,
      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: COMERCIALNAME, name: "nomComercial" },
      ],
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "aplicacioCodi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "aplicacio",
        title: props.intl.formatMessage({
          id: "AplicacionesCliente.aplicacion",
          defaultMessage: "Aplicación",
        }),
      },
      {
        name: "percentatge",
        title: props.intl.formatMessage({
          id: "AplicacionesCliente.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) => row.client?.description ?? "",
        inlineEditionDisabled: true,
      },
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa",
        }),
        getCellValue: (row) => row.empresa?.description ?? "",
        field: empresa,
      },
    ],
    URL: API.altresAplicacionsClient,
    listKey: "altraAplicacioClients",
    enableInlineEdition: true,
  };
  return (
    <ReactGrid id="altresAplicacionsClient" configuration={listConfiguration} />
  );
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
