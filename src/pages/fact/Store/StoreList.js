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

const StoreList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Almacen.titulo",
        defaultMessage: " Almacén",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Almacenes", href: "/fact/almacenes" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Almacen.titulo",
      defaultMessage: "Clientes",
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
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },

      {
        name: "valoracioInventariTraspas",
        title: props.intl.formatMessage({
          id: "Almacen.valoracionInventario",
          defaultMessage: "Valoración Inventario transpasos",
        }),
        getCellValue: (row) => {
          if (row.valoracioInventariTraspas) {
            if (row.valoracioInventariTraspas === "PREU_MITJA_COST_GLOBAL") {
              return props.intl.formatMessage({
                id: "Almacen.select.precioMedioCosteGlobal",
                defaultMessage: "Precio medio coste global",
              });
            } else if (row.valoracioInventariTraspas === "ULTIM_PREU_DE_COST") {
              return props.intl.formatMessage({
                id: "Almacen.select.ultimoPrecioCoste",
                defaultMessage: "Último precio de coste",
              });
            } else if (
              row.valoracioInventariTraspas === "PREU_MITJA_COST_EXISTENCIA"
            ) {
              return props.intl.formatMessage({
                id: "Almacen.select.precioMedioCosteExistencia",
                defaultMessage: "Precio medio coste de existencia",
              });
            } else if (
              row.valoracioInventariTraspas === "PREU_COMPRA_TEORIC_DE_ARTICLE"
            ) {
              return props.intl.formatMessage({
                id: "Almacen.select.precioCompraTeoricoArticulo",
                defaultMessage: "Precio compra teórico de artículo",
              });
            } else {
              return props.intl.formatMessage({
                id: "Almacen.select.precioCosteTeoricoArticulo",
                defaultMessage: "Precio coste teórico de artículo",
              });
            }
          }
        },
      },
      {
        name: "divisa.description",
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) =>
          row.divisa?.description ? row.divisa.description : "",
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "codiPostal.description",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) =>
          row.codiPostal?.description ? row.codiPostal.description : "",
      },
    ],
    URL: API.magatzem,
    listKey: "magatzems",
  };

  return (
    <>
      <ReactGrid id="magatzem" configuration={listConfiguration} />
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
)(StoreList);
