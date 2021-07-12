import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const DocumentsTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

  const departamentsConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tabs.precioCoste",
      defaultMessage: "Precio Coste",
    }),
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Proveedores.Precios.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article.description ? row.article?.description : "",
      },
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Proveedores.codigoArticulo",
          defaultMessage: "Código Articulo Proveedor",
        }),
      },
      {
        name: "preuNetExtraField",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.precioNeto",
          defaultMessage: "Precio Neto",
        }),
        getCellValue: (row) =>
          row.preuNetExtraField && parseInt(row.preuNetExtraField).toFixed(2),
      },
      {
        name: "ultimPreuCompra",
        title: props.intl.formatMessage({
          id: "Proveedores.ultimoPrecioCompra",
          defaultMessage: "Último Precio Compra",
        }),
        hidden: true,
      },
      {
        name: "ultimDescompte",
        title: props.intl.formatMessage({
          id: "Proveedores.ultimoDescuento",
          defaultMessage: "Último descuento",
        }),
        hidden: true,
      },
      {
        name: "ultimDiaCompra",
        title: props.intl.formatMessage({
          id: "Proveedores.ultimoDiaCompra",
          defaultMessage: "Último Dia Compra",
        }),
        getCellValue: row => row.ultimDiaCompra ? new Date(row.ultimDiaCompra).toLocaleDateString() : "",
        hidden: true,
      },
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisas",
        }),
        getCellValue: (row) =>
          row.divisa?.description ? row.divisa?.description : "",
      },

    ],
    formComponents: [],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="proveidorsArticle"
          responseKey="proveidorArticles"
          enabled={props.editMode}
          configuration={departamentsConfig}
          readOnly={true}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(DocumentsTab);
