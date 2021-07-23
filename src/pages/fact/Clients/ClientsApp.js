import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const ClientsAppTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: clientId } = useParams();

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const otraAplicacion = {
    title: props.intl.formatMessage({
      id: "Clientes.otraAplicacion",
      defaultMessage: "Clientes otras Aplicaciones",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      client: { id: `${clientId}` },
    },

    columns: [
      {
        name: "aplicacio",
        title: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
      },
      {
        name: "aplicacioCodi",
        title: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código Cliente otra App",
        }),
      },
      {
        name: "percentatge",
        title: props.intl.formatMessage({
          id: "Clientes.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresa",
        }),
        getCellValue: (row) => row.empresa && row.empresa?.description,
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
        type: "input",
        key: "aplicacio",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 3),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código cliente otra Aplicación",
        }),
        type: "input",
        key: "aplicacioCodi",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 10),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.porcentaje",
          defaultMessage: "Porcentaje ",
        }),
        type: "numeric",
        key: "percentatge",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: props.stringValidations.minMaxValidation(0, 99999),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }), name: "codi" },
            { title: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }), name: "nomFiscal" },
          ],
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
              id={"Clientes.otraAplicacion"}
              defaultMessage={"Clientes otras Aplicaciones"}
            />
          }
        >
          <ExpandableGrid
            id="aplicacionsClients"
            responseKey="aplicacioClients"
            enabled={props.editMode}
            configuration={otraAplicacion}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ClientsAppTab);
