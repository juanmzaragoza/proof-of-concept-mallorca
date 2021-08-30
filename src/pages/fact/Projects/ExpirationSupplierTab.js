import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const ExpirationSuppplierTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: projectId } = useParams();


  useEffect(() => {
    props.setIsValid(true);
  },[]);

  const ExpirationSupplier = {
    title: props.intl.formatMessage({
      id: "Proyectos.vencProv",
      defaultMessage: "Vencimientos por proveedor",
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
        name: "tipusVenciment",
        title: props.intl.formatMessage({
          id: "Proyectos.vencimiento",
          defaultMessage: "Tipo Vencimiento",
        }),
        getCellValue: (row) =>
          row.tipusVenciment && row.tipusVenciment?.description,
      },
      {
        name: "proveidor",
        title: props.intl.formatMessage({
          id: "Proyectos.proveedor",
          defaultMessage: "Proveedor",
        }),
        getCellValue: (row) => row.proveidor && row.proveidor?.description,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.vencimiento",
          defaultMessage: "Tipo Vencimiento",
        }),
        type: "LOV",
        key: "tipusVenciment",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "tipusVenciments",
          labelKey: (data) => `${data.tipus} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.proveedor",
          defaultMessage: "Proveedor",
        }),
        type: "LOV",
        key: "proveidor",
        breakpoints: {
          xs: 12,
          md: 8,
        },
        selector: {
          key: "proveidors",
          labelKey: (data) => `${data.descCodiNom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
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
              id={"Proyectos.vencProv"}
              defaultMessage={"Presupuestos"}
            />
          }
        >
          <ExpandableGrid
            id="proveidorsVenciment"
            responseKey="proveidorVenciments"
            enabled={props.editMode}
            configuration={ExpirationSupplier}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ExpirationSuppplierTab);
