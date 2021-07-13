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

const InitialSituationTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

  const storeCodi = getFormData("codi");

  const periodConfig = {
    title: props.intl.formatMessage({
      id: "Almacen.periodos",
      defaultMessage: "Perídos",
    }),
    query: [
      {
        columnName: "magatzemCodi",
        value: `"${storeCodi}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      magatzemCodi: storeCodi,
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Alamcen.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article.description ? row.article?.description : "",
      },
      {
        name: "unitatsInicials",
        title: props.intl.formatMessage({
          id: "Almacen.unidadesIniciales",
          defaultMessage: "Unidades Iniciales",
        }),
      },
      {
        name: "unitatsMetriquesInicials",
        title: props.intl.formatMessage({
          id: "Almacen.unidadesMetricas",
          defaultMessage: "Unidades Métricas Iniciales",
        }),
      },
      {
        name: "preuCostUnitari",
        title: props.intl.formatMessage({
          id: "Almacen.precioCoste",
          defaultMessage: "Precio Coste Unitario ",
        }),
      },
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisas",
        }),
        getCellValue: (row) =>
          row.divisa.description ? row.divisa?.description : "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.periodo",
          defaultMessage: "Período",
        }),
        type: "input",
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
          id="situacionsInicial"
          responseKey="situacioInicials"
          enabled={props.editMode}
          configuration={periodConfig}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(InitialSituationTab);
