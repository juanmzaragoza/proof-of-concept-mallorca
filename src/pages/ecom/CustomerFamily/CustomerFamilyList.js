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

const CustomerFamilyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaClientes.titulo",
        defaultMessage: "Familias cliente",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamiliaClientes.titulo",
          defaultMessage: "Familias cliente",
        }),
        href: "/familia-clientes",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Cliente.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Cliente.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "compteVendesComptabilitat",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.cuentaVentas",
          defaultMessage: "Cuenta ventas",
        }),
      },
      {
        name: "tipusRisc.descripcio",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.tipoRiesgo",
          defaultMessage: "Tipus Risc",
        }),
        getCellValue: (row) => row.tipusRisc?.description ?? "",
      },
    ],
    URL: API.familiaClients,
    listKey: "familiaClients",
    enableInlineEdition: true
  };
  return <ReactGrid id="familiaClients" configuration={listConfiguration} />;
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
)(CustomerFamilyList);
