import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import ExpandableGrid from "modules/ExpandableGrid";
import { APLICADOR_TYPE_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const GENERAL_TAB_INDEX = 0;
const CLIENTS_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [GENERAL_TAB_INDEX]: false,
      [CLIENTS_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const aplicadorConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.contrato",
        defaultMessage: "Contrato ",
      }),
      type: "input",
      key: "contracte",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 30),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre ",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 30),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.apellidos",
        defaultMessage: "Apellidos ",
      }),
      type: "input",
      key: "cognoms",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 60),
      ]),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.nif",
        defaultMessage: "NIF ",
      }),
      type: "input",
      key: "nif",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 15)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.categoria",
        defaultMessage: "Categoria ",
      }),
      type: "select",
      key: "categoria",
      selector: {
        options: APLICADOR_TYPE_SELECTOR_VALUES,
      },
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.telefono",
        defaultMessage: "Teléfono ",
      }),
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.email",
        defaultMessage: "Email",
      }),
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.fechaExpedicion",
        defaultMessage: "Fecha expedición ",
      }),
      type: "date",
      key: "dataExpedicio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.fechaCaducidad",
        defaultMessage: "Fecha Caducidad ",
      }),
      type: "date",
      key: "dataCaducitat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.domicilio",
        defaultMessage: "Domicilio ",
      }),
      type: "input",
      key: "domicili",
      breakpoints: {
        xs: 12,
        md: 10,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicadores.activo",
        defaultMessage: "Activo",
      }),
      type: "switch",
      key: "actiu",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const { id: aplicadorId } = useParams();

  const clientsesAplicadoresConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.aplicadores",
      defaultMessage: "Aplicadores",
    }),
    query: [
      {
        columnName: "aplicador.id",
        value: `"${aplicadorId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      aplicador: { id: `${aplicadorId}` },
    },

    columns: [
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        getCellValue: (row) => row.client && row.client?.description,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        type: "LOV",
        key: "client",
        noEditable:true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "clients",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
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
                id: "Comun.nombre",
                defaultMessage: "nombre",
              }),
              name: "nomComercial",
            },
          ],
        },
        validationType: "object",
        validation: [...props.commonValidations.requiredValidation()],
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage id={"Clientes.titulo"} defaultMessage={"Clientes"} />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="aplicadorClients"
          responseKey="aplicadorClients"
          enabled={props.editMode}
          configuration={clientsesAplicadoresConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={aplicadorConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(GENERAL_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(GENERAL_TAB_INDEX)}
          {...props}
        />
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
