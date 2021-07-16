import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";

const TranslationTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const { id: productId } = useParams();

  const translation = {
    title: props.intl.formatMessage({
      id: "Articulos.tabs.traducciones",
      defaultMessage: "Traducciones",
    }),
    query: [
      {
        columnName: "producte.id",
        value: `"${productId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
        producte: { id: productId },
    },

    columns: [
      {
        name: "idioma.description",
        title: props.intl.formatMessage({
          id: "Idiomas.titol",
          defaultMessage: "Idioma",
        }),
        getCellValue: (row) => row?.idioma?.description ?? "",
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },

      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Productos.idiomas",
          defaultMessage: "Idioma",
        }),
        type: "LOV",
        key: "idioma",
        id: "idiomas",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "idiomas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
        },
        validationType: "object",
      },
      {
        placeHolder: props.intl.formatMessage({
            id: "Comun.nombre",
            defaultMessage: "Nombre",
          }),
        type: "input",
        key: "nom",

        breakpoints: {
          xs: 12,
          md: 9,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        key: "descripcio",

        breakpoints: {
          xs: 12,
          md: 12,
        },
        text: {
          multiline: 8,
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
              id={"Articulos.tabs.traducciones"}
              defaultMessage={"Traudcciones"}
            />
          }
        >
          <ExpandableGrid
            id="productesTraduccio"
            responseKey="producteTraduccios"
            enabled={props.editMode}
            configuration={translation}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(TranslationTab);
