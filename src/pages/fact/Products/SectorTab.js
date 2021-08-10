import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";


const SectorTab = ({ formData, setFormData, getFormData, ...props }) => {

  useEffect(() => {
    props.setIsValid(true);
  },[]);

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const { id: productId } = useParams();

  const translation = {
    title: props.intl.formatMessage({
      id: "Productos.tabs.sector",
      defaultMessage: "Sector",
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
        name: "sector",
        title: props.intl.formatMessage({
          id: "Productos.sector",
          defaultMessage: "Sector",
        }),
        getCellValue: (row) => row?.sector?.description ?? "",
      },

    ],
    formComponents: [

      {
        placeHolder: props.intl.formatMessage({
          id: "Productos.sector",
          defaultMessage: "Idioma",
        }),
        type: "LOV",
        key: "sector",
        noEditable:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "sectors",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
        },
        validationType: "object",
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
              id={ "Productos.tabs.sector"}
              defaultMessage={"Sectores"}
            />
          }
        >
          <ExpandableGrid
            id="productesSector"
            responseKey="producteSectors"
            enabled={props.editMode}
            configuration={translation}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SectorTab);
