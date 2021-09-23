import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const PurchaseSeriesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proveedores.serieCompra",
        defaultMessage: "Serie Compra",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Proveedores.serieCompra",
          defaultMessage: "Serie Compra",
        }),
        href: "/fact/series-compras",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const magatzem =   {
    placeHolder:props.intl.formatMessage({
      id: "Articulos.stock.descuentos.almacen",
      defaultMessage: "Almacén",
    }),
    type: "LOV",
    key: "magatzem",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "magatzems",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: NOM, name: "nom" },
      ],
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
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Articulos.stock.descuentos.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => row?.magatzem?.description ?? "",
        field: magatzem
      },
    ],
    URL: API.serieCompras,
    listKey: "serieCompras",
    enableInlineEdition: true,
  };
  return <ReactGrid id="serieCompras" configuration={listConfiguration} />;
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
)(PurchaseSeriesList);
