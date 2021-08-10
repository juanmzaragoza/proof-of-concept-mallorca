import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const SeriesTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: areaId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const seriesConfig = {
    title: props.intl.formatMessage({
      id: "AreasNegocio.tabs.series",
      defaultMessage: "Series del Área",
    }),
    query: [
      {
        columnName: "areaNegoci.id",
        value: `"${areaId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      areaNegoci: { id: `${areaId}` },
    },

    columns: [
      {
        name: "serieVenda.description",
        title: props.intl.formatMessage({
          id: "Presupuestos.serieVenta",
          defaultMessage: "Serie Venta",
        }),
        getCellValue: (row) => row?.serieVenda?.description || "",
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.serie",
          defaultMessage: "Serie",
        }),
        type: "LOV",
        key: "serieVenda",
        id:"serie",
        noEditable:true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "serieVendas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
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
              id={"AreasNegocio.tabs.series"}
              defaultMessage={"Series"}
            />
          }
        >
          <ExpandableGrid
            id="seriesAreaNegoci"
            responseKey="serieAreaNegocis"
            enabled={props.editMode}
            configuration={seriesConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SeriesTab);
