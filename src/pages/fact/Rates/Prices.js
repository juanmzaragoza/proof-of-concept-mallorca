import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const Prices = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: tarifaId } = useParams();

  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const priceParticulars = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Artículos",
    }),
    query: [
      {
        columnName: "tarifa.id",
        value: `"${tarifaId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      tarifa: { id: tarifaId },
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Articulos.titulo",
          defaultMessage: "Descripción",
        }),
        getCellValue: (row) => row.article?.description ?? "",
      },
      {
        name: "preuArticleTarifa",
        title: props.intl.formatMessage({
          id: "Articulos.precioArticulo",
          defaultMessage: "precioArticulo",
        }),
      },
      {
        name: "descompte",
        title: props.intl.formatMessage({
          id: "Articulos.descuento1",
          defaultMessage: "Descuento 1",
        }),
      },
      {
        name: "descompte002",
        title: props.intl.formatMessage({
          id: "Articulos.descuento2",
          defaultMessage: "Descuento 2",
        }),
      },
      {
        name: "marge",
        title: props.intl.formatMessage({
          id: "Articulos.margen",
          defaultMessage: "Margen",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosUbicacion.articulo.titulo",
          defaultMessage: "Articulo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.precioArticulo",
          defaultMessage: "Precio Artículo",
        }),
        type: "numeric",
        key: "preuArticleTarifa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.descuento1",
          defaultMessage: "Descuento 1",
        }),
        type: "numeric",
        key: "descompte",
        suffix: "%",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 99)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.descuento2",
          defaultMessage: "Descuento 2",
        }),
        type: "numeric",
        key: "descompte002",
        suffix: "%",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 99)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.margen",
          defaultMessage: "Margen",
        }),
        type: "numeric",
        key: "marge",
        disabledCreating: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Articulos.tipoParticular"}
              defaultMessage={"Precios para tarifas tipo particular"}
            />
          }
        >
          <ExpandableGrid
            id="preusArticle"
            responseKey="preuArticles"
            enabled={props.editMode}
            configuration={priceParticulars}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(Prices);
