import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const StoreList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "PuntoVenta.titulo",
        defaultMessage: " Punto Venta",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Punto Venta", href: "/ecom/punto-ventas" },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const divisa = {
    placeHolder: props.intl.formatMessage({
      id: "Presupuestos.divisa",
      defaultMessage: "Divisa",
    }),
    type: "LOV",
    key: "divisa",
    id: "divisas",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "divisas",
      labelKey: formatCodeAndName,
      sort: "descripcio",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const cliente = {
    placeHolder: props.intl.formatMessage({
      id: "Presupuestos.cliente",
      defaultMessage: "Cliente",
    }),
    type: "LOV",
    key: "client",
    id: "cliente",

    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "clients",
      labelKey: (data) => `${data.nomComercial} (${data.codi})`,
      sort: "descripcio",
      cannotCreate: true,
      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: NOM, name: "nomComercial" },
      ],
    },
  };
  const doc = {
    placeHolder: props.intl.formatMessage({
      id: "Presupuestos.documentoPago",
      defaultMessage: "Documento pago/cobro",
    }),
    type: "LOV",
    key: "documentPagamentCobrament",
    id: "documentPagamentCobraments",
    required: true,
    breakpoints: {
      xs: 12,
      md: 4,
    },
    selector: {
      key: "documentPagamentCobraments",
      labelKey: formatCodeAndDescription,
      sort: "descripcio",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "PuntoVenta.titulo",
      defaultMessage: "Punto Venta",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },

      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) =>
          row.divisa?.description ? row.divisa.description : "",
          field:divisa
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes ",
        }),
        getCellValue: (row) =>
          row.client?.description ? row.client.description : "",
          field:cliente
      },
      {
        name: "documentPagamentCobrament",
        title: props.intl.formatMessage({
          id: "DocumentosPago.titulo",
          defaultMessage: "Documento Pagos ",
        }),
        getCellValue: (row) =>
          row.documentPagamentCobrament?.description
            ? row.documentPagamentCobrament.description
            : "",
            field:doc
      },
    ],
    URL: API.puntVenda,
    listKey: "puntVendas",
    enableInlineEdition: true
  };

  return (
    <>
      <ReactGrid id="puntVenda" configuration={listConfiguration} />
    </>
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
)(StoreList);
