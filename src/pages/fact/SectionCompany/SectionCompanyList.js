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

const SectionCompanyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "SeccionEmpresa.titulo",
        defaultMessage: "Sección Empresa",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Sección Empresa", href: "/fact/secciones-empresa" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "SeccionEmpresa.titulo",
      defaultMessage: "Sección Empresa",
    }),
    columns: [
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "SeccionEmpresa.familiaArticulo",
          defaultMessage: "Familia Artículo ",
        }),
        getCellValue: (row) =>
          row.articleFamilia?.description ? row.articleFamilia.description : "",
      },
      {
        name: "valorPercentual",
        title: props.intl.formatMessage({
          id: "SeccionEmpresa.valorPorcentual",
          defaultMessage: "Valor Porcentual",
        }),
      },
      {
        name: "seccio",
        title: props.intl.formatMessage({
          id: "SeccionesEmpresa.seccion",
          defaultMessage: "Sección ",
        }),
        getCellValue: (row) =>
          row.seccio?.description ? row.seccio.description : "",
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],
    URL: API.seccionsEmpresa,
    listKey: "seccioEmpreses",
  };

  return (
    <>
      <ReactGrid id="seccionsEmpresa" configuration={listConfiguration} />
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
)(SectionCompanyList);
