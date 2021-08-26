import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const VehicleList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Vehiculos.titulo",
        defaultMessage: "Vehículos",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Vehiculos.titulo",
          defaultMessage: "Vehículos",
        }),
        href: "/fact/vehiculos",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "matricula",
        title: props.intl.formatMessage({
          id: "Vehiculos.matricula",
          defaultMessage: "Matrícula ",
        }),
      },

      {
        name: "transportista",
        title: props.intl.formatMessage({
          id: "Proveedores.Facturacion.transportista",
          defaultMessage: "Transportista",
        }),
        getCellValue: (row) =>
          row.transportista?.description ? row.transportista.description : "",
          inlineEditionDisabled: true
      },
      {
        name: "conductorHabitual",
        title: props.intl.formatMessage({
          id: "Vehiculos.conductor",
          defaultMessage: "Conductor",
        }),
      },
    ],
    URL: API.vehicles,
    listKey: "vehicles",
    enableInlineEdition: true
  };
  return <ReactGrid id="vehicles" configuration={listConfiguration} />;
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
)(VehicleList);
