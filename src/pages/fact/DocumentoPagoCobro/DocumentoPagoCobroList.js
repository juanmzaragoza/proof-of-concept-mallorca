import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";
import { Chip } from "@material-ui/core";

const DocumentoPagoCobroList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "DocumentosPago.titulo",
        defaultMessage: "Documentos pago/cobro",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.titulo",
          defaultMessage: "Documentos pago/cobro",
        }),
        href: "/fact/documentos-pago-cobro",
      },
    ]);
  }, []);
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const naturalesaPagamentCobrament = {
    placeHolder: props.intl.formatMessage({
      id: "DocumentosPago.naturalezaPago",
      defaultMessage: "Naturaleza pago",
    }),
    type: "LOV",
    key: "naturalesaPagamentCobrament",
    id: "naturalesaPagoCobro",
    breakpoints: {
      xs: 12,
      md: 4,
    },
    selector: {
      key: "naturalesaPagamentCobraments",
      labelKey: (data) => `${data.descripcio} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const listConfiguration = {
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
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.controlarEfectos",
          defaultMessage: "Controlar efectos",
        }),

        name: "controlarEfectes",
        getCellValue: (row) =>
          row.controlarEfectes ? row.controlarEfectes : false,
      },
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.agruparVencimiento",
          defaultMessage: "Agrupar vencimiento en remesas",
        }),
        name: "agruparVencimentsRemeses",
        getCellValue: (row) =>
          row.agruparVencimentsRemeses ? row.agruparVencimentsRemeses : false,
      },

      {
        name: "naturalesaPagamentCobrament",
        title: props.intl.formatMessage({
          id: "DocumentosPago.naturaleza",
          defaultMessage: "Naturaleza pago/cobro",
        }),
        getCellValue: (row) =>
          row.naturalesaPagamentCobrament
            ? row.naturalesaPagamentCobrament.description
            : "",
        field: naturalesaPagamentCobrament,
      },
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.numeroDias",
          defaultMessage: "Número días valoración",
        }),

        name: "numeroDias",
      },
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.diasEfectosNegociados",
          defaultMessage: "Días para efectos negociados",
        }),
        name: "diaEfectosNegociados",
      },
      {
        title: props.intl.formatMessage({
          id: "DocumentosPago.aplicarDescuentos",
          defaultMessage: "Aplicar descuentos pronto pago",
        }),
        name: "aplicarDescuentosProntoPago",
        getCellValue: (row) =>
          row.aplicarDescuentosProntoPago
            ? row.aplicarDescuentosProntoPago
            : false,
      },
    ],
    URL: API.documentPagament,
    listKey: "documentPagamentCobraments",
    enableInlineEdition: true,
  };
  return <ReactGrid id="documentPagament" configuration={listConfiguration} />;
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
)(DocumentoPagoCobroList);
