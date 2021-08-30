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
  },[]);
  
  const { id: projectId } = useParams();

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
        columnName: "projecte.id",
        value: `"${projectId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      projecte: { id: `${projectId}` },
    },

    columns: [
      {
        name: "proveidorCodi",
        title: props.intl.formatMessage({
          id: "Proyectos.codigoProveedor",
          defaultMessage: "Código proveedor",
        }),
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
        type: "LOV",
        key: "proveidorCodi",
        id: "proveidor",
        breakpoints: {
          xs: 12,
          md: 6,
        },

        selector: {
          key: "proveidors",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          transform: {
            apply: (proveidors) => proveidors && proveidors.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
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
        validationType: "string",
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
            id="projectesTarifaProveidor"
            responseKey="projecteTarifaProveidors"
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
