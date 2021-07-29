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
import { Chip } from "@material-ui/core";

const InvoiceComplementList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "ComplementosFactura.titulo",
        defaultMessage: " Complementos Factura",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.titulo",
          defaultMessage: "Complemento sFactura",
        }),
        href: "/fact/complementos-factura",
      },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "ComplementosFactura.titulo",
      defaultMessage: "Complementos Factura",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripcion",
        }),
      },
      {
        name: "incrementarFactura",
        title: props.intl.formatMessage({
          id: "ComplementosFactura.incrementarFactura",
          defaultMessage: "Incrementar Factura",
        }),
        getCellValue: (row) =>
          row.incrementarFactura && row.incrementarFactura === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
      {
        name: "incrementarBaseImposable",
        title: props.intl.formatMessage({
          id: "ComplementosFactura.incrementarBase",
          defaultMessage: "Incrementar Base",
        }),
        getCellValue: (row) =>
          row.incrementarBaseImposable && row.incrementarBaseImposable === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
      {
        name: "aplicarDescompte",
        title: props.intl.formatMessage({
          id: "ComplementosFactura.aplicarDto",
          defaultMessage: "Aplicar Descuento",
        }),
        getCellValue: (row) =>
          row.aplicarDescompte && row.aplicarDescompte === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
      {
        name: "distribuirCostosEntreArticles",
        title: props.intl.formatMessage({
          id: "ComplementosFactura.distribuirCostes",
          defaultMessage: "Distribuir costes entre Artículos",
        }),
        getCellValue: (row) =>
          row.distribuirCostosEntreArticles &&
          row.distribuirCostosEntreArticles === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
    ],
    URL: API.complementsFactura,
    listKey: "complementFacturas",
  };

  return (
    <>
      <ReactGrid id="complementsFactura" configuration={listConfiguration} />
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
)(InvoiceComplementList);
