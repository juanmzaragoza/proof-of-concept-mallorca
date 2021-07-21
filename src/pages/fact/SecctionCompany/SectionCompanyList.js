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
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "dataInici",
        title: props.intl.formatMessage({
          id: "Almacen.fechaInicio",
          defaultMessage: "Fecha Inicio",
        }),
        getCellValue: (row) =>
          row.dataInici ? new Date(row.dataInici).toLocaleDateString() : "",
      },
      {
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Almacen.titulo",
          defaultMessage: "Almacen ",
        }),
        getCellValue: (row) =>
          row.magatzem?.description ? row.magatzem.description : "",
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
