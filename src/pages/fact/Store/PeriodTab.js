import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";

import { injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";

import ExpandableGrid from "modules/ExpandableGrid";


const PeriodTab = ({ formData, setFormData, ...props }) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: storeId } = useParams();

  const periodConfig = {
    title: props.intl.formatMessage({
      id: "Almacen.periodos",
      defaultMessage: "Perídos",
    }),
    query: [
      {
        columnName: "magatzem.id",
        value: `"${storeId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      magatzem: { id: storeId },
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Almacen.periodo",
          defaultMessage: "Período",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },

      {
        name: "dataInici",
        title: props.intl.formatMessage({
          id: "Almacen.fechaInicio",
          defaultMessage: "Fecha Inicio",
        }),
        getCellValue: (row) =>
          row.dataInici ? new Date(row.dataInici).toLocaleDateString() : "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.periodo",
          defaultMessage: "Período",
        }),
        type: "numeric",
        key: "codi",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: props.commonValidations.requiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        key: "descripcio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 8,
        },
        validationType: "string",
        validations: props.commonValidations.requiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.fechaInicio",
          defaultMessage: "Fecha Inicio",
        }),
        type: "date",
        key: "dataInici",
        noEditable: true,
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
        <ExpandableGrid
          id="magatzemsPeriode"
          responseKey="magatzemPeriodes"
          enabled={props.editMode}
          configuration={periodConfig}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(PeriodTab);
