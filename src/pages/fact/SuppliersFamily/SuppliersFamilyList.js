import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const SuppliersFamilyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaProveedores.titulo",
        defaultMessage: "Familias proveedor",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.titulo",
          defaultMessage: "Familias proveedor",
        }),
        href: "/fact/familia-proveedores",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "ctacprcmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.ctaprcmp",
          defaultMessage: "Cuenta Compras",
        }),
      },
      {
        name: "tipasicmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.tipasicmp",
          defaultMessage: "Tipo Asig. Fac",
        }),
      },
      {
        name: "dricmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.dricmp",
          defaultMessage: "Diario Fac",
        }),
      },
      {
        name: "dricmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.driprfcmp",
          defaultMessage: "Diario Prof.",
        }),
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],
    URL: API.familiaProveidor,
    listKey: "familiaProveidors",
    enableInlineEdition: true,
  };
  return <ReactGrid id="familiaProveidor" configuration={listConfiguration} />;
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
)(SuppliersFamilyList);
