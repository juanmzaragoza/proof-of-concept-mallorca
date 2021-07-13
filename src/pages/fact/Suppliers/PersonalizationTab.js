import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";

const PERSONAL_SECTION_INDEX = 0;

const PersonalizationTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const personalAlfConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa1",
        defaultMessage: "Parámetro alfanumérico 1",
      }),
      type: "input",
      key: "parametreAlfanumeric1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa2",
        defaultMessage: "Parámetro alfanumérico 2",
      }),
      type: "input",
      key: "parametreAlfanumeric2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa3",
        defaultMessage: "Parámetro alfanumérico 3",
      }),
      type: "input",
      key: "parametreAlfanumeric3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa4",
        defaultMessage: "Parámetro alfanumérico 4",
      }),
      type: "input",
      key: "parametreAlfanumeric4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa5",
        defaultMessage: "Parámetro alfanumérico 5",
      }),
      type: "input",
      key: "parametreAlfanumeric5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const personalNumConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum1",
        defaultMessage: "Parámetro numérico 1",
      }),
      type: "input",
      key: "parametreNumeric1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum2",
        defaultMessage: "Parámetro numérico 2",
      }),
      type: "input",
      key: "parametreNumeric2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum3",
        defaultMessage: "Parámetro numérico 3",
      }),
      type: "input",
      key: "parametreNumeric3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum4",
        defaultMessage: "Parámetro numérico 4",
      }),
      type: "input",
      key: "parametreNumeric4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum5",
        defaultMessage: "Parámetro numérico 5",
      }),
      type: "input",
      key: "parametreNumeric5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={6} item>
          <OutlinedContainer
            className="contact-tab-container"
            title={
              <FormattedMessage
                id={"Proveedores.personalizacion.alfanumericos"}
                defaultMessage={"Parámetros Alfanuméricos"}
              />
            }
          >
          <GenericForm
            formComponents={personalAlfConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(PERSONAL_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(PERSONAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
        </Grid>
        <Grid xs={6} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
                id={"Proveedores.personalizacion.numericos"}
                defaultMessage={"Parámetros Numéricos"}
              />
          }
        >
          <GenericForm
            formComponents={personalNumConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(PERSONAL_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(PERSONAL_SECTION_INDEX)}
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
)(PersonalizationTab);
