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
