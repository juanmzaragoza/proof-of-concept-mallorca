import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const BudgetTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: projectId } = useParams();

  useEffect(() => {
    props.setIsValid(true);
  },[]);

  const budget = {
    title: props.intl.formatMessage({
      id: "Proyectos.presupuestos",
      defaultMessage: "Presupuestos",
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
        name: "pressupost.description",
        title: props.intl.formatMessage({
          id: "Presupuestos.titulo",
          defaultMessage: "Presupuesto",
        }),
        getCellValue: (row) => row.pressupost && row.pressupost?.description,
      },
      {
        name: "capitol",
        title: props.intl.formatMessage({
          id: "Proyectos.capitulo",
          defaultMessage: "Capítulo",
        }),
        getCellValue: (row) => row.capitol && row.capitol?.description,
      },

      {
        name: "partida.description",
        title: props.intl.formatMessage({
          id: "Proyectos.partida",
          defaultMessage: "Partida",
        }),
        getCellValue: (row) => row.partida && row.partida?.description,
      },
      {
        name: "import",
        title: props.intl.formatMessage({
          id: "Proyectos.importe",
          defaultMessage: "Importe",
        }),
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden:true,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.titulo",
          defaultMessage: "Presupuesto",
        }),
        type: "LOV",
        key: "pressupost",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "pressuposts",
          labelKey: (data) => `(${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          relatedWith:[ {
            name: "capitol",
            filterBy: "pressupostCodi",
            keyValue: "codi",
          },],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.capitulos",
          defaultMessage: "Capítulos",
        }),
        type: "LOV",
        key: "capitol",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "capitols",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          relatedWith: [{
            name: "partida",
            filterBy: "capitol.id",
            keyValue: "id",
          },],
        },
      
      },
      
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.partida",
          defaultMessage: "Partida",
        }),
        type: "LOV",
        key: "partida",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "partidas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.importe",
          defaultMessage: "Importe",
        }),
        type: "input",
        key: "importe",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
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
            id="projectesPressupost"
            responseKey="projectePressuposts"
            enabled={props.editMode}
            configuration={budget}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(BudgetTab);
