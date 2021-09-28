import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const LocationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Ubicaciones.titulo",
        defaultMessage: "Ubicaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Ubicaciones.titulo",
          defaultMessage: "Ubicaciones",
        }),
        href: "/fact/ubicacion",
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
          id: "Ubicacion.codigoExterno",
          defaultMessage: "Código externo",
        }),
        name: "codiExtern",
      },
      {
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Presupuestos.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => row.magatzem?.description ?? "",
        inlineEditionDisabled: true,
      },
    ],
    URL: API.ubicacios,
    listKey: "ubicacios",
    enableInlineEdition: true,
  };
  return <ReactGrid id="ubicacios" configuration={listConfiguration} />;
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
)(LocationList);
