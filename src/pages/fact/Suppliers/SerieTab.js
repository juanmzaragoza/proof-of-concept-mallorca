import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";

const SerieTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: true },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

  const serieConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tabs.seriesEmpresa",
      defaultMessage: "Series Empresa",
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
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Empresas.titulo",
          defaultMessage: "Empresas",
        }),
        getCellValue: (row) =>
          row.empresa.description ? row.empresa?.description : "",
      },

      {
        name: "serieCompra",
        title: props.intl.formatMessage({
          id: "Proveedores.serieCompra",
          defaultMessage: "Serie Compra",
        }),
        getCellValue: (row) =>
          row.serieCompra.description ? row.serieCompra?.description : "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.serieCompra",
          defaultMessage: "Serie compra",
        }),
        type: "LOV",
        key: "serieCompra",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "serieCompras",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: [
            {
              title: props.intl.formatMessage({
                id: "Comun.codigo",
                defaultMessage: "Código",
              }),
              name: "codi",
            },
            {
              title: props.intl.formatMessage({
                id: "Comun.descripcion",
                defaultMessage: "Descripción",
              }),
              name: "descripcio",
            },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>

          <ExpandableGrid
            id="proveidorsSerieCompra"
            responseKey="proveidorSerieCompras"
            enabled={props.editMode}
            configuration={serieConfig}
          />
    
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(SerieTab);
