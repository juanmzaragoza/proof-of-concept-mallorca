import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const ProjectRateSupTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: budgetId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const RatesSupplier = {
    title: props.intl.formatMessage({
      id: "Proyectos.tarifasProveedores",
      defaultMessage: "Tarfia Proveedores",
    }),
    query: [
      {
        columnName: "pressupost.id",
        value: `"${budgetId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      pressupost: { id: `${budgetId}` },
    },

    columns: [
      {
        name: "proveidor",
        title: props.intl.formatMessage({
          id: "Proveedores.proveedor",
          defaultMessage: "Proveedor",
        }),

        getCellValue: (row) => row.proveidor && row.proveidor?.description,
      },

      {
        name: "tarifaProveidor",
        title: props.intl.formatMessage({
          id: "Proyectos.tarifaProveedor",
          defaultMessage: "Tarifa Proveedor",
        }),
        getCellValue: (row) =>
          row.tarifaProveidor && row.tarifaProveidor?.description,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.proveedor",
          defaultMessage: "Proveedor",
        }),
        required: true,
        noEditable:true,
        type: "LOV",
        key: "proveidor",
        breakpoints: {
          xs: 12,
          md: 6,
        },

        selector: {
          key: "proveidors",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          relatedWith: [
            {
              name: "tarifaProveidor",
              filterBy: "proveidor.id",
              keyValue: "id",
            },
          ],
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "nomComercial" },
          ],
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.tarifaProveedor",
          defaultMessage: "Tarifa Proveedor",
        }),
        type: "LOV",
        key: "tarifaProveidor",
        required: true,
        noEditable:true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "tarifaProveidors",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: DESCRIPCIO, name: "descripcio" },
          ],
        },
        validationType: "object",
        ...withRequiredValidation(),
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
              id={"Proyectos.tarifasProveedores"}
              defaultMessage={"Tarifas Proveedores"}
            />
          }
        >
          <ExpandableGrid
            id="tarifesProveidorPressupost"
            responseKey="tarifaProveidorPressuposts"
            enabled={props.editMode}
            configuration={RatesSupplier}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(ProjectRateSupTab);
