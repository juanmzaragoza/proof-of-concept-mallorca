import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { ROL_OPERARIO_SELECTOR_VALUES } from "constants/selectors";

const RespHistoryTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: projectId } = useParams();

  const budget = {
    title: props.intl.formatMessage({
      id: "Proyectos.historialResp",
      defaultMessage: "Historial Responsables",
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
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "tipusOperari",
        title: props.intl.formatMessage({
          id: "Proyectos.rolOperario",
          defaultMessage: "Rol operario",
        }),
      },
      {
        name: "operariCodi",
        title: props.intl.formatMessage({
          id: "Proyectos.operario",
          defaultMessage: "Operario",
        }),
      },

      {
        name: "dataInicial",
        title: props.intl.formatMessage({
          id: "Proyectos.fechaInicial",
          defaultMessage: "Fecha Inicial",
        }),
        getCellValue: (row) =>
          row.dataInicial ? new Date(row.dataInicial).toLocaleDateString() : "",
      },
      {
        name: "dataFinal",
        title: props.intl.formatMessage({
          id: "Proyectos.fechaFinal",
          defaultMessage: "Fecha Final",
        }),
        getCellValue: (row) =>
          row.dataFinal ? new Date(row.dataFinal).toLocaleDateString() : "",
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        type: "input",
        key: "sequencia",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.rolOperario",
          defaultMessage: "Rol operario",
        }),
        type: "select",
        key: "tipusOperari",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          options: ROL_OPERARIO_SELECTOR_VALUES,
        },
        validationType: "string",

        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.operario",
          defaultMessage: "Operario",
        }),
        type: "LOV",
        key: "operariCodi",

        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "operaris",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          transform: {
            apply: (operaris) => operaris && operaris.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.fechaInicio",
          defaultMessage: "Fecha Inicio",
        }),
        type: "date",
        key: "dataInicial",
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.fechaFinal",
          defaultMessage: "Fecha Final",
        }),
        type: "date",
        key: "dataFinal",
        breakpoints: {
          xs: 12,
          md: 4,
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
              id={"Proyectos.presupuestos"}
              defaultMessage={"Presupuestos"}
            />
          }
        >
          <ExpandableGrid
            id="historicsResponsables"
            responseKey="historicResponsables"
            enabled={props.editMode}
            configuration={budget}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(RespHistoryTab);
