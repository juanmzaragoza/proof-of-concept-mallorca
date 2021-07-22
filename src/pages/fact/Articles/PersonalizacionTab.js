import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const PERSONALIZACION_SECTION_INDEX = 0;
const PARAMETROS_NUMERICOS_SECTION_TAB_INDEX = 1;
const PARAMETROS_ALFANUMERICOS_SECTION_TAB_INDEX = 2;

const PersonalizacionTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[PERSONALIZACION_SECTION_INDEX]: false, [PARAMETROS_NUMERICOS_SECTION_TAB_INDEX]:false, 
    [PARAMETROS_ALFANUMERICOS_SECTION_TAB_INDEX]: false}, setIsValid: props.setIsValid});

  const personalizacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.interiores",
        defaultMessage: "Interiores",
      }),
      type: "checkbox",
      key: "parametreCheck1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.exteriores",
        defaultMessage: "Exteriores",
      }),
      type: "checkbox",
      key: "parametreCheck2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.decoracion",
        defaultMessage: "Decoración",
      }),
      type: "checkbox",
      key: "parametreCheck3",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.jardin",
        defaultMessage: "Jardín",
      }),
      type: "checkbox",
      key: "parametreCheck4",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.materialesTransporte",
        defaultMessage: "Materiales y transporte",
      }),
      type: "checkbox",
      key: "parametreCheck5",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const parametrosNumericos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametro1",
        defaultMessage: "Parámetro 1"
      }),
      type: "numeric",
      key: "parametreNumeric1",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametro2",
        defaultMessage: "Parámetro 2",
      }),
      type: "numeric",
      key: "parametreNumeric2",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametro3",
        defaultMessage: "Parámetro 3",
      }),
      type: "numeric",
      key: "parametreNumeric3",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametro4",
        defaultMessage: "Parámetro 4",
      }),
      type: "numeric",
      key: "parametreNumeric4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametro5",
        defaultMessage: "Parámetro 5",
      }),
      type: "numeric",
      key: "parametreNumeric5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
    },
  ];

  const parametrosAlfanumericos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametroAlfanumerico1",
        defaultMessage: "Parámetro alfanumérico 1",
      }),
      type: "input",
      key: "parametreAlfanumeric1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametroAlfanumerico2",
        defaultMessage: "Parámetro alfanumérico 2",
      }),
      type: "input",
      key: "parametreAlfanumeric2",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametroAlfanumerico3",
        defaultMessage: "Parámetro alfanumérico 3",
      }),
      type: "input",
      key: "parametreAlfanumeric3",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametroAlfanumerico4",
        defaultMessage: "Parámetro alfanumérico 4",
      }),
      type: "input",
      key: "parametreAlfanumeric4",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.personalizacion.parametrosNumericos.parametroAlfanumerico5",
        defaultMessage: "Parámetro alfanumérico 5",
      }),
      type: "input",
      key: "parametreAlfanumeric5",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60)
      ],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.personalizacion.parametrosNumericos"} defaultMessage={"Parámteros numéricos"}/>,
      key: 0,
      component: <GenericForm formComponents={parametrosNumericos}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(PARAMETROS_NUMERICOS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(PARAMETROS_NUMERICOS_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.personalizacion.parametrosAlfanumericos"} defaultMessage={"Parámetros alfanuméricos"}/>,
      key: 1,
      component: <GenericForm formComponents={parametrosAlfanumericos}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(PARAMETROS_ALFANUMERICOS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(PARAMETROS_ALFANUMERICOS_SECTION_TAB_INDEX)}
                              {...props} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Articulos.tab.presentacion"} defaultMessage={"Presentación"}/>}>
          <GenericForm formComponents={personalizacionConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(PERSONALIZACION_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(PERSONALIZACION_SECTION_INDEX)}
                       {...props} />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(PersonalizacionTab);
