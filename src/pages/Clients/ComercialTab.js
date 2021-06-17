import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import OutlinedContainer from "../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../hooks/tab-form";

const COMERCIAL_SECTION_INDEX = 0;

const ComercialTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const comercialAlfanumericoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa1",
        defaultMessage: "Parámetro alfanumérico 1",
      }),
      type: "input",
      key: "parametreTxtComercial1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa2",
        defaultMessage: "Parámetro alfanumérico 2",
      }),
      type: "input",
      key: "parametreTxtComercial2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa3",
        defaultMessage: "Parámetro alfanumérico 3",
      }),
      type: "input",
      key: "parametreTxtComercial3",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa4",
        defaultMessage: "Parámetro alfanumérico 4",
      }),
      type: "input",
      key: "parametreTxtComercial4",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa5",
        defaultMessage: "Parámetro alfanumérico 5",
      }),
      type: "input",
      key: "parametreTxtComercial5",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const comercialNumConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum1",
        defaultMessage: "Parámetro numérico 1",
      }),
      type: "input",
      key: "parametreNumComercial1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum2",
        defaultMessage: "Parámetro numérico 2",
      }),
      type: "input",
      key: "parametreNumComercial2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum3",
        defaultMessage: "Parámetro numérico 3",
      }),
      type: "input",
      key: "parametreNumComercial3",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum4",
        defaultMessage: "Parámetro numérico 4",
      }),
      type: "input",
      key: "parametreNumComercial4",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum5",
        defaultMessage: "Parámetro numérico 5",
      }),
      type: "input",
      key: "parametreNumComercial5",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.comercial"}
              defaultMessage={"Comercial"}
            />
          }
        >
          <GenericForm
            formComponents={comercialAlfanumericoConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(COMERCIAL_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(COMERCIAL_SECTION_INDEX)}
            {...props}
          />

          <GenericForm
            formComponents={comercialNumConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(COMERCIAL_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(COMERCIAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(ComercialTab);
