import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import {APP_PROYECTOS_SELECTOR_VALUES} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const ProjectAppTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: projectId } = useParams();

  useEffect(() => {
    props.setIsValid(true);
  },[]);

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
      id: "Proyectos.otraAplicacion",
      defaultMessage: "Proyecto otras Aplicaciones",
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
        name: "codi",
        title: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
      },
      {
        name: "codiProjecteAap",
        title: props.intl.formatMessage({
          id: "Proyectos.codigoOtraApp",
          defaultMessage: "Código Proyecto otra App",
        }),
      },
      {
        name: "valorPercentual",
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
        type: "select",
        key: "codi",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector:{
            options: APP_PROYECTOS_SELECTOR_VALUES,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 4),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código cliente otra Aplicación",
        }),
        type: "input",
        key: "codiProjecteAap",
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
        key: "valorPercentual",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: props.numberValidations.minMaxValidation(0, 99999),
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
              id={"Proyectos.otraAplicacion"}
              defaultMessage={"Proyectos otras Aplicaciones"}
            />
          }
        >
          <ExpandableGrid
            id="projectesAplicacio"
            responseKey="projecteAplicacios"
            enabled={props.editMode}
            configuration={otraAplicacion}
          />
        </OutlinedContainer>
    
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ProjectAppTab);
