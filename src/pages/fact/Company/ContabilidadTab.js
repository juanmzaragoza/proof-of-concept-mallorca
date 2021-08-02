import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  CONTABILIDAD_SELECTOR_VALUES,
  FACT_TIPO_SELECTOR_VALUES,
} from "constants/selectors";

const CONTAB_SECTION_INDEX = 0;

const ContabilidadTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

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

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const almacen = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzemCodi",
      breakpoints: {
        xs: 12,
        md: 8,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        cannotCreate: true,
        transform: {
          apply: (magatzems) => magatzems && magatzems.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.almacenFijo",
        defaultMessage: "Almacén Fijo",
      }),
      type: "checkbox",
      key: "magatzemFixe",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  ];

  const tipoFact = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.valorFact",
        defaultMessage: "Valor Facturaión",
      }),
      type: "numeric",
      key: "valorFacturacio",

      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999999)],
    },
  ];

  const datosContablesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.contabCodigo",
        defaultMessage: "Contabilidad código",
      }),
      type: "input",
      key: "comptabilitatCodi",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.contabilidadClientes",
        defaultMessage: "Contabilidad Clientes",
      }),
      type: "select",
      key: "comptabilitatClients",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: CONTABILIDAD_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.contabilidadProv",
        defaultMessage: "Contabilidad Proveedores",
      }),
      type: "select",
      key: "comptabilitatProveidors",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: CONTABILIDAD_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.contabAsiento",
        defaultMessage: "Contabilidad asiento tipo",
      }),
      type: "input",
      key: "comptabilitatAssentamentTipus",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.diarioFact",
        defaultMessage: "Diario Facturación Prov.",
      }),
      type: "input",
      key: "diarioFactProveedores",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.diarioProf",
        defaultMessage: "Diario Prof. Prov.",
      }),
      type: "input",
      key: "diarioProfProveedores",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoFact",
        defaultMessage: "Tipo Facturación",
      }),
      type: "select",
      key: "facturacioTipus",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: FACT_TIPO_SELECTOR_VALUES,
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={8} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Empresas.almacenEmpresa"}
              defaultMessage={"Almacen de la Empresa"}
            />
          }
        >
          <GenericForm
            formComponents={almacen}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONTAB_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CONTAB_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={4} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Empresas.tipoFacturacion"}
              defaultMessage={"Tipo facturación"}
            />
          }
        >
          <GenericForm
            formComponents={tipoFact}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONTAB_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CONTAB_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Empresas.datosContables"}
              defaultMessage={"Datos contables"}
            />
          }
        >
          <GenericForm
            formComponents={datosContablesConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONTAB_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CONTAB_SECTION_INDEX)}
            {...props}
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
)(ContabilidadTab);
