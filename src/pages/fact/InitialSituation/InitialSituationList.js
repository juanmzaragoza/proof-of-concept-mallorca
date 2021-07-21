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

const InitialSituationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "SituacionesIniciales.titulo",
        defaultMessage: " Situaciones Iniciales",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Situaciones Iniciales", href: "/fact/situaciones-iniciales" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "SituacionesIniciales.titulo",
      defaultMessage: "Periodo Almacén",
    }),
    columns: [
      {
        name: "magatzemCodi",
        title: props.intl.formatMessage({
          id:  "SituacionesIniciales.codigoAlmacen",
          defaultMessage: "Código Almacén",
        }),
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Alamcen.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article.description ? row.article?.description : "",
      },

      {
        name: "unitatsInicials",
        title: props.intl.formatMessage({
          id: "Almacen.unidadesIniciales",
          defaultMessage: "Unidades Iniciales",
        }),
      },

      {
        name: "preuCostUnitari",
        title: props.intl.formatMessage({
          id: "Almacen.precioCoste",
          defaultMessage: "Precio Coste Unitario ",
        }),
      },

      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisas",
        }),
        getCellValue: (row) =>
          row.divisa.description ? row.divisa?.description : "",
      },

      {
        name: "magatzemPeriode",
        title: props.intl.formatMessage({
          id: "Almacen.almacenPeriodo",
          defaultMessage: "Almacén Periodo",
        }),
        getCellValue: (row) =>
          row.magatzemPeriode.description
            ? row.magatzemPeriode?.description
            : "",

      },
    ],
    URL: API.situacionsInicial,
    listKey: "situacioInicials",
  };

  return (
    <>
      <ReactGrid id="situacionsInicial" configuration={listConfiguration} />
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
)(InitialSituationList);
