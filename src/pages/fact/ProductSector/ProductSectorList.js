import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ProductSectorList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "ProductosSector.titulo",
        defaultMessage: "Sectores Productos",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "ProductosSector.titulo",
          defaultMessage: "Sectores Productos",
        }),
        href: "/fact/productos-sectores",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "producte.description",
        title: props.intl.formatMessage({
          id: "Proyectos.producto",
          defaultMessage: "Producto",
        }),
        getCellValue: (row) =>
          row.producte?.description ? row.producte.description : "",
      },
      {
        name: "sector.description",
        title: props.intl.formatMessage({
          id: "ProductosSector.sector",
          defaultMessage: "Sector",
        }),
        getCellValue: (row) =>
          row.sector?.description ? row.sector.description : "",
      },
      {
        name: "idioma.description",
        title: props.intl.formatMessage({
          id: "Proveedores.idioma",
          defaultMessage: "Idioma",
        }),
        getCellValue: (row) =>
          row.idioma?.description ? row.idioma.description : "",
      },
    ],
    URL: API.productesSector,
    listKey: "producteSectors",
  };
  return <ReactGrid id="productesSector" configuration={listConfiguration} />;
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
)(ProductSectorList);
